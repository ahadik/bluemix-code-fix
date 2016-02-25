/*
Allowable types are alert-danger, alert-info, alert-success
*/

function addAlert(alertContent, type){
	var alert = document.createElement('div');
	alert.classList.add('alert');
	alert.classList.add(type);

	var closeButton = document.createElement('button');
	closeButton.classList.add('close');

	var xSpan = document.createElement('span');
	xSpan.appendChild(document.createTextNode('x'));
	closeButton.appendChild(xSpan);
	alert.appendChild(closeButton);

	var strong = document.createElement('strong');
	var title = null;
	if(type == 'alert-danger'){
		title = 'Uh oh!';
	}else if(type == 'alert-info'){
		title = 'Heads up!'
	}else if (type == 'alert-success'){
		title = 'Way to go!'
	}
	strong.appendChild(document.createTextNode(title));
	alert.appendChild(strong);

	alert.appendChild(document.createTextNode(alertContent));
	return alert;
}

if (parent === top){
	window.onload = function(){
		var container = document.querySelector('.data-row');
		var alertWrapper = document.createElement('div');
		alertWrapper.classList.add('alertWrapper');
		alertWrapper.classList.add('inline');
		container.appendChild(alertWrapper);
		alertWrapper.appendChild(addAlert('This is a success!', 'alert-success'));
	}
}

/*
<div class="alert alert-danger alert-dismissible" role="alert">
	<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
	<strong>Uh oh!</strong> Descriptive alert messages appears here.
</div>
*/