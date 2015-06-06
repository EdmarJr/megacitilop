var app = angular.module('question-politico-controller', ['autocomplete']);
app.controller('PoliticoController',function($scope,$routeParams) {

	$scope.mostrarInclusao = false;
	$scope.mostrarVisualizacao = true;

	$scope.incluirEditarPolitico = function() {
		$scope.mostrarInclusao = true;
		$scope.mostrarVisualizacao = false;
	}

	$scope.politico = {
		id:1,
		nome:$routeParams.nome,
		imagens: [],
		dataNascimento:"02/08/1993",
		descricaoHistoriaVida:"teste",
		carreiraProfissional:{trabalhos:[]},
		curtidas: [],
		descurtidas: [],
		fatosNegativos: [],
		fatosPositivos: []
	};

	$scope.politico.imagens.push({
		endereco: "http://quemtemmedodademocracia.com/wp-content/uploads/2013/08/jair-bolsonaro.jpg",
		isPrincipal: true
	});
	$scope.politico.carreiraProfissional.trabalhos.push({
		cargo:"teste cargo",
		empresa:"",
		descricaoAtividades:"",
		isCargoPolitico: true,
		descricaoTrajetoria: "",
		pontosFavoraveis: [],
		pontosDesfavoraveis: [],
		dataInicio:"",
		dataFim:"",
		isCargoPrincipal:true
	});

	$scope.politico.fatosNegativos.push({id:1,descricao:"teste Ruim1"});
	$scope.politico.fatosPositivos.push({id:2,descricao:"teste Ruim2"});
	$scope.politico.fatosNegativos.push({id:3,descricao:"teste Ruim3"});
	$scope.politico.fatosPositivos.push({id:4,descricao:"teste Ruim4"});
	$scope.politico.fatosNegativos.push({id:5,descricao:"teste Ruim5"});
	$scope.politico.fatosPositivos.push({id:6,descricao:"teste Ruim6"});
	$scope.politico.fatosNegativos.push({id:7,descricao:"teste Ruim7"});
	$scope.politico.fatosPositivos.push({id:8,descricao:"teste Ruim8"});


	setTimeout(function() {
		$scope.politico.imagens.forEach(function(imagem) {
			if(imagem.isPrincipal) {
				$scope.politico.enderecoImagemPrincipal = imagem.endereco;
				$scope.$apply();
			}
		});
	},0);

	setTimeout(function() {
		$scope.politico.carreiraProfissional.trabalhos.forEach(function(trabalho) {
			if(trabalho.isCargoPrincipal) {
				$scope.politico.carreiraProfissional.cargoPrincipal = trabalho.cargo;
				$scope.$apply();
			}
		});
	},0);
	

});

app.controller('GerenciarPoliticosController',function($scope) {
	$scope.politico = {};
	$scope.politicos = [{id:1,nome:"Edmar Barboza Fagundes da Costa Junior",cargo:"Presidente do Brasil"}];
	$scope.listagemPoliticosVisivel = true;
	$scope.inclusaoAlteracaoPoliticoVisivel = false;
	$scope.incluirPolitico = function() {
		$scope.listagemPoliticosVisivel = false;
		$scope.inclusaoAlteracaoPoliticoVisivel = true;
	}
});

app.directive('navegacaoPolitico', function() {
	return {
		restrict:'A',
		templateUrl: '/pages/politico/components/navegacao.html',
		scope: true,
		controller: function($scope) {
		}
	}
});

app.directive('visualizacaoPolitico', function() {
	return {
		restrict:'A',
		templateUrl: '/pages/politico/components/visualizacaoPolitico.html',
		scope: true,
		controller: function($scope) {
		}
	}
});

app.directive('inclusaoAlteracaoPolitico', function() {
	return {
		restrict:'A',
		templateUrl: '/pages/politico/components/inclusaoAlteracaoPolitico.html',
		scope: true,
		controller: function($scope,$filter,ngTableParams) {
			$scope.modalInclusaoAlteracaoFatosVisivel = false;
			criarTabelaPadrao($scope.politico.fatosPositivos != undefined ? $scope.politico.fatosPositivos : [] ,ngTableParams,$filter,function(tableParams) {
				$scope.tableParamsFatosPositivos = tableParams;
			});

			criarTabelaPadrao($scope.politico.fatosNegativos != undefined ? $scope.politico.fatosNegativos : [] ,ngTableParams,$filter,function(tableParams) {
				$scope.tableParamsFatosNegativos = tableParams;
			});

			$scope.alterarFato = function() {
				$scope.modalInclusaoAlteracaoFatosVisivel = true;
			}

			$scope.onCloseModal = function() {
				$scope.modalInclusaoAlteracaoFatosVisivel = false;
			}

		}
	}
});

app.directive('modalInclusaoAlteracaoFatos', function() {
	return {
		restrict:'A',
		transclude:true,
		scope:{onClose: "&"},
		templateUrl: '/pages/politico/components/modalInclusaoEdicaoFato.html',
		controller: function($scope) {
			
		},
		link: function (scope, element, attrs) {
			$(element).find('.modal').on('hidden.bs.modal', function () {
			    scope.onClose();
			});
			scope.showModal = function(visible, elem) {
				if (!elem)
					elem = element;

				if (visible == 'true')
					$(elem).find('.modal').modal("show");                     
				else
					$(elem).find('.modal').modal("hide");
			}

			scope.$watch(function() {return attrs.showModal}, function (newValue, oldValue) {
				scope.showModal(newValue, attrs.$$element);
			});
		}
	}
});

app.directive('listagemPoliticos', function() {
	return {
		restrict:'A',
		templateUrl: '/pages/politico/components/listagemPoliticos.html',
		scope: true,
		controller: function($scope,$filter,ngTableParams) {
			criarTabelaPadrao($scope.politicos,ngTableParams,$filter,function(tableParams) {
				$scope.tableParams = tableParams;
			});

			$scope.changeSelection = function(user) {
	        // console.info(user);
	    }
	}
}
});

app.directive('inclusaoFato', function() {
	return {
		restrict:'A',
		templateUrl: '/pages/politico/components/inclusaoFato.html',
		scope: true,
		controller: function($scope) {

		}
	}
});