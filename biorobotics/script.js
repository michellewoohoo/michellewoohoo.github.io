

//slideshow

var imageArray=["slideshow/building.jpg", "slideshow/lab.jpg", 
"slideshow/gateway.jpg","slideshow/people.jpg", "slideshow/building2.jpg","slideshow/inside.jpg"];
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
    document.getElementById("mainimg").className+="fadeOut";
    setTimeout(function(){
        document.getElementById("mainimg").src=imageArray[imageIndex];
        document.getElementById("mainimg").className="";
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

