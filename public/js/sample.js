console.log("WE DID IT!");
$("#calc").hide();
$("#Chatbox").hide();

let itemNo = 0;
const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://type.fit/api/quotes",
    "method": "GET"
  }

let pomoButtonValue = false;
let calcButtonValue = false;
let chatboxButtonValue = false;

$( "#pomodoroButton" ).click(pomClose);
$( "#pomodoroClose" ).click(pomClose);


function pomClose(){

  if(pomoButtonValue==false)
    {
        $("#pomodoroCard").show(); 
        $("#quote").html("Hello! I will be fueling you with inspiration during your work session.");
        $("#author").html("");
        pomoButtonValue = true; 
    }
    else if(pomoButtonValue == true)
    {
        $("#pomodoroCard").hide();
        $('#minutes').css('color','white');  
        $('#seconds').css('color','white');  
        $('#colon').css('color','white');
        pomodoro.stopTimer.apply(pomodoro);
        pomoButtonValue = false; 
    }

}


var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    workTime : 0,
    breakTime : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    workTimeDom : null,
    breakTimeDom : null,
    init : function(){
      var self = this;
      this.minutesDom = $('#minutes');
      this.secondsDom = $('#seconds');
      this.workTimeDom = $('#workTime');
      this.breakTimeDom = $('#breakTime');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      $('#work').click(function(){
        self.startWork.apply(self);
        var randomNum = Math.floor(Math.random()*1642);
        $.ajax(settings).done(function (response) {
            const data = JSON.parse(response);
            if(data[randomNum].text!==null){
                $("#quote").html(data[randomNum].text);
            }
            else{
                $("#quote").html("");
            }
            if(data[randomNum].author!==null){
                $("#author").html(` - ${data[randomNum].author}`);
            }
            else{
                $("#author").html(" - Anonymous");
            }
          });
      });
      $('#shortBreak').click(function(){
        self.startShortBreak.apply(self);
        $("#quote").html("Take a breather! :)");
        $("#author").html("");
      });
      $('#longBreak').click(function(){
        self.startLongBreak.apply(self);
        $("#quote").html("Take a breather! :)");
        $("#author").html("");
      });
      $('#stop').click(function(){
        $("#quote").html("Hello! I will be fueling you with inspiration during your work session.");
        $("#author").html("");
        self.stopTimer.apply(self);
      });
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
    },
    startWork: function() {
      this.resetVariables(25, 0, true);
      this.minutesDom.css('color','white');  
      this.secondsDom.css('color','white');  
      $('#colon').css('color','white'); 
    },
    startShortBreak : function(){
      this.resetVariables(5, 0, true);
      this.minutesDom.css('color','white');  
      this.secondsDom.css('color','white');  
      $('#colon').css('color','white'); 
    },
    startLongBreak : function(){
      this.resetVariables(15, 0, true);
      this.minutesDom.css('color','white');  
      this.secondsDom.css('color','white');  
      $('#colon').css('color','white'); 
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.minutesDom.css('color','white');  
      this.secondsDom.css('color','white');  
      $('#colon').css('color','white'); 
      this.updateDom();
    },
    toDoubleDigit : function(num1){
      if(num1 < 10) {
        return "0" + parseInt(num1, 10);
      }
      return num1;
    },
    updateDom : function(){
      this.minutesDom.text(this.toDoubleDigit(this.minutes));
      this.secondsDom.text(this.toDoubleDigit(this.seconds));
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.minutesDom.css('color','turquoise');  
      this.secondsDom.css('color','turquoise');  
      $('#colon').css('color','turquoise');  
      this.started = false;
    }
};
$(document).ready(function(){
  pomodoro.init();
});

$('#addTask').click(function(){
    itemNo++;
    var msgText = $('#message-text').val();
    $(`<div id="itemDiv${itemNo}"><input type="checkbox" id="item${itemNo}"><label for="item${itemNo}">${msgText}</label><br></div>`).appendTo('.taskList');
    $('#message-text').val("");
});

var exampleModal = $('#exampleModal');
exampleModal.click(function (event) {
    // Button that triggered the modal
    var button = event.relatedTarget
    // Extract info from data-bs-* attributes
    var recipient = button.attr('data-bs-whatever');
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    var modalTitle = exampleModal.$('.modal-title');
    var modalBodyInput = exampleModal.$('.modal-body input');

    modalTitle.textContent = 'To-Do List of ' + recipient;
    modalBodyInput.value = recipient;
  });

$('.closeBtn').click(function(){
    $('#message-text').val("");
});

$('.remBtn').click(function(){
    $(`#itemDiv${itemNo}`).remove();
    itemNo--;
});

var a = '';
var b = '';
var num = [];
var ans;

// All the numbers and operators input will be stored in an array "num" using function "sendNum()"
function sendNum(digit){

	num.push(digit);

	if(num.length != 1){
		a = '';
        $('#screen').html(a);		// clearing the screen.
	}


	for(i=0; i<num.length ; i++){

		a = a + num[i];				// concatenate the elements of the array "num" into a single string, which will be displayed on the screen
		
	}

    $('#screen').html(a);	// displaying the concatenated string

	
}

// when the user presses "=", function "equalTo()" is called 
function equalTo(){
	$('#screen').html('');

	for(i=0; i<num.length ; i++){

		b += num[i];						// concatenating the array "num" into a single string
	}

	ans = eval(b);	

	$('#screen').html(ans);		// result display

	while(num.length > 0){
    	num.pop();				// emptying the array "num"
	}

	num.push(ans.toString());

	
}


