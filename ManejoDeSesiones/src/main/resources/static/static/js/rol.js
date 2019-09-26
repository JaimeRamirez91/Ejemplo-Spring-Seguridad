
$.getScript( "../js/notification-custom.js", function( data, textStatus, jqxhr ) {});
$.getScript( "../js/modal-action.js", function( data, textStatus, jqxhr ) {});

// Id Row data table
let idRow = 0;
let idDelete = 0;
const table = $('#dataTable'); 


$('body').on('click', '#addRol',function(e){
   e.preventDefault;
   $("#modalAddRol").modal("show");
   // Remove previous errors
   removerErrors();
   // clean
   limpiarImput();
   
});


// Save Rol
$('body').on('click', '#submitButton',function(e){
           // Prevent default submission of form
        e.preventDefault();
        // Remove previous errors
        removerErrors();   
        $.post({
            url: '../administracion/saveRol',
            data: $('#registrationForm').serialize(),
            success: function (res) {
                if (res.validated) {
                     // take your successful action here; you may want to
						// redirect to another page
                	 // clean
                	  limpiarImput()
                	  // actualizar data table
                	   table.DataTable().ajax.reload(null, false);
                	  // add alerta
                	  $('#modalAddRol').fadeOut(()=>{
                		  $('#modalAddRol').modal('hide');
                	  });
                	  successAlert("<strong>Éxito</strong>","<br>Registro agregado", "success");
                } else {
                	// add alerta
                	$('#registrationForm').before('<div class="alert alert-danger text-center mt-2" role="alert" id="alerta"> Complete el formulario </div>').animate(4000);
                    
                	$.each(res.errorMessages, function (key, value) {
                        $('input[name=' + key + ']').after('<span class="form-text text-danger">' + value + '</span>');
                        $('textarea[name=' + key + ']').after('<span class="form-text text-danger">' + value + '</span>');
                        
                    });
                }
            },error: function (e) {
	            	$('#modalAddRol').fadeOut(()=>{
	          		  $('#modalAddRol').modal('hide');
	          	     });
	            	
	            	 console.log(e.responseJSON);
	            	 successAlert("<strong>Error</strong>","<br>"+e.responseJSON["message"]+"", "danger");
              
            }
        })
    }); 
// Show Modal Edit

$('body').on('click', '.openEditRol',function(e){
   e.preventDefault;
  
   let id =  $(this).parent().parent().children('td:eq(0)').text();
   let nombre =  $(this).parent().parent().children('td:eq(1)').text();
   let detalle =  $(this).parent().parent().children('td:eq(2)').text();
   // Agregando clase para editar fila data table
   $(this).parent().parent().addClass( "updateRow" );
   
   // Captura IDROW
   idRow = "row"+id;
   $('#modalEditRol').modal('show');
   $('#editForm #id').val(id) ;
   $('#editForm #nombre').val(nombre);
   $('#editForm #detalle').val(detalle);
   // Remove previous errors
   removerErrors();
});


// Save Editar
$('body').on('click', '#submitButtonEdit',function(e){
        // Prevent default submission of form
        e.preventDefault();
       
        // Remove previous errors
        removerErrors();

        $.post({
            url: '../administracion/saveRol',
            data: $('#editForm').serialize(),
            success: function (res) {
                if (res.validated) {
                	 
                      $( "tr" ).removeClass( "updateRow" )
                     
                      // clean inputs
                	  limpiarImput()
                	  table.DataTable().ajax.reload(null, false);
                	  
                      $('#modalEditRol').fadeOut(()=>{
                		  $('#modalEditRol').modal('hide');
                	  });
                      successAlert("<strong>Éxito</strong>","<br>Registro modificado", "success");
                      
                } else {     
                	// add alerta
                	$('#editForm').before('<div class="alert alert-danger text-center mt-1" role="alert" id="alerta"> Complete el formulario </div>').animate(4000);
                    
                	$.each(res.errorMessages, function (key, value) {
                        $('input[name=' + key + ']').after('<span class="form-text text-danger text-center">' + value + '</span>');
                        $('textarea[name=' + key + ']').after('<span class="form-text text-danger text-center ">' + value + '</span>');
                        
                    });
                }
            },error: function (e) {
            	$('#modalAddRol').fadeOut(()=>{
	          		  $('#modalEditRol').modal('hide');
	          	     });
	            	
	            	 console.log(e.responseJSON);
	            	 successAlert("<strong>Error</strong>","<br>"+e.responseJSON["message"]+"", "danger");
            	
          }
        })
    });
 
