var capture;
let modelURL = "./my-model/";
let font;
let heart;
let x;
let check;
let displayheart = false;
let flashOpacity = 0;
let object_detected= "";
let classifyButton = true;
let model_ready = false;
let buttonPressed = false;
let currScore = '0';
let scores = ['0', '1','2','9999999999999999999999999999999999999999999999','34', '2/3','¿', '-10', 'inf', '$100000000000', 'fbi@us.gov', '[undefined]', '<stop cheating>', '???'];

let displayDuration = 10; // Set the display duration in seconds
let fadeDuration = 5; // Set the fade out duration in seconds

let correct;
let wrong;

let currentPrompt;
let insidePrompts = [
  {
    type : "inside",
    text : "i'm thirsty go find me a WATER FOUNTAIN and take a picture",
    id : "Water Fountain",
    index : 0
  },
  {
    type : "inside",
    text : "why are we here go find me an EXIT SIGN and click capture!",
    id : "Exit Sign",
    index : 1
  },
  {
    type : "inside",
    text : "i am a tech nerd - where is the WIFI ROUTER (look above you maybe?) find it and press click",
    id : "Router",
    index : 2
  },
  {
    type : "inside",
    text : "watch out! the floor is wet - or it could be if you find a WET FLOOR SIGN",
    id : "Wet Floor Sign",
    index : 3
  },
  {
    type : "inside",
    text : "god you've been around too much go find a HAND SANITIZER and click me!",
    id : "Hand Sanitizer",
    index : 4
  },
]

let outsidePrompts = [
  {
    type : "outside",
    text : "sometimes we just need to reminisce by a TRASH CAN - go outside, find one and click me!",
    id : "Trash",
    index : 0
  },
  {
    type : "outside",
    text : "god it's really cold can you find a RED FIRE HYDRANT and show me one by clicking capture?",
    id : "Fire Hydrant",
    index : 1
  },
  {
    type : "outside",
    text : "do uic's tall BLUE EMERGENCY LIGHTS even work? - go towards one and click!",
    id : "Emergency Light",
    index : 2
  },
  {
    type : "outside",
    text : "walk towards one of the BLUE CLASSROOM SIGNBOARDS and press capture!",
    id : "Location Sign",
    index : 3
  },
  {
    type : "outside",
    text : "when was the last time you rode a bike? - go towards a DIVVY BIKE and take a photo!",
    id : "Divvy Bikes",
    index : 4
  }
]

let audioPrompts = [
  {
    type: "audio",
    text : "listen for a KEYBOARD TYPING and click capture",
    id : null,
    index : 0
  },
  {
    type: "audio",
    text : "can you hear the NOISE OF CARS passing by? click capture!",
    id : null,
    index : 1
  },
  {
    type: "audio",
    text : "talk in a BRITISH ACCENT and click capture!",
    id : null,
    index : 2
  },
  {
    type: "audio",
    text : "who is our MASCOT? click the button and answer",
    id : null,
    index : 3
  },
  {
    type: "audio",
    text : "LAUGH like a MANIAC and click the button",
    id : null,
    index : 4
  },
]

let actions = [
  {
    type: "action",
    text : "SING your favorite nursery rhyme",
    id : null,
    index : 0
  },
  {
    type: "action",
    text : "go LAY on the grass for 1 minute",
    id : null,
    index : 1
  },
  {
    type: "action",
    text : "SIT on a bench and people watch",
    id : null,
    index : 2
  },
  {
    type: "action",
    text : "ASK someone 'how to go to SCE?' ",
    id : null,
    index : 3
  },
  {
    type: "action",
    text : "SPIN around 3 times",
    id : null,
    index : 4
  },
  {
    type: "action",
    text : "FOLLOW someone wearing a hoodie for 1 minute",
    id : null,
    index : 5
  },
  {
    type: "action",
    text : "SIT in a classroom for 1 minute",
    id : null,
    index : 6
  }
];

function preload() {
  font = loadFont('Arcadepix Plus.ttf');
  heart = loadImage("heart.png");
  check = loadImage("check.png")
  x = loadImage("x.png")
  
  correct = loadSound('correct.mp3');
  wrong = loadSound('wrong.mp3');

}

function setup() {
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
      // facingMode: "user"
    }

      
  };
  capture = createCapture(constraints);
  createCanvas(windowWidth, windowHeight);
  classifier = ml5.imageClassifier(modelURL, capture, modelReady);  
  capture.hide()
  
  textFont(font);
  currentPrompt = outsidePrompts[int (random(0, outsidePrompts.length))];
  currScore = scores[0]; // fix
}

function modelReady() {
}

function classifyVideo() {
    if(classifyButton)
      classifier.classify(gotResult);
}

