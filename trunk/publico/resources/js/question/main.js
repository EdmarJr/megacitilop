var app = angular.module('question', ['question-restangular-config','question-auth','question-routes','question-home-controller','question-busca-controller','question-politico-controller','ngTable']);

function adicionarMensagemSuccesso(scope,mensagem) {
	scope.mensagemSucesso = mensagem;
	setTimeout(function() {
		scope.mensagemSucesso = undefined;
		scope.$apply();
	},3000);
}

function criarTabelaPadrao(array,ngTableParams,$filter,callback) {
    var tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter: {
            //name: 'M'       // initial filter
        },
        sorting: {
            //name: 'asc'     // initial sorting
        }
    }, {
        total: array.length, // length of data
        getData: function ($defer, params) {
            // use build-in angular filter
            var filteredData = params.filter() ?
                    $filter('filter')(array, params.filter()) :
                    	array;
            var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) :
                    	array;

            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
    callback(tableParams);
}