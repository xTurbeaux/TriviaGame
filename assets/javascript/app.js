
var corr = 0;
var wrg = 0;
var inc = 0;
var totalQuests = 10;
var time = 0;
var intervalId, currentQuest;
var answerButtons = [];
var newQuests = [];



$(document).ready(function(){
    newQuiz();
    play();

    
    function play() {
	
	$(".answer").hide();
	$(".gameOver").hide();
	$(".qAndA").show();
	time = 10;
	
	currentQuest = newQuests.pop();
	
	answerButtons.push(currentQuest.correct, currentQuest.a , currentQuest.b, currentQuest.c);
	answerButtons.sort(function(a, b){
	    return 0.5 - Math.random();
	});


	
	$(".question").html(currentQuest.question);
	for (var  i = 0; i < answerButtons.length; i++) {
	    var choices = $("<button>");
	    choices.addClass("answerChoices");
	    choices.text(answerButtons[i]);
	    choices.after($("<br>"));
	    $(".multiChoice").append(choices);
	    if (answerButtons[i] === currentQuest.correct) {
		choices.addClass("correct");
	   
	    }
	}
	intervalId = setInterval(decrease, 1000);
    }
    
    function decrease() {
	time--;
	$(".timeLeft").html(time);

	if (time === 0){
	    inc++;
	    totalQuests--;
	    $(".blank").html("out of time!");
	    
	    showAnswer();
	}
    };

    
    function newQuiz() {
	triviaQuestions.sort(function(a, b){
	return 0.5 - Math.random();
	});
	newQuests = triviaQuestions.slice(0, 10);
    };


    $(document).on("click",".answerChoices", function() {
	if ($(this).hasClass("correct")) {
	    corr++;
	    totalQuests--;
	    $(".blank").html("correct!");
	    showAnswer();
	} else {
	    wrg++;
	    totalQuests--;
	    $(".blank").html("wrong!");
	    showAnswer();
	}
    });

    
    function showAnswer() {
	
	$(".qAndA").hide();
	$(".multiChoice").empty();
	answerButtons = [];
	
	$(".answer").show();
	
	var ansImg = $("<img>");
	$(".answerIs").html(currentQuest.correct);
	$(".imgAns").empty();
	$(".imgAns").append(ansImg);
	$(ansImg).attr("src", currentQuest.imgUrl);
	$(ansImg).attr("alt", "answer");
	$(ansImg).attr("id", "ansImg");
	
	clearInterval(intervalId);
	
	setTimeout (function() {
	   gameOver();
	}, 3000);
    };

    function gameOver() {
	if (totalQuests === 0) {
	    $(".answer").hide();
	    $(".gameOver").show();
	    $("#correct").html(corr);
	    $("#wrong").html(wrg);
	    $("#incomplete").html(inc);
	} else {
	    play();
	}
    }

    function restart() {
	corr = 0;
	wrg = 0;
	inc = 0;
	totalQuests = 10;
	time = 0;
	answerButtons = [];
	newQuiz();
	play();

    }

    $(".reset").click(function() {
	restart();
    });
});