function gotResult(err, results) {
    classifyVideo();
  
    try {
      object_detected = results[0].label
      // console.log(object_detected);
      classifyButton = false;

      // flashes the screen when ready
      if(!model_ready) {
          flashOpacity = 255;
          model_ready = true;
      } 
      
      if(buttonPressed) {
        
        if (currentPrompt.id == null) {
          displayImage(check)
          switchPrompt();
          updateScore();
          correct.play();
        } else if (currentPrompt.id == object_detected) {
          displayImage(check)
          switchPrompt();
          updateScore();
          correct.play();
        } else {
          displayImage(x);
          wrong.play();
        }
        
        buttonPressed = false;
      }
      
      
    } catch {
      
    }
}

function draw() {
  background(0)
  
  if(model_ready) {
    //show the videofeed
    image(capture, 0, 0); 

    // display score & photo button
    displayFeatures(); 

    // display the prompt
    displayPrompt(currentPrompt);
    
  } else {
    // loading screen
    isModelReady();
  }
  
  // actions
  flash();
  classifyVideo();
}

function updateScore() {
  currScore = scores[scores.indexOf(currScore) + 1];
  if (currScore == "34") {
    displayheart = true;
  }
  else {
    displayheart = false;
  }
}

function switchPrompt() {

  if(currentPrompt.type == 'outside') {
    outsidePrompts = outsidePrompts.filter((item) => item.index !== currentPrompt.index);
    currentPrompt = actions[int (random(0, actions.length))];

  } else if(currentPrompt.type == 'action') {
    actions = actions.filter((item) => item.index !== currentPrompt.index);
    currentPrompt = insidePrompts[int (random(0, insidePrompts.length))];

  } else if(currentPrompt.type == 'inside') {
    insidePrompts = insidePrompts.filter((item) => item.index !== currentPrompt.index);
    currentPrompt = audioPrompts[int (random(0, audioPrompts.length))];

  } else if(currentPrompt.type == 'audio') {
    audioPrompts = audioPrompts.filter((item) => item.index !== currentPrompt.index);
    currentPrompt = outsidePrompts[int (random(0, outsidePrompts.length))];
  }
}

function isModelReady() {
    push();
      background(0)

      fill(255)
      textSize(64);
      textAlign(CENTER, CENTER);
      text('LOADING...', width/2, height * 5/12 );

      textSize(25);
      fill(200)
      text('TIP:  Nobody will judge your score.\n (Even if its embarassing)', width/2, height-50);        
    pop();
}

function flash() {
  if (flashOpacity > 0) {
    
    fill(255, 255, 255, flashOpacity);
    rect(0, 0, width, height);
    flashOpacity -= 5; // Decrease opacity to fade out the flash
  }
}
  
function displayFeatures() {
  // black border bottom
  push();
    fill(0,0,0);
    rectMode(CORNERS);
    rect(0, height, width, height - (0.2 * height))
  pop();
  
  // black border top
  push();
    fill(0,0,0);
    rectMode(CORNERS);
    rect(0, 0, width, 60)
  pop();

  // score
  push();
    noStroke();
    textSize(40);
    fill('white');
    textAlign(LEFT, CENTER);
    text('SCORE:', 15, 25);
  
    if (displayheart) {
      heart.resize(0,70);
      image(heart,120, -5);
    }
    else {
      text(`${currScore}`, 140, 25);
    }
  pop();
  

  push();
    fill('white');
    noStroke();
    circle(width/2, (height * 0.8) - 60, 75);
    stroke('black');
    strokeWeight(2);
    circle(width/2, (height * 0.8) - 60, 65);
  pop();
}

function displayPrompt(prompt) {
  push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    fill(255)
    textSize(30);
    text(prompt.text, width/2, height * 0.9, width, height * 0.2)
  pop();
}

function touchStarted() {
  let distance = dist(width/2, (height * 0.8) - 60, mouseX, mouseY);
  let isInside = (distance < 37);
  if (isInside) {
    flashOpacity = 255;
    classifyButton = true;
    buttonPressed = true;
    startTime = frameCount;
  }
}

function displayImage(img) {
  push();
  imageMode(CENTER);
    // Display the image
  image(img, width/2, height/2);
  
  // Calculate how many frames have passed
  let elapsedTime = frameCount - startTime;

  // Check if it's time to start fading out
  if (elapsedTime > displayDuration * 60) { // Multiply by frame rate (60 frames per second)
    let alpha = map(elapsedTime, displayDuration * 60, (displayDuration + fadeDuration) * 60, 255, 0);
    tint(255, alpha); // Apply alpha for fading effect
  }
  pop();
}

