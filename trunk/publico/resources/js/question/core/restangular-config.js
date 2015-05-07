const enderecoRest = '/Rest-web';
var app = angular.module('question-restangular-config', ['restangular']);

app.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl(enderecoRest);
});