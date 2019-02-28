var isStarted = false
var isPaused = false

function startGame() {
  isStarted = true
  var count = 90;



  // Update the count down every 1 second if not paused
  var x = setInterval(function () {
    if (!isPaused) {
      count--
    }

    // Display the time
    document.getElementById("time-text").innerHTML = count;

    // If the count down is finished, write some text 
    if (count < 0) {
      clearInterval(x);
      document.getElementById('start-button').style.display = 'block';
      document.getElementById("time-text").innerHTML = "EXPIRED";
      isStarted = false
    }
  }, 1000);

  document.getElementById('start-button').style.display = 'none';

}
