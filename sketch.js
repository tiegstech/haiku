// This p5.js sketch utilizes participants responses from a questionnaire to explore thoughts of "safety" around the time of winter solstice period. This sketch was designed with aims to focus on amplifying and uplifting the voices of women, LGBTQ+, POC and other marginalized communities by showcasing their thoughts of what brings safety to them during winter solstice in the form of a interactive generative haiku poem.
// I was inspired to do a haiku after my feminist coding practices class. I was inspired by generative poetry from Dr. Soon's adaption of the House of Dust code (Soon, 2022). Other code of generativity was inspired and learnt by fellow p5 coders as well as  (see refrences)
// The array below stores my sound files. The sounds are responses from participants answers: Sea,Fireplace,Nature and the sound of friends.
let sounds = [];
let totalSounds = 4; // number of sound files
let currentSound; // I use this to store the index of which sound is currently playing. This is to ensure my sounds don't overlap
let isPlaying = false; // with the above comment in mind, this line is used to as a flag to indicate whether a sound is currently playing
let font;
// in the line below, I create an array of emojis. These emojis are participants responses to the question: "Is there any emojis/symbols that reflects your thoughts about the feeling/concept of the word "safe"." In line with feminist Principles, I did not want to edit or minimise marginalised communities by getting rid of duplicate responses but to instead ensure representation.
let Emojis = ['🥰', '🥰', '🤗', '😌', '😴', '😴', '😊', '🤝', '🫶🏻','🙏','🤞','🫂','🫂','🌅','🌆','🛌','🛌','🌱','🌲','🌲','🧣','🎧','🥽','❤️','❤️','💙','❤️‍🩹','☮️','☀️','🍫','☕️','🍲','🧸','🧘‍','🧘‍♀️','🔐','🕯️','🐶','🐶','🍂','🍁','🍁','🏠','🏡',' 🏡','🏡'];
let fallingEmojis = []; // This array stores the instances of the FallingEmojis class.
let responses = ["alone","bed","besties","bright","calm","clear","comfort","cozy","dog","friends","friendship","hug","hugs","home","home","home","interesting","indoors","keep","love","me","peace","ror","snug","secure","still","stillness","warm","warm","warm","warm","warm","warm","warm","warm","warm","warm","warm","warm","warm","warm","warm","warmth","warmth","you", "me","safe","self","lay","trust", "nest","rest","peace"]; //this array stores different response strings to the question asked- what words resonate the feeling of being "safe".In line with a traditional Haiku, it was prefrenced that responses were in a one syllable format. However as you may see some are two syllable or more. I purposely left these in because as I don’t want to silence people or adapt the words of marginalized communities.
let isFullscreen = true; // this boolean is indicates whether the display is in fullscreen mode.
let frameCounter = 0;
let currentTermIndex = 0;
// line 18, are indices to select a response.
// Background color changing code
let colors = ["#121420", "#77966D", "#DD6031", "#E2B728", "#A31621", "#4D0536", "#BDBDA3", "#3592CC","#14323E","rgb(227,175,184)", "rgb(75,45,45)" ]; // this works as an similar array to emojis and terms. These colours are the responses to the question- "What colours can you connect to the feeling of being "safe" around this time of year?"
let currentColorIndex = 0; // index to select the current background colour.

function preload() {
  font = loadFont('font/PicNic.otf');
}

function preload() {
  for (let i = 0; i < totalSounds; i++) {
    sounds[i] = loadSound("sounds/" + i + ".mp3");
  }
} 


// this preload() function loads my sound files into the sounds array during the preload phase. This ensures my sound files load before continuing 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  playRandomSound();
  textAlign(CENTER);
  textSize(24);
  setInterval(makeEmojis, 1000);
} // within my setup(), It's initializes the canvas, window width is numeric variable that stores the width of the browser's layout viewport. it also sets up to play a random sound, text alignment, text size, and starts a timer to create falling emojis every second.

