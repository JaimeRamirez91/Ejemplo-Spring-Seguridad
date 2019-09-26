$.getScript("../js/notification-custom.js", function(data, textStatus, jqxhr) {
});
// console.log( data ); // Data returned //console.log( textStatus ); //
// Success //console.log( jqxhr.status ); // 200 //console.log( "Load
// was performed." );

// Show Modal Add

// Id Row data table
let idRow = 0;
let idDelete = 0;
const table = $('#dataTable');

$(document).ready(function() {
	init();
	// Mantiene el tamaño del dataTable
	$('.dataTables_scrollBody').css('height', '400px');
	
});

function init() {

	table.DataTable({

		"searching" : true,
		"destroy" : true,
		"conditionalPaging" : true,
		"scrollY" : '330px',
		"scrollCollapse" : true,
		"paging" : true,
		"ajax" : {
			"method" : "GET",
			"url" : "/administracion/getsucursales"
		},
		// "deferRender": true,
		"columns" : [ {
			"data" : "correlativo"
		}, {
			"data" : "nombre"
		}, {
			"data" : "direccion"
		}, {
			"data" : "tel"
		}, {
			"data" : "email"
		}, {
			"data" : "detalle"
		}, {
			"data" : "editar"
		}, {
			"data" : "eliminar"
		}, ],

		"buttons" : [ {
			"copy" : 'copy'
		} ],
		"lengthMenu" : [ [ 5, 10, 20, 30 ], [ 5, 10, 20, 30 ] ],
		"language" : {
			"lengthMenu" : "Mostrar _MENU_ ",
			"zeroRecords" : "Datos no encontrados - upss",
			"info" : "Mostar páginas _PAGE_ de _PAGES_",
			"infoEmpty" : "Datos no encontrados",
			"infoFiltered" : "(Filtrados por _MAX_ total registros)",
			"search" : "Buscar:",
			"paginate" : {
				"first" : "Primero",
				"last" : "Anterior",
				"next" : "Siguiente",
				"previous" : "Anterior"
			},
		}

	});
}
//add Sucursal
$('body').on('click', '#addsucursal',function(e){
	   e.preventDefault;
	   $("#modalAddRol").modal("show");
	   // Remove previous errors
	   removerErrors();
	   // clean
	   limpiarImput();
	   
	});
//phone
$(' input[name="telefono"]').attr({ placeholder : 'TELEFONO: (XXX) XXXX-XXXX' });
$("input[name='telefono]").keyup(function() {
    $(this).val($(this).val().replace(/^(\d{3})(\d{3})(\d)+$/, "($1)$2-$3"));
});