
var modal;

function openOnImageClick(ele){
    var parent=ele.parentNode;
    modal=parent.children[1];
    modal.style.display = "block";
}

function closeWindow(ele){
    modal.style.display="none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}