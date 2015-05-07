var app = angular.module('question', ['question-restangular-config','question-auth','question-routes']);

function adicionarMensagemSuccesso(scope,mensagem) {
	scope.mensagemSucesso = mensagem;
	setTimeout(function() {
		scope.mensagemSucesso = undefined;
		scope.$apply();
	},3000);
}