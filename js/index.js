const prevBtn = document.querySelector(".prev");
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const nextBtn = document.querySelector(".next");
const title = document.querySelector(".music__box-title");
const image = document.querySelector(".music__box-imgbox img");
const range = document.querySelector(".music__box-duration")
const volume = document.querySelector(".volume");
const volumeContent = document.querySelector(".volume__content");
const speed = document.querySelector(".speed");
const speedContent = document.querySelector(".speed__content");

// * Data 
const sources = [{
        audioSrc: "./music/ash-ash.mp3",
        imageSrc: "./image/tik tok.png",
        title: "Ash Ash ",
    },
    {
        audioSrc: "./music/maktabimda.mp3",
        imageSrc: "./image/maktabimda.jpg",
        title: "Maktabimda",
    },
    {
        audioSrc: "./music/tentakcham.mp3",
        imageSrc: "./image/tentakcham.jpg",
        title: "Tentakcham",
    },
    {
        audioSrc: "./music/vot-kak-to-tak.mp3",
        imageSrc: "./image/azajony.jpg",
        title: "Vot kak to tak",
    },
];

// * Counter
let counter = 0;

// * Music Object
const audio = new Audio();
range.value = 0;
volumeContent.textContent = volume.value * 10;
speedContent.textContent = speed.value / 2;
title.textContent = title.textContent.slice(0,15)

// * Handeler Events
playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", pause);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);
range.addEventListener("input", duration);
audio.addEventListener("ended", ended);
volume.addEventListener("input", changeVolume);
speed.addEventListener("input", changeSpeed);

// *  Functions
function play() {
    range.setAttribute("max", audio.duration);
    // * Change Icons
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";

    // * Play Song
    audio.src = sources[counter].audioSrc;
    audio.play();

    // * Change Title
    title.textContent = sources[counter].title;
    title.textContent = title.textContent.slice(0,15)

    // * Change Image
    image.setAttribute("src", sources[counter].imageSrc);

    // * Change Volume
    changeVolume();

    // *  Change Speed
    changeSpeed()

    // * Change Input Range Value
    setInterval(() => {
        range.value++;
    }, 50);


    // * Play Animation
    image.style.cssText = 'animation-name: rotate';
}

function pause() {
    // * Change Icons
    playBtn.style.display = "block";
    pauseBtn.style.display = "none";

    // * Pause Song
    audio.pause();

    // * Change Volume
    changeVolume();

    // *  Change Speed
    changeSpeed()

    // * Pause Animation
    image.style.cssText = 'animation-name: umidjon';
}

function prev() {
    // * Range Value
    range.value = 0;
    range.setAttribute("max", audio.duration);
    // * Decrementor
    counter--;
    if (counter < 0) {
        counter = sources.length - 1;
    }

    // * Change Volume
    changeVolume();

    // *  Change Speed
    changeSpeed()

    // * Audio Play
    play();
}

function next() {
    // * Range Value
    range.value = 0;
    range.setAttribute("max", audio.duration);
    // * Incrementor
    counter++;
    if (counter > sources.length - 1) {
        counter = 0;
    }
    // * Change Volume
    changeVolume();

    // *  Change Speed
    changeSpeed()

    // * Audio Play
    play();
}

function duration() {
    // * For Ended ?
    if (range.value == audio.duration.toFixed()) {
        next()
    }
    // * Assigment CurrentTime of Audio to Range Value 
    audio.currentTime = range.value;
}

function ended() {
    // * Audio Pause
    audio.pause();
    // * Interval 
    setTimeout(() => {
        audio.play();
    }, 1000);
    // * Range Value
    range.value = 0
    range.setAttribute("max", audio.duration);
    next();
}

function changeVolume() {
    audio.volume = volume.value / 10;
    volumeContent.textContent = volume.value * 10;
}

function changeSpeed() {
    audio.playbackRate = speed.value * 0.5;
    speedContent.textContent = speed.value / 2;
    // * Get Animation Duration Time
    let speedAnimation = 2
    if(+speed.value <= 2){
        speedAnimation = 3;
    }
    else if(+speed.value <=4 && +speed.value>2){
        speedAnimation = 1;
    } 
    else if(+speed.value <=6 && +speed.value>4){
        speedAnimation = 0.5;
    } 
    image.style.animationDuration = speedAnimation+"s"
}