$.getScript("../js/notification-custom.js", function (data, textStatus, jqxhr) {
});
$.getScript("../js/modal-action.js", function (data, textStatus, jqxhr) { });

// Show Modal Add

// Id Row data table
let idRow = 0;
let idDelete = 0;
const table = $('#dataTable');

$(document).ready(function () {
	init();
	// Mantiene el tamaño del dataTable
	$('.dataTables_scrollBody').css('height', '400px');

});

$('body').on('click', '#btn-frm-search-empleado', (e) => {
	e.preventDefault;
	let sucursales = $('#sucursales').val();
	let empleos = $('#empleos').val();
	// console.log(empleos+sucursales);
	getSucursales(empleos, sucursales);
});

function init() {

	table.DataTable({

		"searching": true,
		"destroy": true,
		"keys": true,
		"conditionalPaging": true,
		"scrollY": '400px',
		"scrollCollapse": true,
		"paging": true,
		"lengthMenu": [[5, 10, 20, 30], [5, 10, 20, 30]],
		"language": {
			"lengthMenu": "Mostrar _MENU_ ",
			"zeroRecords": "Datos no encontrados - upss",
			"info": "Mostar páginas _PAGE_ de _PAGES_",
			"infoEmpty": "Datos no encontrados",
			"infoFiltered": "(Filtrados por _MAX_ total registros)",
			"search": "Buscar:",
			"paginate": {
				"first": "Primero",
				"last": "Anterior",
				"next": "Siguiente",
				"previous": "Anterior"
			},
		}

	});
}
function getSucursales(empleos, sucursales) {
	/* "/administracion/getEmpleados/1/Gerente funciona" */
	let peticionGet = "/administracion/getEmpleados/";
	if (sucursales.length > 0) {
		peticionGet = peticionGet + sucursales;
		if (empleos.length > 0)
			peticionGet = peticionGet + "/" + empleos;
	}
	console.log(peticionGet);
	table.DataTable({

		"searching": true,
		"destroy": true,
		"conditionalPaging": true,
		"scrollY": '400px',
		"scrollCollapse": true,
		"paging": true,
		"ajax": {
			"method": "GET",
			"url": peticionGet
		},


		// "deferRender": true,
		"columns": [{
			"data": "correlativo", "width": "1% "
		}, {
			"data": "nombre"
		}, {
			"data": "apellido"
		}, {
			"data": "direccion"
		}, {
			"data": "contacto"
		}, {
			"data": "cargo"
		}, {
			"data": "sucursal"
		}, {
			"data": "estadoPerfil"
		}, {
			"data": "editar"
		}, {
			"data": "eliminar"
		},],
		"lengthMenu": [[5, 10, 20, 30], [5, 10, 20, 30]],
		"language": {
			"lengthMenu": "Mostrar _MENU_ ",
			"zeroRecords": "Datos no encontrados - upss",
			"info": "Mostar páginas _PAGE_ de _PAGES_",
			"infoEmpty": "Datos no encontrados",
			"infoFiltered": "(Filtrados por _MAX_ total registros)",
			"search": "Buscar:",
			"paginate": {
				"first": "Primero",
				"last": "Anterior",
				"next": "Siguiente",
				"previous": "Anterior"
			},
		}

	});

}
// add Empleado
$('body').on('click', '#btnNuevoEmpleado', function (e) {
	e.preventDefault;
	$("#modalAddEmpleado").modal("show");
	// Remove previous errors
	removerErrors();
	// clean
	limpiarImput();

});

// Guardar empleado
$('body').on('click', '#btnGuardarEmpleado', function (e) {
	// Prevent default submission of form
	e.preventDefault();
	removerErrors();
	// alert("#");
	$.post({
		url: '../administracion/saveEmpleado',
		data: $('#registrationForm').serialize(),
		success: function (res) {
			if (res.validated) {
				// take your successful action here; you may want to
				// redirect to another page
				// clean
				//limpiarImput();
				// actualizar data table
				let numbreRowDataTable = $('#dataTable tr').length;
				if (numbreRowDataTable > 3) {
					table.DataTable().ajax.reload(null, false);
				}
				// add alerta
				$('#modalAddEmpleado').fadeOut(() => {
					$('#modalAddEmpleado').modal('hide');
				});
				successAlert("<strong>Éxito</strong>", "<br>Registro agregado", "success");
			} else {
				// add alerta
				$('#registrationForm').before('<div class="alert alert-danger text-center mt-2" role="alert" id="alerta"> Complete el formulario </div>').animate(4000);

				$.each(res.errorMessages, function (key, value) {
					console.log(key + value);
					$('input[name=' + key + ']').after('<span class="form-text text-danger text-center">' + value + '</span>');
					$('select[name=' + key + ']').after('<span class="form-text text-danger text-center">' + value + '</span>');
				});
			}
		}, error: function (e) {
			successAlert("<strong>Error</strong>", "<br>Si el problema persiste consulte a su proveedor de servicios", "danger");
			console.log(console.log(JSON.stringify(e)));
		}
	})
});


