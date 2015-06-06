var app = angular.module('question-busca-controller', ['autocomplete']);
app.controller('BuscaController',function($scope,$location) {
	$scope.movies = ["Lord of the Rings",
                        "Drive",
                        "Science of Sleep",
                        "Back to the Future",
                        "Oldboy"];

        // gives another movie array on change
        $scope.updateMovies = function(typed){
            // MovieRetriever could be some service returning a promise
            $scope.newmovies = MovieRetriever.getmovies(typed);
            $scope.newmovies.then(function(data){
              $scope.movies = data;
            });
        }

        $scope.selecionarPolitico = function(nomePolitico) {
            $location.path('/politico/'+nomePolitico);
        }
});