require(
    [],
    function () {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;
        var bgRect = paper.rect(0,0,pWidth,pHeight);

        // setting a pretty background for the game
        bgRect.attr({"fill": "url(http://www.uiupdates.com/wp-content/uploads/2015/03/game-background.jpg)"});

        //this counter is for keeping track of the number of clicks
        var counter = 0;
        //this variable to keep track of the status of game mode selection. 
        //When the page is first loaded, the game mode is not selected yet, hence false.
        var modeSelected = false;

        // creating start button
        var startButton = paper.circle(300, 200, 50);
            startButton.attr({
                stroke: "black",
                fill: "pink"
            });
        var startText = paper.text(300, 200, 'START!');


        var ready = function(){
        	startButton.show();
        	startText.show();
            // this is to hide the target object so that it does not appear until the start button is clicked.
            circle.hide();
            // this is to prompt the player to choose the level of difficulty as well as relay some instructions about how to play the game.
            alert("Welcome to RACE AGAINST TIME! The aim of the game is to click the circle as many times as you can in 10 seconds!");
        };

        var start = function (){
        	// In order to ensure that the player selects a game mode, if-else statement and the variable modeSelected are used 
            // in such a way that the game will only begin if game mode selection status is true (i.e. selected) 
            //if the mode selection status is false, an alert box will pop up reminding the player to select a game mode. 
            //if we were to use the prompt box, the start function will include:
                //var difficulty = prompt("Please enter level of diffculty(box speed) \n 'easy' \n 'medium' \n 'hard' ", "easy");

            if (modeSelected === false) {
                alert('Please select the difficulty level before starting the game.');
            } else {
            // game starts here
            console.log("game is starting");

            // hides the start button and text once the function is executed 
            startButton.hide();
        	startText.hide();
            
            // reveals the target object once the function is executed
            circle.show();
        	
            // (re)starts counter at 0
            counter = 0;
            
            enableAutoplay();

            // using the Timeout method to stop the game (by executing the endGame function) after 10 seconds
            setTimeout(endGame, 10000); 
        }
        };

        // an event listener is attached to the start button and the start function will be executed when the start button receives a click event. 
        startButton.node.addEventListener('click', start);

        //-------- For making the target move ---------------------------------
        // we created a circle as the target object 
        var circle = paper.circle(100,100,20);
        circle.attr({
            "fill": "pink",
            "r": 50
        });
        circle.xpos=pWidth/2;
        circle.ypos=pHeight/2;
        circle.xrate=10;
        circle.yrate=10;

        //To make the target circle move constantly around the screen, moveCircle function is created to increase the x- and y-position of 
        //circle by consistently adding a fixed x- and y-rate to the xpos and ypos values of the circle. 
        var moveCircle = function(){

            circle.xpos += circle.xrate;
            circle.ypos += circle.yrate; 
            circle.attr({'cx': circle.xpos, 'cy': circle.ypos})

            // For the target to be in constant motion, frequently changing direction.
            // This also ensures that the target does not move out of the game box. 
            if (circle.xpos > pWidth) {circle.xrate = -circle.xrate;}
            if (circle.ypos > pHeight) {circle.yrate = -circle.yrate;}
            if (circle.xpos < 0) { circle.xrate = -circle.xrate;}
            if (circle.ypos < 0) { circle.yrate = -circle.yrate;};
        }
        // this timer function is used to repeatedly call the function every 100 ms so that the circle is in constant motion. 
        setInterval(moveCircle, 100);
        
        //----------For setting the three difficulty levels --------------
        // A variable is created for each radio button and used the getElementById method to access the relevant button by their unique id
        var easyButton = document.getElementById("diffEasy");
        var normalButton = document.getElementById("diffNormal");
        var hardButton = document.getElementById("diffHard");
        
        // We adjusted the difficulty by differing the rate of the circle moving, and the size of the circle. 
        // For each radio button, there is an event listener which executes a function that:
        // (1) changes the circle size and circle movement speed
        // (2) changes the mode selection status to true so that the game can begin. 
        // (3) creates an alert box informing user the difficulty mode selected. 

        easyButton.addEventListener('click',function(){
            circle.attr({
                fill: 'pink',
                r: 50,
            });
            circle.xrate=5;
            circle.yrate=5;
            modeSelected = true;
            alert("You have selected the EASY mode! Click to start the game!");
        });

        normalButton.addEventListener('click',function(){
            circle.attr({
                fill: 'pink',
                r: 30,
            });
            circle.xrate=8;
            circle.yrate=8;
            modeSelected = true;
            alert("You have selected the NORMAL mode! Click to start the game!");
        });

        hardButton.addEventListener('click',function(){
            circle.attr({
                fill: 'pink',
                r: 26,
            });
            circle.xrate=14;
            circle.yrate=14;
            modeSelected = true;
            alert("You have selected the HARD mode! Click to start the game!");

        })

        //the function will stop the game by (1) pulling the circle out of the game box by changing its x- and y-position,
        //(2) show a confirm box that informs the player their click score 
        //(3) stop the background music 
        //(4) resets the game by executing the ready function 
        var endGame = function (){
            // alert message varies according to number of times clicked
            if (counter > 3) {
            confirm("Great job! You managed to click the circle " + counter + " times. Let's play again!");
            } 
            else {
            confirm("Oh man! You only managed to click the circle " + counter + " times. Try harder! Let's play again!")
            }
            
            // hides the target
            circle.attr({
                cx: -100,
                cy: -100
            })

            // pauses the background sound
            stopPlay();

            // resets the game
            ready();
        }

        // An event listener is attached to the target circle and the click event will execute a function that keeps count of the no. of clicks by player
        circle.node.addEventListener('click', function(){
            counter++;
            enableTing();
            //give the player a real time update each time they score a click 
            console.log("the click count is now " + counter);
        });

        ready(); // Put the start button on the screen when the page is loaded

        // we added a background sound while the game is running
        var bgsound = new Audio("resources/game.mp3")
            function enableAutoplay() { 
            bgsound.autoplay = true;
            bgsound.loop = true;
            bgsound.load();
        }
            function stopPlay() { 
            bgsound.pause();
        }
        // we also added a sound for every time the target is clicked
        var ting = new Audio("resources/ting.wav")
        function enableTing() { 
            ting.autoplay = true;
            ting.load();
        }
        
                    

        //----- Alterative way for difficulty level ---------
        // We feel that the button method instead of the string method is better, as it is simpler and clearer for the user.
        // the user only needs to click one button for the difficulty to be set.
        // unlike the string method where the user has to type a number, then press 'go' for the diffculty to be set.
        
        //var easyMode = "easy";
        //var normalMode = "medium";
        //var hardMode = "hard";

        //if (difficulty === easyMode) {
        //    console.log("easy mode");
        //    circle.attr({
        //        fill: 'pink',
        //        r: 50,
        //    });
        //    circle.xrate=5;
        //    circle.yrate=5;
        //    selected = true;
        //   alert("You have selected the EASY mode!");
        //    };

        //if (difficulty === normalMode) {
        //    console.log("normal mode");
        //    circle.attr({
        //        fill: 'pink',
        //        r: 30,
        //    });
        //    circle.xrate=10;
        //    circle.yrate=10;
        //    selected = true;
        //   alert("You have selected the NORMAL mode!");
        //    };

        //if (difficulty === hardMode) {
        //    console.log("hard mode");
        //    circle.attr({
        //        fill: 'pink',
        //        r: 20,
        //    });
        //    circle.xrate=15;
        //   circle.yrate=15;
        //    selected = true;
        //   alert("You have selected the HARD mode!");
        //    };

});