function draw() {
  background(colors[currentColorIndex]);

  fill('#FFFAFB');
  textSize(24);
  textFont('PicNic');

  if (frameCounter % 60 === 0) {
    currentTermIndex = Math.floor(random(responses.length));
  }

  let startY = height / 2 - 30;
  text('Solstice whispers cold', width / 2, startY);
  startY += 40;
  text('Crystalline peace in stillness', width / 2, startY);
  startY += 40;
  text('leads a path to ' + responses[currentTermIndex] + ".", width / 2, startY);

  displayFallingEmojis();
  frameCounter++;
} // Within my draw() function is the main loop that draws the background, text, and falling emojis. It also increments the frame counter.

function displayFallingEmojis() {
  for (let i = fallingEmojis.length - 1; i >= 0; i--) {
    fallingEmojis[i].display();
    fallingEmojis[i].move();

    if (fallingEmojis[i].isOffScreen()) {
      fallingEmojis.splice(i, 1);
    }
  }
} // The displayFallingEmojis() function iterates through falling Emojis, displays and moves them, and removes those that are off-screen.

function makeEmojis() {
  if (fallingEmojis.length < 10) { // Limit the number of falling letters
    fallingEmojis.push(new FallingEmojis());
  }
} // makeLetter() function creates new instances of falling Emojis if the limit (10) is not reached.


class FallingEmojis {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.speed = 3; // Increase the speed for better visibility
    this.letter = random(Emojis);
  }

  move() {
    this.y += this.speed;
  }

  display() {
    text(this.letter, this.x, this.y);
  }

  isOffScreen() {
    return this.y > height;
  }
} //The FallingEmojis class defines the properties and methods for a falling Emoji, including its position, speed, display, movement, and checking if it's off-screen.

function playRandomSound() {
  if (!isPlaying && sounds.length > 0) {
    let randomIndex;

    // This Keeps generating a random index until it's different from the current sound
    do {
      randomIndex = int(random(sounds.length));
    } while (randomIndex === currentSound);

    // this Updates the currentSound variable
    currentSound = randomIndex;

    // This will now Play the selected sound if it exists and then set isPlaying to true
    if (sounds[currentSound]) {
      sounds[currentSound].play();
      isPlaying = true;

      // I set a timeout to reset isPlaying after the sound duration
      setTimeout(() => {
        isPlaying = false;
        playRandomSound(); // Play the next sound after the current one finishes to ensure no overlapping
      }, sounds[currentSound].duration() * 1000);
    }
  }
}

function mousePressed() {
  // Cycle to the next background color in the array
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} // windowResized() function adjusts my canvas size when the window is resized.


// References :

// Soon, W (2022) simple_houseofDust  [p5.js Javascript]. Available at: https://editor.p5js.org/siusoon/sketches/sEjio7jTj  (Accessed: 20th December, 2023).
// 2sman (no date) play sound samples randomly, P5.js web editor. Available at: https://editor.p5js.org/2sman/sketches/cAZE27bk4 (Accessed: 20 December 2023). 
// Meadows, I. (no date) changing background color (greyscale), P5.js web editor. Available at: https://editor.p5js.org/ivymeadows/sketches/HJ-4kQliZ (Accessed: 20 January 2023). 
// fauthereea (no date) Falling Letters- Level 1, P5.js web editor. Available at: https://editor.p5js.org/fauthereea/sketches/Nce8NkMVV (Accessed: 20 December 2023). 
// JustLearningToCode (2022) Writing a ball fall sketch in p5js, YouTube. Available at: https://www.youtube.com/watch?v=DYb5TfN880I (Accessed: 20 December 2023). 
// p5js (no date) LoadFont, reference | p5.js. Available at: https://p5js.org/reference/#/p5/loadFont (Accessed: 20 December 2023). 
// p5.js (no date) WindowWidth, reference | p5.js. Available at: https://p5js.org/reference/#/p5/windowWidth (Accessed: 20 December 2023). 
// p5.js (no date) fullscreen, reference | p5.js. Available at: https://p5js.org/reference/#/p5/fullscreen (Accessed: 20 December 2023). 
// for debugging: OpenAI (2022). ChatGPT. Available at: https://chat.openai.com/ (Accessed: 20 December 2023).