// When user presses "AC", function "clearScr()" is called
function clearScr(){
	$('#screen').html('');
	
	while(num.length > 0){
    	num.pop();				// emptying the array "num"
	}

	a ='';	
	b ='';
};

$( "#calcButton" ).click(calcClose);
$( "#calcClose" ).click(calcClose);

function calcClose(){

  if(calcButtonValue === false)
    {
        $("#calc").show(); 
        calcButtonValue = true; 
    }
    else if(calcButtonValue === true)
    {
        $("#calc").hide();
        calcButtonValue = false; 
        clearScr();
    }

}



$( "#chatboxButton" ).click(chatboxClose);

function chatboxClose(){

  if(chatboxButtonValue === false)
  {
      $("#Chatbox").show(); 
      chatboxButtonValue = true; 
  }
  else if(chatboxButtonValue === true)
  {
      $("#Chatbox").hide();
      chatboxButtonValue = false; 
      clearScr();
  }

}

$(document).ready(function () {
  initialize();
});




// // works out the X, Y position of the click inside the canvas from the X, Y position on the page
// function getPosition(mouseEvent, sigCanvas) {
//   var x, y;
//   if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
//      x = mouseEvent.pageX;
//      y = mouseEvent.pageY;
//   } else {
//      x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//      y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//   }

//   return { X: x - sigCanvas.offsetLeft, Y: y - sigCanvas.offsetTop };
// }

// function initialize() {
//   // get references to the canvas element as well as the 2D drawing context
//   var sigCanvas = document.getElementById("canvasSignature");
//   var context = sigCanvas.getContext("2d");
//   context.strokeStyle = 'Black';

//   // This will be defined on a TOUCH device such as iPad or Android, etc.
//   var is_touch_device = 'ontouchstart' in document.documentElement;

//   if (is_touch_device) {
//      // create a drawer which tracks touch movements
//      var drawer = {
//         isDrawing: false,
//         touchstart: function (coors) {
//            context.beginPath();
//            context.moveTo(coors.x, coors.y);
//            this.isDrawing = true;
//         },
//         touchmove: function (coors) {
//            if (this.isDrawing) {
//               context.lineTo(coors.x, coors.y);
//               context.stroke();
//            }
//         },
//         touchend: function (coors) {
//            if (this.isDrawing) {
//               this.touchmove(coors);
//               this.isDrawing = false;
//            }
//         }
//      };

//      // create a function to pass touch events and coordinates to drawer
//      function draw(event) {

//         // get the touch coordinates.  Using the first touch in case of multi-touch
//         var coors = {
//            x: event.targetTouches[0].pageX,
//            y: event.targetTouches[0].pageY
//         };

//         // Now we need to get the offset of the canvas location
//         var obj = sigCanvas;

//         if (obj.offsetParent) {
//            // Every time we find a new object, we add its offsetLeft and offsetTop to curleft and curtop.
//            do {
//               coors.x -= obj.offsetLeft;
//               coors.y -= obj.offsetTop;
//            }
//    // The while loop can be "while (obj = obj.offsetParent)" only, which does return null
//    // when null is passed back, but that creates a warning in some editors (i.e. VS2010).
//            while ((obj = obj.offsetParent) != null);
//         }

//         // pass the coordinates to the appropriate handler
//         drawer[event.type](coors);
//      }


//      // attach the touchstart, touchmove, touchend event listeners.
//      sigCanvas.addEventListener('touchstart', draw, false);
//      sigCanvas.addEventListener('touchmove', draw, false);
//      sigCanvas.addEventListener('touchend', draw, false);

//      // prevent elastic scrolling
//      sigCanvas.addEventListener('touchmove', function (event) {
//         event.preventDefault();
//      }, false); 
//   }
//   else {

// //      // start drawing when the mousedown event fires, and attach handlers to
// //      // draw a line to wherever the mouse moves to
// //      $("#canvasSignature").mousedown(function (mouseEvent) {
// //         var position = getPosition(mouseEvent, sigCanvas);

// //         context.moveTo(position.X, position.Y);
// //         context.beginPath();

// //         // attach event handlers
// //         $(this).mousemove(function (mouseEvent) {
// //            drawLine(mouseEvent, sigCanvas, context);
// //         }).mouseup(function (mouseEvent) {
// //            finishDrawing(mouseEvent, sigCanvas, context);
// //         }).mouseout(function (mouseEvent) {
// //            finishDrawing(mouseEvent, sigCanvas, context);
// //         });
// //      });

// //   }
// // }

// // // draws a line to the x and y coordinates of the mouse event inside
// // // the specified element using the specified context
// // function drawLine(mouseEvent, sigCanvas, context) {

// //   var position = getPosition(mouseEvent, sigCanvas);

// //   context.lineTo(position.X, position.Y);
// //   context.stroke();
// // }

// // // draws a line from the last coordiantes in the path to the finishing
// // // coordinates and unbind any event handlers which need to be preceded
// // // by the mouse down event
// // function finishDrawing(mouseEvent, sigCanvas, context) {
// //   // draw the line to the finishing coordinates
// //   drawLine(mouseEvent, sigCanvas, context);

// //   context.closePath();

// //   // unbind any events which could draw
// //   $(sigCanvas).unbind("mousemove")
// //               .unbind("mouseup")
// //               .unbind("mouseout");
// // }
