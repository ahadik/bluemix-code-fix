function sortDOMelements(a,b){
	var aIndex = Number(a.getAttribute('data-index'));
	var bIndex = Number(b.getAttribute('data-index'));
	return aIndex-bIndex;
}

var wrapper = document.querySelector('.inbox-container ol');
var unreads = [].slice.call(document.querySelectorAll('.seq-msg-row.unread')).sort(sortDOMelements);
var reads = [].slice.call(document.querySelectorAll('.seq-msg-row:not(.unread)')).sort(sortDOMelements);

unreads.forEach(function(email){
	wrapper.removeChild(email);
});

reads.forEach(function(email){
	wrapper.removeChild(email);
});

unreads.forEach(function(email){
	wrapper.appendChild(email);
});

reads.forEach(function(email){
	wrapper.appendChild(email);
});

// select the target node
var target = document.querySelector('.inbox-container ol');
 
// create an observer instance
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        console.log(mutation.addedNodes);
    });
});
 
// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true }
 
// pass in the target node, as well as the observer options
observer.observe(target, config)