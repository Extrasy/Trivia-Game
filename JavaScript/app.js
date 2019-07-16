(function(){
window.onload = function() {
    $("#start").on("click", timer.start);
    $("#start").on("click", buildQuiz);
    
};

  var timerRunning = false;
  var intervalId;

  var timer = {
      //time in seconds
    time: 60,
    
  start: function() {
    if (!timerRunning) {
      intervalId = setInterval(timer.count, 1000);
      timerRunning = true;
      timer.time = 60;
    }
  },
  
  stop: function() {
        clearInterval(intervalId);
        timerRunning = false;
    
  },

  count: function() {
    timer.time--;
    var converted = timer.timeConverter(timer.time);
     console.log(converted);
    $("#display").text(converted);
    if(converted === "00:00"){

        timer.stop();
        showResults();
        alert("Time's up!");
        
    }
    
  },
  timeConverter: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  },


};  

   
      function buildQuiz() {
      const output = [];

      myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
  
        for (letter in currentQuestion.answers) {
          answers.push(
            `<label>
              <br><input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
        );
      });
      quizContainer.innerHTML = output.join("");
    }
  
    function showResults() {
      const answerContainers = quizContainer.querySelectorAll(".answers");
  
      let numCorrect = 0;
  
      myQuestions.forEach((currentQuestion, questionNumber) => {
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
          // add to the number of correct answers
          numCorrect++;
          // color the answers green
          answerContainers[questionNumber].style.color = "black";
        } else {
          // if answer is wrong or blank
          // color the answers red
          answerContainers[questionNumber].style.color = "red";
        }
      })
  
      resultsContainer.innerHTML = `You scored: ${numCorrect} out of ${myQuestions.length}`;
    }
  
    const quizContainer = document.getElementById("quiz");
    const resultsContainer = document.getElementById("results");
    const submitButton = document.getElementById("submit");
    const myQuestions = [
      {
        question: "Who is the strongest?",
        answers: {
          a: "Superman ",
          b: "The Terminator ",
          c: "Waluigi, obviously "
        },
        correctAnswer: "c"
      },
      {
        question: "What is this?",
        answers: {
          a: "a thing ",
          b: "you mean this?? ",
          c: "In most cases, the value of this is determined by how a function is called. It can't be set by assignment during execution, and it may be different each time the function is called. "
        },
        correctAnswer: "c"
      },
      {
        question: "What is the FIFA World Cup?",
        answers: {
          a: "The Fire Intensive Formulating Accord ",
          b: "A cup shaped like a world ",
          c: "You mean soccer? ",
          d: "The FIFA World Cup, often simply called the World Cup, is an international association football competition contested by the senior men's national teams of the members of the Fédération Internationale de Football Association (FIFA), the sport's global governing body. "
        },
        correctAnswer: "d"
      },
      {
        question: "How much wood can a woodchuck chuck?",
        answers: {
          a: "One Thousand Woods ",
          b: "Field studies concluded that a woodchuck does not in fact chuck wood. ",
          c: "If a woodchuck could chuck wood, it would chuck about four wood. ",
          d: "Eight(8) "
        },
        correctAnswer: "c"
      },
      {
        question: "Finish the sentence: An apple a day ___",
        answers: {
          a: "Keeps the doctor away.",
          b: "Keeps anyone away if you throw it hard enough.",
          c: "Is not a financially smart decision due to the high rise of apple prices."
        },
        correctAnswer: "b"
      }
    ];
    // on submit, show results
    submitButton.addEventListener("click", showResults);
    submitButton.addEventListener("click", timer.stop);

  })();