// eliminar
$('body').on('click', '.deleteRol',function(e){
           // Prevent default submission of form
	    let id =  $(this).parent().parent().children('td:eq(0)').text();
	    let nombre =  $(this).parent().parent().children('td:eq(1)').text();
        e.preventDefault(); 
        $('#modalDelete').modal("show");
        console.log(nombre);
        $('#nombreregistro').text("Eliminar el registro: "+nombre);
        idDelete =id;
    });

$('body').on('click', '#btn-delete-confirm',function(e){
	$.ajax({
        type : "delete",
        url : "http://localhost:8080/administracion/deleterol/"+idDelete,
        headers: {"X-CSRF-TOKEN": $("input[name='_csrf']").val()},
        contentType: "application/json",
        dataType : 'json',
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
              ocultarAlert();
              $('#modalDelete').fadeOut(()=>{
        		  $('#modalDelete').modal('hide');
        	  });
              successAlert("<strong>Éxito</strong>","<br>Registro Eliminado", "success");
              if (numbreRowDataTable>3) {
            	  // $('#modalEditRol').modal('hide');
              }else{
            	  // Ir una pagina atras
            	  $('#dataTable').DataTable().page( 'previous' ).draw( 'page' );
              }

        },error: function (e) {
        	 // console.log("Error"+e['responseText']);
        	 $('#modalDelete').fadeOut(()=>{
       		   $('#modalDelete').modal('hide');
       	     });
        	 if(e['responseText'] = "Roles_not_found"){
        		 successAlert("<strong >"+e['responseText']+"</strong>","<div class='text-justify mt-0'>Para eliminar este Rol, debe eliminar anteriormente todos" +
        		 		" los usuarios que esten ligados a él</div>", "danger"); 
        	 }else{
        		 successAlert("<strong>Error Inesperado</strong>","<br>Si el problema persiste consulte a su proveedor de servicios", "danger");
        	 }
            // console.log(console.log(JSON.stringify(e)));
         }
    });
	
})


$(document).ready(function() {
	init();
	// Mantiene el tamaño del dataTable
$('.dataTables_scrollBody').css('height', '400px');
	 
} );

function init(){
	
	table.DataTable( {
		 
	     "searching": true,   
	 "destroy": true,
	"conditionalPaging": true,
	 "scrollY":        '330px',
     "scrollCollapse": true,
     "paging":         true,
	"ajax":{
		  "method" : "GET",
		  "url"    : "../administracion/getroles"
	},
	// "deferRender": true,
	"columns":[
		{"data": "correlativo"},
		{"data": "nombre"},
		{"data": "detalle"},
		{"data": "editar"},
		{"data": "eliminar"},
		],

	"buttons": [
    		{"copy":'copy'}
	     ],
	"lengthMenu": [[5, 10, 20, 30], [5, 10, 20, 30]],
	"language": {
        "lengthMenu": "Mostrar _MENU_ ",
        "zeroRecords": "Datos no encontrados - upss",
        "info": "Mostar páginas _PAGE_ de _PAGES_",
        "infoEmpty": "Datos no encontrados",
        "infoFiltered": "(Filtrados por _MAX_ total registros)",
        "search":         "Buscar:",
        "paginate": {
                "first":      "Primero",
                "last":       "Anterior",
                "next":       "Siguiente",
                "previous":   "Anterior"
            },
            }
    } );
}
