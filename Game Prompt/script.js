    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width,
        height = canvas.height;
    var shiftLetter = 10;

    var attempt = 0; // number of complited attempts to guess word
    var wrongGuesses = 0; // number of wrong guesses
    var correctGuesses = 0; // number of correct guesses

    var guess = ""; // variable for letter which was entered into the input element
    
    var pickWord = function  () { 
    //Return a random word
        var words = ["программа", "макака", "прекрасный", "оладушек", "собака", "автомобиль", "пират"];  //An array of words
        return words[Math.floor(Math.random()*words.length)]; 
    }

    var setupAnswerArray = function (word) { 
    //Return the answer array
     var answerArray = []; 
     for (var i=0; i<word.length; i++) {
        answerArray[i] = "_";
      }
     return answerArray;
    }
  
    var updateGameState = function (guess, word, answerArray) {
    //Update answer array and return a number showing how many
    //times the guess appears in the word
      var correct = 0;
      for (var j = 0; j < word.length; j++) { //если ввел одну букву, ищем ее в загаданном слове. Если нашли, записываем в результат
        if (word[j] === guess.toLowerCase() && answerArray[j] == "_") {
                answerArray[j] = guess.toLowerCase();
                correct++;
                }  
       }
      return correct;   
    }

    var showAnswerAndCongratulate = function (answerArray) {
    //Use the heading element h2 to show the answer and congratulate the player
       $("h3").html("Отлично! Было загадано слово " + answerArray.join(""));
    }

    var drawHuman = function (wrongGuesses) {
    //Draw a different part of stick man every time the player input a wrong letter
    //depending on the number wrong guesses
    ctx.strokeStyle = "Black";
    ctx.lineWidth = 4;
    if (wrongGuesses == 1)
        ctx.strokeRect(40,0,20,20); //draw head
    else if (wrongGuesses == 2) { //draw body
        ctx.beginPath();
        ctx.moveTo(50,20);
        ctx.lineTo(50,60);
        ctx.stroke();
    }
     else if (wrongGuesses == 3) { //draw left hand
        ctx.beginPath();
        ctx.moveTo(30,30);
        ctx.lineTo(50,40);
        ctx.stroke();
    }
    else if (wrongGuesses == 4) { //draw right hand
        ctx.beginPath();
        ctx.moveTo(70,30);
        ctx.lineTo(50,40);
        ctx.stroke();
    }
    else if (wrongGuesses == 5) { //draw left leg
        ctx.beginPath();
        ctx.moveTo(50,59);
        ctx.lineTo(20,89);
        ctx.stroke();
    }
    else if (wrongGuesses == 6) { //draw right leg
        ctx.beginPath();
        ctx.moveTo(50,59);
        ctx.lineTo(80,89);
        ctx.stroke();
    }
   }

    var drawWord = function () {
    //Draw the current word (answer array) underneath the stick man
    // to show the player his progress
        ctx.font = "20px Courier";
        ctx.fillStyle = "Black";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(answerArray.join(" ").toUpperCase(), 20, 125);
    };

    var drawLetter = function () {
    //Draw the wrong letter crossed out
        ctx.font = "24px Courier";
        ctx.fillStyle = "Black";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.fillText(guess.toUpperCase(), 290, shiftLetter);
        ctx.fillText("__", 295, shiftLetter-15);       
    };

    var word = pickWord();
    var remainingLetters = word.length; //количество букв, которые осталось отгадать
    var answerArray = setupAnswerArray (word);
    $("#letter").focus(); //устанавливает фокус на текстовом поле

   // $("#letter").keypress(function (event) {
   //     guess = $("#letter").val();
   //  });

    $("#butn").click(function (event) {
    //If player input the wrong letter it will be drawn in canvas
        guess = $("#letter").val();
        drawWord();
        if (guess.length !== 1) //если пользователь ввел больше, чем один символ
           alert("Пожалуйста, введите только одну букву");
        else {
               correctGuesses = updateGameState (guess, word, answerArray);
               remainingLetters -= correctGuesses;
               attempt++;
               drawWord();
                 if (correctGuesses == 0) {
                   wrongGuesses++;
                   drawLetter();
                   drawHuman (wrongGuesses);
                   shiftLetter+= 25;
                  }
             $("h3").html("Осталось " + (10-attempt) + " попыток");
             } 

        $("#letter").val("");
        $("#letter").focus();     

        if (remainingLetters > 0 && attempt == 10) {
          $("h3").html("К сожалению, вы исчерпали все попытки");
          $("#butn").hide();
          $("#butn_start_again").show();
        }
   
        if (remainingLetters == 0) {
           showAnswerAndCongratulate (answerArray);
           $("#butn_start_again").show();
           $("#butn").hide();
        }
    });

    $("#butn_start_again").click(function() {
       location.reload();
      // $("#butn_start_again").hide();
    });
    
   