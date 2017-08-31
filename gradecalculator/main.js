var arrayScores=[];
var input=(document.getElementsByClassName("inputs"));
function readInputs(){
	arrayScores=[];
	console.log(input.length);
	for(i=0; i<input.length;++i){
		var topicArray=[];
		var percentage=input[i].children.percentage.value;
		var yourpoints=input[i].children.yourpoints.value;
		var totalpoints=input[i].children.totalpoints.value;
		console.log(totalpoints);
		if(percentage!=""){
			if(!isNaN(percentage)){
				if(percentage>=1){
					percentage=percentage/100;
				}
				topicArray.push(Number(percentage));
			}
			else{
				alert("Please input only numbers!");
				break;
			}
		}
		if(yourpoints!=""){
			if(!isNaN(yourpoints)){
				topicArray.push(Number(yourpoints));
			}
			else{
				alert("Please input only numbers!");
				break;
			}
		}
		if(totalpoints!=""){
			if(!isNaN(totalpoints)){
				topicArray.push(Number(totalpoints));
			}
			else{
				alert("Please input only numbers!");
				break;
			}
		}	
		if(topicArray.length !=0){
			if(topicArray.length!=3){
				alert("Please finish filling in your weights, points, and total points");
			}
			else{
				arrayScores.push(topicArray);
			}
		}
	}
	checkPercentages();
};

function checkPercentages(){
	console.log("checkPercent");
	var sum=0;
	console.log(arrayScores);
	for(i=0;i<arrayScores.length;++i){
		sum+=(arrayScores[i][0]);
	}
	if(input.length==9){
		console.log("length == 9");
		if(Math.floor(sum)!=1){
			alert("Weights do not add up to 100%");
		}else{
			var finalPercentage=addUp(arrayScores);
			alert("Your final grade is "+ finalPercentage +"%");
		}
	}
	if(input.length==8){
		console.log("length ==8");
		var finalscore=document.getElementsByClassName("finalscore");
		var theweight=finalscore[0].children.weight.value;
		var finalpoints=finalscore[0].children.total.value;
		var ideal_grade=document.getElementsByClassName("ideal");
		var gradewanted=ideal_grade[0].children.idealgrade.value;

		if(theweight=="" || finalpoints==""){
			alert("Please finish filling in the total points and weight of the final");
		}else{
			if(isNaN(finalpoints) || isNaN(theweight)){
				alert("Please input only numbers!");
			}
			else{
				if(theweight>=1){
					theweight=Number(theweight/100);
				}
				
				var totalsum=Number(sum)+Number(theweight);
				console.log(totalsum);
				if(totalsum!=1){
					alert("Weights do not add up to 100%");
				}else{
						if(gradewanted==""){
							alert("Please input an ideal grade");
						}else{
							if(isNaN(gradewanted)){
								alert("Please input only numbers!");
							}
							else{
								if(gradewanted<1){
									gradewanted=Number(gradewanted*100);
								}
								var final_score=finalScore(gradewanted,finalpoints,theweight);
								alert("You need at least a "+final_score+"/"+finalpoints+" to get a "+gradewanted+"% in the class");

							}
						}
				}
			}
		}	
	}

};

function addUp(theArray){
	console.log("finalGrade");
	var finalgrade=0;
	for(i=0;i<theArray.length;++i){
		var percent=theArray[i][0]*100;
		var yourscore=theArray[i][1];
		var totalscore=theArray[i][2];
		console.log(percent,yourscore,totalscore);
		finalgrade+=(percent*yourscore)/(totalscore);
	}
	return finalgrade.toFixed(2);
}

function finalScore(gradewanted,finalpoints,theweight){
	var otherScores=addUp(arrayScores);
	var goalPercent=gradewanted-otherScores;

	console.log(goalPercent);
	console.log(finalpoints);
	console.log(theweight);
	return Math.ceil((Number(goalPercent)*Number(finalpoints))/Number(theweight*100));
};

button1.addEventListener("click",function(){	
	readInputs();
	
});