//Edit
$('body').on('click', '.openEdit', function (e) {
	e.preventDefault();
	// Remove previous errors
	removerErrors();
	// clean
	limpiarImput();
	let id = $(this).parent().parent().children('td:eq(0)').text();
	$.get({
		url: '../administracion/getEmpleadoById/' + id,
		success: function (res) {
			
			$('#EditForm input[name="id"]').val(id);
			$('#EditForm input[name="nombre"]').val(res.data.nombre);
			$('#EditForm input[name="apellido"]').val(res.data.apellido);
			$('#EditForm input[name="edad"]').val(res.data.fecha_nac);
			$('#EditForm input[name="profesion"]').val(res.data.profesion);
			$('#EditForm input[name="contacto"]').val(res.data.contacto);
			$('#EditForm input[name="direccion"]').val(res.data.direccion);
			$('#EditForm select[name="empresa"] option[value="' + res.data.sucursal_id + '"]').prop('selected', true);
			$('#EditForm select[name="cargo"] option[value="' + res.data.puesto + '"]').prop('selected', true);
			$('#modalEditEmpleado').modal('show');
			console.log(res);
		}, error: function (e) {
			var response = e['responseJSON'];
			if(response['error']=="UNPROCESSABLE_ENTITY"){
               successAlert("<strong>Error</strong>", "<br>Registro corrupto, contactar con el administrador de BD", "danger");
			}else{
				successAlert("<strong>Error</strong>", "<br>Si el problema persiste consulte a su proveedor de servicios", "danger");
			//console.log(console.log(JSON.stringify(e)));
			}
			
		}
	})
});

	// Editar guardar empleado
	$('body').on('click', '#btnEditarEmpleado', function (e) {
		// Prevent default submission of form
		e.preventDefault();
		removerErrors();
	
		// alert("#");
		$.post({
			url: '../administracion/saveEmpleado',
			data: $('#EditForm').serialize(),
			success: function (res) {
				console.log(res);
				if (res.validated) {
					// clean inputs
					limpiarImput()

					 table.DataTable().ajax.reload(null, false);

					$('#modalEditEmpleado').fadeOut(() => {
						$('#modalEditEmpleado').modal('hide');
					});
                  
						//alert(contador);
					    successAlert("<strong>Éxito</strong>", "<br>Registro modificado", "success");
					
				} else {
					// add alerta
					$('#registrationForm').before('<div class="alert alert-danger text-center mt-2" role="alert" id="alerta"> Complete el formulario </div>').animate(4000);

					$.each(res.errorMessages, function (key, value) {
						console.log(key + value);
						$('input[name=' + key + ']').after('<span class="form-text text-danger text-center">' + value + '</span>');
						$('select[name=' + key + ']').after('<span class="form-text text-danger text-center">' + value + '</span>');
					});
				}
			}, error: function (e) {
				successAlert("<strong>Error</strong>", "<br>Si el problema persiste consulte a su proveedor de servicios", "danger");
				console.log(console.log(JSON.stringify(e)));
			}
		})
	});




// eliminar
$('body').on('click', '.openDelete', function (e) {
	// Prevent default submission of form
	let id = $(this).parent().parent().children('td:eq(0)').text();
	let nombre = $(this).parent().parent().children('td:eq(1)').text();
	let apellido = $(this).parent().parent().children('td:eq(2)').text();
	e.preventDefault();
	$('#modalDelete').modal("show");
	$('#nombreregistro').text("Eliminar el registro(Perfil y Usuario): " + nombre + " " + apellido);
	idDelete = id;
});

$('body').on('click', '#btn-delete-confirm', function (e) {
	$.ajax({
		type: "delete",
		url: "http://localhost:8080/administracion/deleterempleado/" + idDelete,
		headers: { "X-CSRF-TOKEN": $("input[name='_csrf']").val() },
		contentType: "application/json",
		dataType: 'json',
		success: function (result) {
			// Refrescamos la pagina del data table sin cambiar de pagina
			table.DataTable().ajax.reload(null, false);
			// Detectamos si la pagina del Data table contiene Rows
			let numbreRowDataTable = $('#dataTable tr').length;// 3 es por
			// defecto
			// contado
			// la fila
			// de buscar
			// y
			// cabecera
			// y pie de
			$('#modalDelete').fadeOut(() => {
				$('#modalDelete').modal('hide');
			});
			successAlert("<strong>Éxito</strong>", "<br>Registro Eliminado", "success");
			if (numbreRowDataTable > 3) {
				// $('#modalEditRol').modal('hide');
			} else {
				// Ir una pagina atras
				$('#dataTable').DataTable().page('previous').draw('page');
			}

		}, statusCode: {
			500: function (e) {
				successAlert("<strong>Error</strong>", "<br> ¡¡Upss!! algo salió mal, error: 500", "danger");
			},
			404: function (e) {
				successAlert("<strong>Error</strong>", "<br> ¡¡Upss!! algo salió mal, error: 404", "danger");
			},
			403: function (e) {
				successAlert("<strong>Error</strong>", "<br> ¡¡Upss!! algo salió mal, error: 403", "danger");
			}
		}, error: function (e) {
			$('#modalDelete').fadeOut(() => {
				$('#modalDelete').modal('hide');
			});
			successAlert("<strong>Error</strong>", "<br>Si el problema persiste consulte a su proveedor de servicios", "danger");
			console.log(console.log(JSON.stringify(e)));
		}
	});

})
