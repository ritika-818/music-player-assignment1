const arr = [
  {
    title: "Death Bed",
    artist: "Powfu",
    artwork: "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
    url: "https://samplesongs.netlify.app/Death%20Bed.mp3",
    id: "1",
  },
  {
    title: "Bad Liar",
    artist: "Imagine Dragons",
    artwork: "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
    url: "https://samplesongs.netlify.app/Bad%20Liar.mp3",
    id: "2",
  },
  {
    title: "Faded",
    artist: "Alan Walker",
    artwork: "https://samplesongs.netlify.app/album-arts/faded.jpg",
    url: "https://samplesongs.netlify.app/Faded.mp3",
    id: "3",
  },
  {
    title: "Hate Me",
    artist: "Ellie Goulding",
    artwork: "https://samplesongs.netlify.app/album-arts/hate-me.jpg",
    url: "https://samplesongs.netlify.app/Hate%20Me.mp3",
    id: "4",
  },
  {
    title: "Solo",
    artist: "Clean Bandit",
    artwork: "https://samplesongs.netlify.app/album-arts/solo.jpg",
    url: "https://samplesongs.netlify.app/Solo.mp3",
    id: "5",
  },
  {
    title: "Without Me",
    artist: "Halsey",
    artwork: "https://samplesongs.netlify.app/album-arts/without-me.jpg",
    url: "https://samplesongs.netlify.app/Without%20Me.mp3",
    id: "6",
  },
];

let index = 0;
let isPlaying = false;
let currentAudio;
let repeatBtn = false;
let shuffleButton = false;

function onload(index) {
  if (currentAudio) {
    currentAudio.pause();
  }
  currentAudio = new Audio(arr[index].url);
  currentAudio.play();
  container.innerHTML = "";
  const img = document.createElement("img");
  img.setAttribute("src", arr[index].artwork);
  img.classList.add("img");
  container.appendChild(img);

  const titleDiv = document.createElement("div");
  const title = document.createElement("div");
  title.textContent = arr[index].title;
  title.style.fontWeight = "bolder";
  title.style.fontSize = "large";
  titleDiv.appendChild(title);

  const artist = document.createElement("div");
  artist.textContent = arr[index].artist;
  artist.style.textAlign = "center";
  titleDiv.appendChild(artist);
  container.appendChild(titleDiv);

  const timeDiv = document.createElement("div");
  timeDiv.classList.add("time-info");
  container.appendChild(timeDiv);

  const progressDiv = document.createElement("div");
  progressDiv.classList.add("progress-div");
  container.appendChild(progressDiv);

  const progress = document.createElement("div");
  progress.classList.add("progress");
  progressDiv.appendChild(progress);

  const btnDiv = document.createElement("div");
  btnDiv.classList.add("btnDiv");

  const shuffle = document.createElement("button");
  shuffle.innerHTML = `<i class="fa-solid fa-shuffle"></i>`;
  shuffle.classList.add("shuffle");
  shuffle.addEventListener("click", () => {
    shuffleButton = !shuffleButton;
    shuffle.style.color = shuffleButton ? "black" : "";
    if (shuffleButton === true) shuffleBtn();
  });
  btnDiv.appendChild(shuffle);

  const prevbtn = document.createElement("button");
  prevbtn.innerHTML = `<i class="fa-solid fa-backward"></i>`;
  prevbtn.classList.add("prev");
  prevbtn.addEventListener("click", previous);
  btnDiv.appendChild(prevbtn);

  const play = document.createElement("button");
  play.classList.add("play");
  play.innerHTML = `<i class="fa-solid fa-play"></i>`;

  play.addEventListener("click", () => {
    if (isPlaying) {
      currentAudio.pause();
      isPlaying = false;
      play.innerHTML = `<i class="fa-solid fa-play"></i>`;
    } else {
      currentAudio.play();
      isPlaying = true;
      play.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    }
  });

  btnDiv.appendChild(play);

  const nextbtn = document.createElement("button");
  nextbtn.innerHTML = `<i class="fa-solid fa-forward"></i>`;
  nextbtn.classList.add("prev");
  nextbtn.addEventListener("click", next);
  btnDiv.appendChild(nextbtn);

  const repeat = document.createElement("button");
  repeat.innerHTML = `<i class="fa-solid fa-repeat"></i>`;
  repeat.classList.add("repeat");
  repeat.addEventListener("click", () => {
    repeatBtn = !repeatBtn;
    repeat.style.color = repeatBtn ? "black" : "";
  });
  btnDiv.appendChild(repeat);

  container.appendChild(btnDiv);

  currentAudio.addEventListener("timeupdate", () => {
    const progressPercent =
      (currentAudio.currentTime / currentAudio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
    if (currentAudio.currentTime === currentAudio.duration) {
      if (shuffleButton) shuffleBtn();
      else if (repeatBtn) {
        onload(index);
        currentAudio.play();
      } else {
        next();
      }
    }
    timeDiv.textContent =
      formatTime(currentAudio.currentTime) +
      " / " +
      formatTime(currentAudio.duration);
  });
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function shuffleBtn() {
  repeatBtn = false;
  shuffleButton = true;
  index = Math.floor(Math.random() * arr.length);
  onload(index);

  const playButton = document.querySelector(".play");
  playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function next() {
  isPlaying = true;
  repeatBtn = false;
  shuffleButton = false;
  index = (index + 1) % arr.length;
  onload(index);
  currentAudio.play();

  // Update the play button to show the pause icon
  const playButton = document.querySelector(".play");
  playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

function previous() {
  repeatBtn = false;
  shuffleButton = false;
  index = (index - 1 + arr.length) % arr.length;
  onload(index);
  currentAudio.play();

  // Update the play button to show the pause icon
  const playButton = document.querySelector(".play");
  playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
}

const container = document.getElementById("container");
window.addEventListener("load", () => onload(index));
document.getElementById("startButton").addEventListener("click", () => {
  onload(index);
  currentAudio.play();
});
