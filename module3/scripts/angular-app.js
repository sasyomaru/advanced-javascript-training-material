"use strict";

(function() {
    // "todos-angular" is just a hard-code id for storage
    var LOCAL_STORAGE_KEY = 'todos-angular';
    var ENTER_KEY = 13;
    var ESC_KEY = 27;

    var internalFilters = {
        active: function(toDoItem) {
            return !toDoItem.completed;
        },
        completed: function(toDoItem) {
            return toDoItem.completed;
        }
    };

    angular.module('ToDoAngular', ['ngRoute'])
        .service('storage', function($q) {
            // Storage service
            return {
                save: function(toDoCollection) {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toDoCollection));
                },
                load: function() {
                    var itemCollectionString = localStorage.getItem(LOCAL_STORAGE_KEY);
                    return itemCollectionString && JSON.parse(itemCollectionString) || [];
                }
            }
        })
        .directive('escHandler', function() {
            // Define directive for esc key
            return {
                restrict: 'A',
                link: function(scope, iElement, iAttrs) {
                    function keyEventHandler(event) {
                        if (event.keyCode === ESC_KEY) {
                            scope.$apply(iAttrs.escHandler);
                        }
                    }
                    iElement.on('keydown', keyEventHandler);
                    scope.$on('$destroy', function() {
                        iElement.off('keydown', keyEventHandler);
                    });
                }
            };
        })
        .directive('enterHandler', function() {
            // Define directive for enter key
            return {
                restrict: 'A',
                link: function (scope, iElement, iAttrs) {
                    function keyEventHandler(event) {
                        if (event.keyCode === ENTER_KEY) {
                            scope.$apply(iAttrs.enterHandler);
                        }
                    }

                    iElement.on('keydown', keyEventHandler);
                    scope.$on('$destroy', function () {
                        iElement.off('keydown', keyEventHandler);
                    });
                }
            };
        })
        .directive('selectAndFocus', function($timeout) {
            // Define directive for focus
            return {
                restrict: 'A',
                link: function(scope, iElement, iAttrs) {
                    var focusPromise;
                    scope.$watch(iAttrs.selectAndFocus, function(newValue) {
                        if (newValue && !focusPromise) {
                            focusPromise = $timeout(function focus() {
                                focusPromise = null;
                                iElement[0].focus();
                            }, 0, false);
                        }
                    });
                    scope.$on('$destroy', function() {
                        if (focusPromise) {
                            $timeout.cancel(focusPromise);
                            focusPromise = null;
                        }
                    });
                }
            };
        })
        .directive('toDoItem', function() {
            // Define directive for to-do item
            return {
                restrict: 'A',
                templateUrl: 'angular-item-template.html',
                scope: {
                    itemViewModel: '=toDoItem'
                },
                link: function (scope, iElement, iAttrs) {
                    scope.editing = false;
                    scope.originalTitle = '';

                    scope.$watch('itemViewModel.toDoItem.completed', function(newCompleted) {
                        iElement.toggleClass('completed', newCompleted);
                    });

                    scope.$watch('editing', function(newEditing) {
                        iElement.toggleClass('editing', newEditing);
                    });

                    scope.$watch('itemViewModel.isHidden', function(newHidden) {
                        iElement.toggleClass('hidden', newHidden);
                    });

                    scope.$watchGroup([
                        'itemViewModel.toDoItem.title',
                        'itemViewModel.toDoItem.completed'], function() {
                        scope.$emit('item-updated');
                    });

                    scope.destroy = function() {
                        scope.$emit('remove-item', scope.itemViewModel);
                    };

                    scope.edit = function() {
                        scope.originalTitle = scope.itemViewModel.toDoItem.title;
                        scope.editing = true;
                    };

                    scope.update = function() {
                        var title = scope.itemViewModel.toDoItem.title || '';
                        var trimmedTitle = title.trim();

                        if (scope.editing) {
                            if (title !== trimmedTitle) {
                                scope.itemViewModel.toDoItem.title = trimmedTitle;
                            }

                            if (!trimmedTitle) {
                                scope.destroy();
                            }
                            scope.editing = false;
                        }
                    };

                    scope.revert = function() {
                        scope.editing = false;
                        scope.itemViewModel.toDoItem.title = scope.originalTitle;
                    };
                }
            };
        })
        .controller('AppController', function AppController(
            $scope, $routeParams, storedToDoCollection, storage) {
            // Define app controller

            $scope.toDoCollection = storedToDoCollection.map(function(storedToDo) {
                return {
                    toDoItem: storedToDo,
                    isHidden: $scope.filter ? !$scope.filter(storedToDo): false
                };
            });

            $scope.currentTitle = '';

            $scope.$on('$routeChangeSuccess', function() {
                var filterString = $routeParams.filter;
                if (filterString && (filterString in internalFilters)) {
                    $scope.filterString = filterString;
                    $scope.filter = internalFilters[filterString];
                } else {
                    $scope.filterString = '';
                    $scope.filter = null;
                }
            });

            function save() {
                storage.save($scope.toDoCollection.map(function(toDoViewModel) {
                    return toDoViewModel.toDoItem;
                }));
            }

            $scope.$watch('filter', function(newFilter) {
                $scope.toDoCollection.forEach(function(toDoViewModel) {
                    toDoViewModel.isHidden = newFilter ? !newFilter(toDoViewModel.toDoItem) : false;
                });
            });

            $scope.$watch(function() {
                return $scope.toDoCollection.filter(function(toDoViewModel){
                    return !toDoViewModel.toDoItem.completed;
                }).length;
            }, function(newValue) {
                if (newValue == null) {
                    $scope.remainingLabel = '';
                } else {
                    $scope.remainingLabel =  newValue === 1 ?
                        (newValue + ' item left') :
                        (newValue + ' items left');
                }
            });

            $scope.$watchCollection('toDoCollection', function() {
                save();
            });

            $scope.$on('item-updated', function() {
                save();
            });

            $scope.$on('remove-item', function(scope, toDoViewModel) {
                for(var index = 0; index < $scope.toDoCollection.length; index++) {
                    if ($scope.toDoCollection[index] === toDoViewModel) {
                        $scope.toDoCollection.splice(index, 1);
                        return;
                    }
                }
            });

            $scope.create = function() {
                var currentTitle = $scope.currentTitle.trim();
                if (currentTitle) {
                    var toDoItem = {
                        title: currentTitle,
                        completed: false
                    };
                    var toDoItemViewModel = {
                        toDoItem: toDoItem,
                        isHidden: $scope.filter ? !$scope.filter(toDoItem): false
                    };
                    $scope.toDoCollection.push(toDoItemViewModel);
                    $scope.currentTitle = '';
                }
            };
        })
        .config(function($routeProvider) {
            // Define routing
            var routeConfig = {
                controller: 'AppController',
                templateUrl: 'angular-app-template.html',
                resolve: {
                    storedToDoCollection: function(storage) {
                        return storage.load();
                    }
                }
            };
            $routeProvider
                .when('/', routeConfig)
                .when('/:filter', routeConfig)
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
