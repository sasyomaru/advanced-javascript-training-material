"use strict";

(function() {
    // "todos-knockout" is just a hard-code id for storage
    var LOCAL_STORAGE_KEY = 'todos-knockout';
    var ENTER_KEY = 13;
    var ESC_KEY = 27;

    // Create custom binding
    function createKeyHandlerBinding(key) {
        return {
            init: function(element, valueAccessor, allBindingsAccessor, data, bindingContext) {
                var wrappedHandler = function(data, event) {
                    if (event.keyCode === key) {
                        valueAccessor().call(this, data, event);
                    }
                };
                var newValueAccessor = function() {
                    return {
                        keyup: wrappedHandler
                    };
                };

                // Call event binding's init function
                ko.bindingHandlers.event.init(element, newValueAccessor, allBindingsAccessor, data, bindingContext);
            }
        };
    }

    ko.bindingHandlers.enterKey = createKeyHandlerBinding(ENTER_KEY);
    ko.bindingHandlers.escapeKey = createKeyHandlerBinding(ESC_KEY);

    ko.bindingHandlers.selectAndFocus = {
        init: function(element, valueAccessor, allBindingsAccessor, bindingContext) {
        },
        update: function(element, valueAccessor) {
            var value = !!ko.utils.unwrapObservable(valueAccessor());
            setTimeout(function() {
                value ? element.focus() : element.blur();
                if (!value) {
                    element.ownerDocument.body.focus();
                }
            });
        }
    }

    // Define view model for item
    function ToDoItemViewModel(toDoItem) {
        this.toDoItem = {
            title: ko.observable(toDoItem.title),
            completed: ko.observable(toDoItem.completed || false)
        };
        this.editing = ko.observable(false);
        this.isHidden = ko.observable(false);
        this.previousTitle = null;  // This doesn't need to be bound
    };
    ToDoItemViewModel.prototype.setParent = function(parentViewModel) {
        this.$parent = parentViewModel;
    };
    ToDoItemViewModel.prototype.getTodoItem = function() {
        return {
            title: this.toDoItem.title(),
            completed: this.toDoItem.completed()
        };
    };
    ToDoItemViewModel.prototype.destroy = function() {
        if (this.$parent) {
            this.$parent.remove(this);
            this.$parent = null;
        }
    };
    ToDoItemViewModel.prototype.edit = function() {
        this.editing(true);
        this.previousTitle = this.title();
    };
    ToDoItemViewModel.prototype.update = function() {
        var title = this.toDoItem.title();
        var trimmedTitle = title.trim();

        if (this.editing()) {
            if (title !== trimmedTitle) {
                this.toDoItem.title(trimmedTitle);
            }

            if (!trimmedTitle) {
                this.removeFromParent();
            }
            this.editing(false);
        }
    };
    ToDoItemViewModel.prototype.revert = function() {
        this.editing(false);
        this.toDoItem.title(this.previousTitle);
    };

    var internalFilters = {
        active: function(toDoItem) {
            return !toDoItem.completed();
        },
        completed: function(toDoItem) {
            return toDoItem.completed();
        }
    };

    // Define view model for collection
    function AppViewModel(toDoCollection) {
        // Map model to View
        this.toDoCollectionViewModel = ko.observableArray(toDoCollection.map((function(toDoItem) {
            var toDoItemViewModel = new ToDoItemViewModel(toDoItem);
            toDoItemViewModel.setParent(this);
            return toDoItemViewModel;
        }).bind(this)));

        this.filter = ko.observable('');

        this.currentTitle = ko.observable('');

        this.remainingLabel = ko.computed(function() {
            var remaining = this.toDoCollectionViewModel().filter(function(toDoItemViewModel){
                return !toDoItemViewModel.toDoItem.completed();
            }).length;
            return remaining === 1 ? (remaining + ' item left') : (remaining + ' items left');
        }, this);

        // Internal compute observable that fires whenever anything changes in collection
        ko.computed(function() {
            localStorage.setItem(LOCAL_STORAGE_KEY, ko.toJSON(this.getToDoCollection()));
        }, this).extend({
            rateLimit: { timeout: 500, method: 'notifyWhenChangeStop' }
        });

        ko.computed(function() {
            var filter = this.filter();
            var filterFunc = filter && internalFilters[filter];
            return this.toDoCollectionViewModel().forEach(function(toDoItemViewModel) {
                toDoItemViewModel.isHidden(filterFunc ? !filterFunc(toDoItemViewModel.toDoItem): false);
            });
        }, this);
    };
    AppViewModel.prototype.getToDoCollection = function() {
        return this.toDoCollectionViewModel().map(function(toDoItemViewModel) {
            return toDoItemViewModel.getTodoItem();
        });
    };
    AppViewModel.prototype.create = function() {
        var currentTitle = this.currentTitle().trim();
        if (currentTitle) {
            var toDoItemViewModel = new ToDoItemViewModel({ title: currentTitle });
            var filter = this.filter();
            var filterFunc = filter && internalFilters[filter];
            toDoItemViewModel.isHidden(filterFunc ? !filterFunc(toDoItemViewModel.toDoItem): false);
            this.toDoCollectionViewModel.push(toDoItemViewModel);
            this.currentTitle('');
        }
    };
    AppViewModel.prototype.remove = function(toDoViewModel) {
        this.toDoCollectionViewModel.remove(toDoViewModel);
    };
    AppViewModel.prototype.setFilter = function(filter) {
        if (!filter || !(filter in internalFilters)) {
            filter = '';
        }
        this.filter(filter);
    };

    var toDoCollection = ko.utils.parseJson(localStorage.getItem(LOCAL_STORAGE_KEY));
    var appViewModel = new AppViewModel(toDoCollection || []);
    ko.applyBindings(appViewModel, $('.knockout-app')[0]);

    // Setup filter routing
    Router({
        '/:filter': appViewModel.setFilter.bind(appViewModel),
        '/': appViewModel.setFilter.bind(appViewModel, '')
    }).init();
})();
