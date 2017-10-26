"USE STRICT";
app.controller("voluntarioController", function ($scope, $location, $compile, dbService) {

	var fs = require('fs');

	$scope.chooseFile = function(name) {
		var chooser = document.querySelector(name);
		chooser.addEventListener("change", function (evt) {
			var el = document.getElementById("showFile");
			var imageNameInput = document.getElementById("imageName");
			var emailInput = document.getElementById("email");
			var img = ["uploads/", new Date().getTime(), ".", this.files[0].name];
			 var imageNewPath = img[0]+ img[1]+ img[2]+ img[3];

			var source = fs.createReadStream(this.files[0].path);
			var desti = fs.createWriteStream(img[0] + img[1] + img[2] + img[3]);

			console.log(img[0] + img[1] + img[2] + img[3]);

			el.src = this.files[0].path;
			imageNameInput.focus();
			imageNameInput.value = img[0] + img[1] + img[2] + img[3];
			source.pipe(desti);
			source.on('end', function () {
				if(this.files)
				fs.unlink(this.files[0].path, function (err) {
					if (err) throw err;
				});
			});
			var buttonAppend = null;
			var buttonAppend =
				'<button id=*confirmBtn' + img[1] + '* type=*button* class=*glyphicon glyphicon-ok-circle* title=*Click para confirmar* ng-click=*changeImage(!' + img[1] + img[2] + img[3] + '!)*/>';
			
			buttonAppend = buttonAppend.replace(/\*/g, '"');
			buttonAppend = buttonAppend.replace(/!/g, '\'');
			console.log(buttonAppend);
			
			var $el = $("#confirmDv button").replaceWith(buttonAppend);
			var $el = $(buttonAppend).replaceAll("#confirmDv button");
			$compile($el)($scope);
			
			
		}, false);
		chooser.click();
	}
	
	function fixedEncodeURIComponent(str) {
		return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
	}
	
	
	$scope.changeImage = function (imagePath) {
		$scope.voluntario.imagem = "uploads/"+imagePath;
		var $el = $("#confirmDv button").replaceWith('<button type="button" style="display:none"></button>');
		var $el = $(buttonAppend).replaceAll("#confirmDv button");
		$compile($el)($scope);
	}

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
			console.log($scope.voluntario);
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