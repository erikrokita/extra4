//constructor for difficulties
function buildDifficulty(name, enemyspeed, goal, id){
	this.name = name;
	this.enemyspeed = enemyspeed;
	this.goal = goal;
	this.ID = id;
	
	//accessors
	this.getName = function(){return this.name;};
	this.getEnemySpeed = function(){return this.enemyspeed;};
	this.getGoal = function(){return this.goal;};
	this.getID = function(){return this.ID;};
	
	//mutators
	this.setName = function(name){this.name = name;};
	this.setEnemySpeed = function(speed){this.enemyspeed = speed;};
	this.setGoal = function(goal){this.goal = goal;};
	this.setID = function(id){this.ID = id;};
}

//hides game and finish menu upon load
$("#game").hide();
$("#finish").hide();

//generate difficulties
dif_easy = new buildDifficulty("Easy", 2, 100, 1);
console.log("Created new difficulty: " + dif_easy.getName() + ", with " + dif_easy.getEnemySpeed() + " clicks per second, and you must click the button " + dif_easy.getGoal() + " times");
dif_medium = new buildDifficulty("Medium", 4, 150, 2);
console.log("Created new difficulty: " + dif_medium.getName() + ", with " + dif_medium.getEnemySpeed() + " clicks per second, and you must click the button " + dif_medium.getGoal() + " times");
dif_hard = new buildDifficulty("Hard", 6, 200, 3);
console.log("Created new difficulty: " + dif_hard.getName() + ", with " + dif_hard.getEnemySpeed() + " clicks per second, and you must click the button " + dif_hard.getGoal() + " times");
dif_shard = new buildDifficulty("Super Hard", 8, 300, 4);
console.log("Created new difficulty: " + dif_shard.getName() + ", with " + dif_shard.getEnemySpeed() + " clicks per second, and you must click the button " + dif_shard.getGoal() + " times");
dif_uhard = new buildDifficulty("Ultra Hard", 10, 500, 5);
console.log("Created new difficulty: " + dif_uhard.getName() + ", with " + dif_uhard.getEnemySpeed() + " clicks per second, and you must click the button " + dif_uhard.getGoal() + " times");
	
//on hover, generate info. On leave, remove info
$("#btn_easy").hover(function(){
	$("#info").html("Goal: " + dif_easy.getGoal() + " clicks | Computer clicks per second: " + dif_easy.getEnemySpeed());
}, function(){
	$("#info").html("");
});
$("#btn_medium").hover(function(){
	$("#info").html("Goal: " + dif_medium.getGoal() + " clicks | Computer clicks per second: " + dif_medium.getEnemySpeed());
}, function(){
	$("#info").html("");
});
$("#btn_hard").hover(function(){
	$("#info").html("Goal: " + dif_hard.getGoal() + " clicks | Computer clicks per second: " + dif_hard.getEnemySpeed());
}, function(){
	$("#info").html("");
});
$("#btn_shard").hover(function(){
	$("#info").html("Goal: " + dif_shard.getGoal() + " clicks | Computer clicks per second: " + dif_shard.getEnemySpeed());
}, function(){
	$("#info").html("");
});
	
//uses QJuery to get button clicks
$("#btn_easy").click(function(){
	setDifficulty(dif_easy)
});
$("#btn_medium").click(function(){
	setDifficulty(dif_medium)
});
$("#btn_hard").click(function(){
	setDifficulty(dif_hard)
});
$("#btn_shard").click(function(){
	setDifficulty(dif_shard)
});
//if the word "ultra" is clicked, start ultra hard mode
$("#ultrahard").click(function(){
	setDifficulty(dif_uhard)
});
	
//function to handle difficulty selection via id
function setDifficulty(difficulty){
	console.log("Button clicked with difficulty id: " + difficulty.getID());
	
	$("#menu").hide();	//hides menu for game start
	$("#game").show();	//shows game for play
	$("#game_buttons").hide();	//hides buttons
	
	//countdown for game start
	var countdownTime = 5;
	var countdownInterval = setInterval(function(){
		
		countdownTime -= 1;
		console.log("DEBUG countdown time to game start: " + countdownTime);
		
		if (countdownTime < 4){
			$("#countdown").html(countdownTime);
		}
		if (countdownTime == 0){
			$("#countdown").html("Click!");
			clearInterval(countdownInterval);
			beginGame(difficulty);
		}	
	}, 1000);
	
}

//game logic
function beginGame(difficulty){
	console.log("game begins");
	$("#game_buttons").show();	//shows buttons for game start
	
	var intervalDifficultyTime;
	if (difficulty.getID() == 1){
		intervalDifficultyTime = 500;
	}else if(difficulty.getID() == 2){
		intervalDifficultyTime = 250;
	}else if (difficulty.getID() == 3){
		intervalDifficultyTime = 166.67;
	}else if (difficulty.getID() == 4){
		intervalDifficultyTime = 125;
	}else if (difficulty.getID() == 5){
		intervalDifficultyTime = 100;
	}
	
	//get goal for difficulty
	var gameGoal = difficulty.getGoal();
	
	//increase player value
	$("#btn_player").click(function(){
		$("#btn_player").val(parseInt($("#btn_player").val()) + 1);
		//if the player won, set pass argument to win. Else, pass argument to lose
		if (parseInt($("#btn_player").val()) >= gameGoal){
			clearInterval(gameInterval);
			gameFinish(difficulty, true);
		}
	});
	
	//creates an interval with appropriate difficulty time settings
		var gameInterval = setInterval(function(){
			//increase computer value
			$("#btn_computer").val(parseInt($("#btn_computer").val()) + 1);
			if (parseInt($("#btn_computer").val()) >= gameGoal){
				clearInterval(gameInterval);
				gameFinish(difficulty, false);
			}
		}, intervalDifficultyTime);	
}

//game finish
function gameFinish(difficulty, isWin){
	console.log("Game Finish!");
	$("#game").hide();	//hides game
	$("#finish").show();	//shows finish screen
	
	//if game is won, else is lose
	if (isWin){
		$("#game_finish").html("Congrats, you completed the game on " + difficulty.getName() + "! Click below to go back to the menu");
	}else{
		$("#game_finish").html("RIP, you lost the game on " + difficulty.getName() + ". Click below to go back to the menu");
	}
	
	//if reset button is pressed
	$("#reset").click(function(){
		console.log("resetting game");
		
		//resets game
		/*$("#countdown").html("Get ready...");
		$("#btn_computer").val(0);
		$("#btn_player").val(0);
		
		$("#finish").hide();	//hides finish screen
		$("#menu").show();	//shows menu*/
		location.reload();	//refreshes the page
	});
	
}