
var imageArray=["slideshow/biorobotics.png", "slideshow/gradetitle.png","slideshow/textedit.jpg", 
"slideshow/maze.jpg", "slideshow/othello.png","slideshow/spendtrack.jpg","slideshow/catmario.jpg"];


var descrip=["UCI Biorobotics Engineering Website", "Class Grade/Final Score Calculator Website",
"Text Editor", "Maze Generator/Solver", "Othello + AI", "Spending Tracker", "Cat Mario Game"];








var imageIndex=0;
function prevSlides(){
    imageIndex--;
    changeSlide(imageIndex);
}
function nextSlides(){
    imageIndex++;
    changeSlide(imageIndex);
}
function changeSlide(slideNum){
     if(imageIndex>=imageArray.length){
        imageIndex=0;
    }
     if(imageIndex<0){
        imageIndex=imageArray.length-1;
    }
    document.getElementById("mainimg").src=imageArray[imageIndex];
    document.getElementById("descrip").innerHTML=descrip[imageIndex];
}