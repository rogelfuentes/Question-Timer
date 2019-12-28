var card = $("#quiz-area");
var thirtySeconds = 30;

// Question set
var questions = [{
  question: "1.  A server typically generates a ____ , after receiving a ____.",
  answers: ["response, request", "request, response.", "web page, command", "high-five, kudos"],
  correctAnswer: "response, request",
  good: "assets/images/good1.gif",
  noGood: "assets/images/bad1.gif"
}, {
  question: "2.  The machine and code that handle requests and respond to them are collectively called the ___.",
  answers: ["server", "CPU", "client", "• router"],
  correctAnswer: "server",
  good: "assets/images/good2.gif",
  noGood: "assets/images/bad2.gif"
}, {
  question: "3. HTTP ___ requests supply data from the client to the server within the message body.",
  answers: ["POST", "JSON", "GET", "JUMP"],
  correctAnswer: "JSON",
  good: "assets/images/good3.gif",
  noGood: "assets/images/bad3.gif"
}, {
  question: "4. Server side functions can include:",
  answers: ["Clicking on an invoice and being given a PDF report", "Google providing results relevant to searches", "Visiting a URL and then being given an HTML page", "All of the above"],
  correctAnswer: "All of the above",
  good: "assets/images/good4.gif",
  noGood: "assets/images/bad1.gif"
}, {
  question: "5. Express can be included in your project by first installing it as ___.?",
  answers: ["an NPM package", "a browser plugin", "a JSON object", "a stylesheet"],
  correctAnswer: "an NPM package",
  good: "assets/images/good1.gif",
  noGood: "assets/images/bad2.gif"
}, {
  question: "6. A route is defined as /route/:word?. The parameter, word, in this case is ___.",
  answers: ["lower case", "upper case", "optional", "required"],
  correctAnswer: "required",
  good: "assets/images/good2.gif",
  noGood: "assets/images/bad3.gif"
}, {
  question: "7. The code developers write for a server often includes:",
  answers: ["Route handling", "Listeners", "Authentication", "All of the above"],
  correctAnswer: "All of the above",
  good: "assets/images/good3.gif",
  noGood: "assets/images/bad1.gif"
}, {
  question: "8. The app object used to denote the Express application is created by calling the ___ function of the Express module.",
  answers: ["listen()", "express()", "initialize()", "createServer()"],
  correctAnswer: "createServer()",
  good: "assets/images/good4.gif",
  noGood: "assets/images/bad2.gif"
}, {
  question: "11.  body-parser is an example of ___ that transforms the request from the browser into a readable object.", 
  answers: ["a database", "a server", "middleware", "a compiler"],
  correctAnswer: "a compiler",
  good: "assets/images/good1.gif",
  noGood: "assets/images/bad3.gif"
} , {
  question: "12. ___ is a web framework for Node to make creating code for a server much simpler.",
  answers: ["SQL", "• NPM", "Express", "JavaScript"],
  correctAnswer: "Express",
  good: "assets/images/good2.gif",
  noGood: "assets/images/bad3.gif"
}];

var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: thirtySeconds,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").text(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(this.countdown.bind(this), 1000);

    card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    this.counter = window.thirtySeconds;
    $("#counter-number").text(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {

    clearInterval(window.timer);

    $("#counter-number").text(this.counter);

    card.html("<h2>Out of Time!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    card.append("<img src='" + questions[this.currentQuestion].noGood + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(window.timer);

    card.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(this.counter);

    card.append("<h3>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    card.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    this.incorrect++;

    clearInterval(window.timer);

    card.html("<h2>Nope!</h2>");
    card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    card.append("<img src='" + questions[this.currentQuestion].noGood + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(window.timer);

    this.correct++;

    card.html("<h2>Correct!</h2>");
    card.append("<img src='" + questions[this.currentQuestion].good + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = thirtySeconds;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<p><span id='counter-number'>30</span> Seconds</p>");
  game.loadQuestion.bind(game)();
});
