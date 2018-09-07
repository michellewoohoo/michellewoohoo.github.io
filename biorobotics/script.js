

//slideshow
function textDisappear(ele){
    ele.childNodes[3].style.display="none";
    
}

function appearText(ele){
    ele.childNodes[3].style.display="inline";

}

var imageArray=["lab.jpg","biorobotics.jpg", "watch.jpg", 
 "bones.png"];
var imageIndex=0;

function prevSlides(){
    imageIndex--;
    changeImage();
}
function nextSlides(){
    imageIndex++;
    changeImage();
}

function changeImage(){
    document.getElementById("slideshow").className+="fadeOut";
    setTimeout(function(){
        document.getElementById("slideshow").style.backgroundImage="url(css/"+imageArray[imageIndex]+")";
        document.getElementById("slideshow").className="";
    },1000);
    imageIndex++;
    if(imageIndex>=imageArray.length){
        imageIndex=0;
    }
    if(imageIndex<0){
        imageIndex=imageArray.length-1;
    }
    setTimeout(changeImage,7000);
}

changeImage();

