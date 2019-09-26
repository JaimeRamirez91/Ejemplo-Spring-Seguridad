function successAlert(tittleCustom, messageCustom, typeAlert){
	let iconAlert = "";
	switch (typeAlert) {
	case "success":
		iconAlert =  "fas fa-check";
		break;
	case "warning":
		iconAlert =  "fas fa-radiation-alt";
		break;
	case "danger":
		iconAlert =  "fas fa-radiation-alt";
		break;
	default:
		break;
	}
	$.notify({
	   	   // options
		    icon: iconAlert,
			title: '<strong>'+tittleCustom+'</strong>',
			message: messageCustom,
			
	   },{
	   	// settings
		   icon_type: 'class',
		    offset: {
		    	x:5,
		    	y:93,
		    },
	     	type: typeAlert,
	     	template: '<div data-notify="container" class="col-2 alert alert-{0}" role="alert hide-alert">'+ 
	     	'<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
	     	'<span data-notify="icon"></span> ' +
	     	'<span data-notify="title">{1}</span> ' +
	     	'<span data-notify="message">{2}</span>' +
		   '</div>' 
	     	
	   });
}


