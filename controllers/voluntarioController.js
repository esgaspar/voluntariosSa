"USE STRICT";
app.controller("voluntarioController", function ($scope, $location, dbService) {
	// var dataForm = $location.body;
	// var name = location.files.showFile;
	//Listando
	$scope.listaVoluntarios = function () {
		dbService.runAsync("SELECT * FROM voluntarios WHERE ativo = 1", function (data) {
			$scope.voluntarios = data;
		});
	}
	$scope.phoneNumbr = '\([0-9]{2}\) [0-9]{4,6}-[0-9]{3,4}$';
	//Salvando
	$scope.salvar = function () {
		if (!$scope.voluntarioForm.$valid) {

			alert('Verifique os campos');
		} else {
			if ($scope.voluntario.id) {
				//Editar
				var id = $scope.voluntario.id;
				delete $scope.voluntario.id;
				delete $scope.voluntario.$$hashKey; //Apaga elemento $$hashKey do objeto
				dbService.update('voluntarios', $scope.voluntario, {
					id: id
				}); //entidade, dados, where
			} else {
				//nova
				dbService.insert('voluntarios', $scope.voluntario); // entidade, dados
			}
			$scope.voluntario = {};
			$scope.listaVoluntarios();
			$('#modalPessoa').modal('hide');
		}
	}

	//Abrindo para editar
	$scope.editar = function (dados) {
		$scope.voluntario = dados;
		$('#modalPessoa').modal('show');
	}

	//Excluindo
	$scope.excluir = function (dados) {
		if (confirm("Deseja realmente apagar o cadastro de " + dados.nome + "?")) {
			dbService.update('voluntarios', {
				ativo: 0
			}, {
				id: dados.id
			});
			$scope.listaVoluntarios();
		}
	}
});