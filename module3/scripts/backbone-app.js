"use strict";

(function() {
    // Some constants
    // "todos-backbone" is just a hard-code id for storage
    var LOCAL_STORAGE_KEY = 'todos-backbone';
    var ENTER_KEY = 13;
    var ESC_KEY = 27;

    // Define model
    var ToDoItem = Backbone.Model.extend({
        // The followings are overrides default value
        defaults: {
            title: '',
            completed: false
        },

        // The followings are functions defined for app
        toggleCompleted: function() {
            this.save({
                completed: !this.get('completed')
            });
        },
        updateTitle: function(newTitle) {
            if (newTitle) {
                this.save({ title: newTitle });
            } else {
                this.destroy();
            }
        }
    });

    // Define collection
    var ToDoCollection = Backbone.Collection.extend({
        // The followings are overrides default value
        model: ToDoItem,
        // This is used by Backbone localStorage Adapter
        initialize: function() {
            this.localStorage = new Backbone.LocalStorage(LOCAL_STORAGE_KEY);
        },

        // The followings are functions defined for app
        getRemainingItems: function() {
            return this.where({ completed: false });
        },
        createNewItem: function(title) {
            this.create({
                title: title
            });
        }
    });

    // Define controller for model
    // function ToDoItemController(model) {
    //     this.model = model;
    // };
    // ToDoItemController.prototype.toggleCompleted = function() {
    //     this.model.toggleCompleted();
    // };
    // ToDoItemController.prototype.updateTitle = function(newTitle) {
    //     this.model.updateTitle(newTitle);
    // };
    // ToDoItemController.prototype.destroy = function() {
    //     this.model.destroy();
    // };

    // Define view for model
    var ToDoItemView = Backbone.View.extend({
        // The followings are overrides default value
        tagName: 'li',
        template: _.template($('#backbone-item-template').html()),
        events: {
            'click .toggle': 'toggleCompleted',
            'dblclick label': 'edit',
            'click .remove': 'destroy',
            'keypress .editor': 'updateOnEnter',
            'keydown .editor': 'revertOnEscape',
            'blur .editor': 'update'
        },
        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);

            // this.controller = new ToDoItemController(this.model);
        },
        //Re-render
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass('completed', this.model.get('completed'));
            this.refreshVisible();
            this.$changeTitleInput = this.$('.editor');
            return this;
        },

        // The followings are functions defined for app

        // View state
        isVisible: true,
        setVisible: function(isVisible) {
            this.isVisible = !!isVisible;
            this.refreshVisible();
        },
        refreshVisible: function() {
            this.$el.toggleClass('hidden', !this.isVisible);
        },
        isEditing: false,
        setEditing: function(isEditing) {
            this.isEditing = !!isEditing;
            this.$el.toggleClass('editing', this.isEditing);
        },

        // View API
        edit: function() {
            this.setEditing(true);
            this.$changeTitleInput.focus();
        },
        revertOnEscape: function(e) {
            if (e.which === ESC_KEY) {
                this.setEditing(false);
                this.$changeTitleInput.val(this.model.get('title'));
            }
        },

        // Call controller
        toggleCompleted: function() {
            // this.controller.toggleCompleted();
            this.model.toggleCompleted();
        },
        destroy: function() {
            // this.controller.destroy();
            this.model.destroy();
        },

        update: function() {
            var value = this.$changeTitleInput.val().trim();

            if (this.isEditing) {
                this.setEditing(false);
                // this.controller.updateTitle(value);
                this.model.updateTitle(value);
            }
        },
        updateOnEnter: function(e) {
            if (e.which === ENTER_KEY) {
                this.update();
            }
        }
    });

    // Define controller for app
    // function ToDoAppController(model) {
    //     this.model = model;
    // };
    // ToDoAppController.prototype.createNewToDo = function(title) {
    //     this.model.createNewItem(title);
    // };

    // Define view for app
    var ToDoAppView = Backbone.View.extend({
        // The followings are overrides default value
        el: '.backbone-app',
        footerTemplate: _.template($('#backbone-footer-template').html()),
        events: {
            'keypress .new-todo': 'createOnEnter'
        },
        initialize: function() {
            this.$newTitleInput = this.$('.new-todo');
            this.$list = this.$('.todo-list');
            this.$footer = this.$('footer');

            this.listenTo(this.model, 'add', this.addOne);
            this.listenTo(this.model, 'remove', this.removeOne);
            this.listenTo(this.model, 'reset', this.resetView);
            this.listenTo(this.model, 'change:completed', this.resetOneVisible);
            this.listenTo(this.model, 'all', _.debounce(this.render, 0));

            this.itemViews = [];
            // this.controller = new ToDoAppController(this.model);

            this.model.fetch({ reset: true });
        },
        render: function() {
            var remainingItems = this.model.getRemainingItems().length;
            if (this.model.length) {
                this.$list.show();
                this.$footer.show();

                this.$footer.html(this.footerTemplate({
                    remaining: remainingItems
                }));
                this.refreshFilter();
            } else {
                this.$list.hide();
                this.$footer.hide();
            }
        },

        // The followings are functions defined for app
        internalFilters: {
            active: function(todoItem) {
                return !todoItem.get('completed');
            },
            completed: function(todoItem) {
                return todoItem.get('completed');
            }
        },

        // View state
        filter: '',
        filterFunc: null,
        setFilter: function(filter) {
            if (!(filter in this.internalFilters)) {
                filter = '';
            }
            this.filter = filter;
            this.filterFunc = filter == '' ? null : this.internalFilters[this.filter];
            this.resetAllVisible();
            this.refreshFilter();
        },
        refreshFilter: function() {
            this.$('.filters a')
                .removeClass('selected')
                .filter('[href="#/' + this.filter + '"]')
                .addClass('selected');
        },

        // View API
        findViewIndex: function(todoItem) {
            for(var index = 0; index < this.itemViews.length; index++) {
                if (this.itemViews[index].model === todoItem) {
                    return index;
                }
            }
            return -1;
        },
        addOne: function(todoItem) {
            var itemView = new ToDoItemView({ model: todoItem });
            this.$list.append(itemView.render().el);
            this.itemViews.push(itemView);
            itemView.setVisible(this.filterFunc ? this.filterFunc(todoItem) : true);
        },
        removeOne: function(todoItem) {
            var index = this.findViewIndex(todoItem);
            if (index !== -1) {
                this.itemViews.slice(index, 1);
            }
        },
        resetView: function() {
            this.$list.html('');
            this.itemViews = [];
            this.model.each(this.addOne, this);
        },
        resetOneVisible: function(todoItem) {
            var index = this.findViewIndex(todoItem);
            if (index !== -1) {
                this.itemViews[index].setVisible(this.filterFunc ? this.filterFunc(todoItem) : true);
            }
        },
        resetAllVisible: function() {
            var filterFunc = this.filterFunc;
            this.itemViews.forEach(function(itemView) {
                itemView.setVisible(filterFunc ? filterFunc(itemView.model) : true);
            });
        },

        // Call controller
        createOnEnter: function(e) {
            if (e.which === ENTER_KEY) {
                var title = this.$newTitleInput.val().trim();
                if (title) {
                    // this.controller.createNewToDo(title);
                    this.model.createNewItem(title);
                    this.$newTitleInput.val('');
                }
            }
        }
    });

    // Define router
    var ToDoRouter = Backbone.Router.extend({
        // The followings are overrides default value
        routes: {
            '*filter': 'setFilter'
        },
        initialize: function(options) {
            this.app = options.app;
        },

        // The followings are functions defined for app
        setFilter: function(filter) {
            if (this.app) {
                this.app.setFilter(filter);
            }
        }
    });

    // Initialize app
    new ToDoRouter({
        app: new ToDoAppView({
            model: new ToDoCollection()
        })
    });
    Backbone.history.start();
})();
