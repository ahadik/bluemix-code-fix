/*
Allowable types are alert-danger, alert-info, alert-success
*/

var container, alertWrapper;
var attached = false;
var info = [];
var danger = [];
var success = [];


function createSingleInfoContent(volName){
	return ['Your snapshot for Volume \''+volName+'\' is being created! You can find it in the ','Snapshots tab', ' when it\'s complete.'];
}

function createMultiInfoContent(numSnapshots){
	return content = ['Your snapshots ('+numSnapshots+') are being created! You can find them in the ','Snapshots tab',' when they\'re complete.'];
}

function appendAlertContent(alert, content){
	var strong = document.createElement('strong');
	var contentSpan = document.createElement('span');
	contentSpan.appendChild(strong);
	contentSpan.appendChild(document.createTextNode(content[0]));
	var link = document.createElement('a');
	link.setAttribute('href', '#snapshots-tab');
	link.appendChild(document.createTextNode(content[1]));
	contentSpan.appendChild(link);
	contentSpan.appendChild(document.createTextNode(content[2]));
	alert.appendChild(contentSpan);
	return alert;
}

function createAlert(alertContent, type){
	var alert = document.createElement('div');
	alert.classList.add('alert');
	alert.classList.add(type);

	var closeButton = document.createElement('button');
	closeButton.classList.add('close');

	var xSpan = document.createElement('span');
	xSpan.setAttribute('aria-hidden', 'true');
	xSpan.appendChild(document.createTextNode('x'));
	closeButton.appendChild(xSpan);
	alert = appendAlertContent(alert, alertContent);
	alert.appendChild(closeButton);
	return alert;
}

function refreshAlerts(type, collection){
	var currAlert = document.querySelector('.'+type);
	currAlert.removeChild(currAlert.getElementsByTagName('span'));
	if (collection.length > 1){
		currAlert = appendAlertContent(currAlert, createMultiInfoContent(collection.length));
	}else if (collection.length == 1){
		currAlert = appendAlertContent(currAlert, createSingleInfoContent(getSelectedSnapshotName()));
	}
}

function addAlert(content, type){
	var alert = createAlert(content, type);
	var collection = null;
	if(type=='alert-info'){
		collection = info;
	}else if (type=='alert-danger'){
		collection = danger;
	}else if(type=='alert-success'){
		collection = success;
	}
	var alertObj = {alert : alert, dismiss : function(){
		collection.pop(info.indexOf(this));
		if (info.length){
			refreshAlerts(type, collection);
		}else{
			removeAlert(this.alert);
		}
	}};
	collection.push(alertObj);
	alertWrapper.appendChild(alert);
	(function(alert, alertWrapper){
		alert.getElementsByClassName('close')[0].addEventListener('click', function(){
			removeAlert(alert);
		})
	})(alert, alertWrapper);
	return alertObj;
}

function removeAlert(alert){
	alert.classList.add('remove');
	alert.addEventListener('webkitAnimationEnd', function(){
		alertWrapper.removeChild(alert);
	});
}

function getSelectedSnapshotName(){
	var selectedSnapshot = document.querySelector('#UnattachedTable tr.selected');
	return selectedSnapshot.getElementsByTagName('td')[1].innerHTML;
}

function handleSnapshotCreation(){
	if(!attached){
		attached = true;
		var createSnapshotButton = document.querySelector('#create_snapshot_btn');
		createSnapshotButton.addEventListener("click", function(){
			var selectedSnapshotName = getSelectedSnapshotName();
			setTimeout(function(){
				var type='alert-info';
				var existing = info.length;
				var content = null;
				if (existing){
					var currInfo = document.querySelector('.alert-info');
					removeAlert(currInfo);
					content = createMultiInfoContent(info.length+1);
				}else{
					content = createSingleInfoContent(selectedSnapshotName);
				}
				var alertObj = addAlert(content, type);
				setTimeout(function(){
					alertObj.dismiss();
				}, 20000);
			},500);
		});
	}
}

if (parent === top){
	window.addEventListener('load', function() {
		container = document.querySelector('.data-row');
		alertWrapper = document.createElement('div');
		alertWrapper.classList.add('alertWrapper');
		alertWrapper.classList.add('inline');
		container.appendChild(alertWrapper);
		var createSnapshotAction = document.querySelector('#CreateSnapshotItem');
		createSnapshotAction.addEventListener('click', function(){
			handleSnapshotCreation();
		});
	});
}

//console.log(window);