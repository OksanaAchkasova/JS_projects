 function pickWord () { //Возвращает случайное слово
    var words = ["программа", "макака", "прекрасный", "оладушек", "собака", "автомобиль"];
    return words[Math.floor(Math.random()*words.length)];
    }

 function setupAnswerArray (word) { //Возвращает итоговый массив для заданного слова
    var answerArray = []; 
    for (var i=0; i<word.length; i++) {
        answerArray[i] = "_";
      }
     return answerArray;
   }
  
   function updateGameState (guess, word, answerArray) {
    var correct = 0;
    for (var j = 0; j < word.length; j++) { //если ввел одну букву, ищем ее в загаданном слове. Если нашли, записываем в результат
        if (word[j] === guess.toLowerCase() && answerArray[j] == "_") {
                answerArray[j] = guess.toLowerCase();
                correct++;
                }  
           } 
    return correct;   
   }

   function showAnswerAndCongratulate (answerArray) {
     alert(answerArray.join(""));
    alert("Отлично! Было загадано слово " + answerArray.join(""));
   }

    var word = pickWord();
    var answerArray = setupAnswerArray (word);
    
    var attempt = 0; // количество сделанных попыток
    var remainingLetters = word.length; //количество букв, которые осталось отгадать
        while (remainingLetters > 0 && attempt < 10) { //отгадываем. Дается только 10 попыток
        alert(answerArray.join(" "));
        var guess = prompt("Угадайте букву или нажмите Отмена для выхода из игры");
        if (guess === null) // Если нажата кнопка Отмена, делаем выход из программы 
            {           
            break;
        } else if (guess.length !== 1) //если пользователь ввел больше, чем один символ
        {
        alert("Пожалуйста, введите только одну букву");
        } else {
        var correctGuesses = updateGameState (guess, word, answerArray);
            remainingLetters -= correctGuesses;
            attempt++;
        }
     
    }

if (remainingLetters > 0 && attempt == 10) {
    	alert ("К сожалению, вы исчерпали все попытки");
    }

    if (remainingLetters == 0) {
        showAnswerAndCongratulate (answerArray);
   }