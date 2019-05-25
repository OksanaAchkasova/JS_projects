    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var width = canvas.width,
        height = canvas.height;
    var shiftLetter = 10;

    var attempt = 0; // количество сделанных попыток
    var wrongGuesses = 0; // количество неправильных ответов

    var guess = ""; // передача введеной пользователем в обработчик щелчка по кнопке
    var input_value = ""; // введенная пользователем в input буква
    var correctGuesses = 0;
    
    var pickWord = function  () { //Возвращает случайное слово
     var words = ["программа", "макака", "прекрасный", "оладушек", "собака", "автомобиль"];
     return words[Math.floor(Math.random()*words.length)];
    }

    var setupAnswerArray = function (word) { //Возвращает итоговый массив для  заданного слова
     var answerArray = []; 
     for (var i=0; i<word.length; i++) {
        answerArray[i] = "_";
      }
     return answerArray;
    }
  
    var updateGameState = function (guess, word, answerArray) {
    var correct = 0;
    for (var j = 0; j < word.length; j++) { //если ввел одну букву, ищем ее в загаданном слове. Если нашли, записываем в результат
        if (word[j] === guess.toLowerCase() && answerArray[j] == "_") {
                answerArray[j] = guess.toLowerCase();
                correct++;
                }  
       }
      if (correct == 0) {
            drawLetter();
            shiftLetter+= 25;
           } 

    return correct;   
   }

    var showAnswerAndCongratulate = function (answerArray) {
       $("h2").html("Отлично! Было загадано слово " + answerArray.join(""));
    }

    var drawHuman = function (wrongGuesses) {
    ctx.strokeStyle = "Black";
    ctx.lineWidth = 4;
    if (wrongGuesses == 1)
        ctx.strokeRect(40,0,20,20); //рисуем голову
    else if (wrongGuesses == 2) { //рисуем туловище
        ctx.beginPath();
        ctx.moveTo(50,20);
        ctx.lineTo(50,60);
        ctx.stroke();
    }
     else if (wrongGuesses == 3) { //рисуем левую руку
        ctx.beginPath();
        ctx.moveTo(30,30);
        ctx.lineTo(50,40);
        ctx.stroke();
    }
    else if (wrongGuesses == 4) { //рисуем правую руку
        ctx.beginPath();
        ctx.moveTo(70,30);
        ctx.lineTo(50,40);
        ctx.stroke();
    }
    else if (wrongGuesses == 5) { //рисуем левую ногу
        ctx.beginPath();
        ctx.moveTo(50,59);
        ctx.lineTo(20,89);
        ctx.stroke();
    }
    else if (wrongGuesses == 6) { //рисуем правую ногу
        ctx.beginPath();
        ctx.moveTo(50,59);
        ctx.lineTo(80,89);
        ctx.stroke();
    }
   }

    var drawWord = function () {
       // ctx.clearRect(0, 0, width, height);
        ctx.font = "20px Courier";
        ctx.fillStyle = "Black";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(answerArray.join(" ").toUpperCase(), 20, 125);
    };

    var drawLetter = function () {
        ctx.font = "24px Courier";
        ctx.fillStyle = "Black";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.fillText(guess.toUpperCase(), 275, shiftLetter);
        ctx.fillText("__", 280, shiftLetter-15);       
    };

    var word = pickWord();
    var remainingLetters = word.length; //количество букв, которые осталось отгадать
    var answerArray = setupAnswerArray (word);

    $("#letter").keypress(function (event) {
        input_value = $("#letter").val();
      
    });

    $("#butn").click(function (event) {
        drawWord();
        guess = input_value;
        if (guess.length !== 1) //если пользователь ввел больше, чем один символ
           alert("Пожалуйста, введите только одну букву");
        else {
               correctGuesses = updateGameState (guess, word, answerArray);
               remainingLetters -= correctGuesses;
               attempt++;
               drawWord();
                   if (correctGuesses == 0) {
                   wrongGuesses++;
                   drawHuman (wrongGuesses);
                   //canvas.height+= 50;
                }
             $("h2").html("Осталось " + (10-attempt) + " попыток");
             } 

    if (remainingLetters > 0 && attempt == 10) 
         $("h2").html("К сожалению, вы исчерпали все попытки");
   
    if (remainingLetters == 0) 
         showAnswerAndCongratulate (answerArray);
         drawWord();    
    });

    
    
   