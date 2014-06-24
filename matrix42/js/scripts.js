var Market = angular.module("Market", []);


Market.factory("dataFactory", function ($http) {
	var
		factory = {},
		path = '/matrix42/js/';

	factory.loadProducts = function () {
		return $http.get(path + 'products.json');
	};
	factory.loadCategories = function () {
		return $http.get(path + 'categories.json');
	};
	return factory;
});


Market.controller("MarketCtrl", function ($scope, dataFactory) {

	$scope.categories = [];
	$scope.products = [];
	$scope.card = [];

	$scope.currentCategory=0;

	var init = function() {
		dataFactory.loadProducts().success(function (data) {$scope.products = data;});
		dataFactory.loadCategories().success(function (data) {$scope.categories = data;});
	}
	
	$scope.setCurrentCategory = function(id) {
		$scope.currentCategory = id;
	}

	$scope.filterByCategory = function (el) {
		return el.category_id === $scope.currentCategory || $scope.currentCategory === 0;
	}

	$scope.addToCard = function (product) {
		$scope.card.push(product);
	}
	
	$scope.removeFromCard = function (index) {
		$scope.card.splice(index, 1);
	}

	$scope.isInCard = function (product) {
		return $scope.card.indexOf(product) !== -1;
	}

	init();

});
