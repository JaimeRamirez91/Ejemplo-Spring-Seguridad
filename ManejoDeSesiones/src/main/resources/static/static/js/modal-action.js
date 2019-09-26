$('body').on('click', '#btn-cancel-confirm', function(e) {
	$('#modalDelete').modal("hide");

});
// Ocultar alerts
function ocultarAlert() {
	setTimeout("$('#alerta').hide()", 5000);
};
// Remove previous errors
function removerErrors() {
	$('input').next('span').remove();
	$('textarea').next('span').remove();
	$('select').next('span').remove();
	$('#registrationForm').prev('div').remove();
	$('#editForm').prev('div').remove();
};

//limpiar inputs
function  limpiarImput() {
	$('input[type="text"]').val("");
    $('textarea').val("");
    $('.modal select').val("");
   
};