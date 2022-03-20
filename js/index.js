const prevBtn = document.querySelector(".prev");
const playBtn = document.querySelector(".play");
const pauseBtn = document.querySelector(".pause");
const nextBtn = document.querySelector(".next");
const title = document.querySelector(".music__box-title");
const image = document.querySelector(".music__box-imgbox img");
const progressLine = document.querySelector(".duration__line")
const progressShape = document.querySelector(".duration__overlay")
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
volumeContent.textContent = volume.value * 10;
speedContent.textContent = speed.value / 2;
title.textContent = title.textContent.slice(0, 15)

// * Handeler Events
playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", pause);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);
audio.addEventListener("ended", ended);
volume.addEventListener("input", changeVolume);
speed.addEventListener("input", changeSpeed);
audio.addEventListener("timeupdate", progress)
progressLine.addEventListener("click", changeDuration)

// *  Functions
function play() {

    // * Change Icons
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";

    // * Play Song
    audio.src = sources[counter].audioSrc;
    audio.play();

    // * Change Title
    title.textContent = sources[counter].title;
    title.textContent = title.textContent.slice(0, 15)

    // * Change Image
    image.setAttribute("src", sources[counter].imageSrc);

    // * Change Volume
    changeVolume();

    // *  Change Speed
    changeSpeed()

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

function progress() {
    progressShape.style.width = progressLine.clientWidth / audio.duration * audio.currentTime + "px";
}

function changeDuration(e) {
    audio.currentTime = audio.duration / (progressLine.clientWidth / e.offsetX); 
}

function ended() {
    // * Audio Pause
    audio.pause();
    // * Interval 
    setTimeout(() => {
        next();
    }, 800);
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
    if (+speed.value <= 2) {
        speedAnimation = 3;
    } else if (+speed.value <= 4 && +speed.value > 2) {
        speedAnimation = 1;
    } else if (+speed.value <= 6 && +speed.value > 4) {
        speedAnimation = 0.5;
    }
    image.style.animationDuration = speedAnimation + "s"

}