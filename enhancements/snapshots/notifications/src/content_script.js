if (parent === top){
	var container = document.querySelector('.main-container');
	var notification = document.createElement('div');
	notification.classList.add('notification');
	notification.appendChild(document.createElement('p').appendChild(document.createTextNode("Notification text here.")));
	container.appendChild(notification);
}