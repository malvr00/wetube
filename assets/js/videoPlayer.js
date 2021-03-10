const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = videoContainer.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScreen = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsValume");

const registerView = () =>{
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`,{
    method:"POST" // database 변갱해야 해서 post 사용.
  }); // fetch에서 작동. 이유:getRequest가지고 있어서.
}
//video mdn elements 사이트 보기 -> htmlMediaelement

//Play Button
function handlePlayClick() {
  if (videoPlayer.paused) {
    // 미디어 일시 정지 여부를 Boolean 값으로 반환합니다.
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

// VolumeButton
function handleVolumeCilck() {
  if (videoPlayer.muted) {
    // 오디오 음소거 여부를 Boolean 값으로 반환합니다. 음소거라면 true 반대는 false 를 반환합니다..
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume; // 이전 값 기억하고 있음.
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

//전체화면시 작아지는 함수
function exitFullScreen() {
  fullScreen.innerHTML = '<i class="fas fa-expand"></i>';
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCanelFullScreen) {
    document.mozCanelFullScreen();
  } else if (document.webkitExitFullScreen) {
    document.webkitExitFullScreen();
  } else if (document.msExitFullScreen) {
    document.msExitFullScreen();
  }
  fullScreen.addEventListener("click", goFullScreen);
}
// FullScreen
//request full screen mdn 사이트 참조
function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullScreen) {
    videoContainer.webkitRequestFullScreen();
  } else if (videoContainer.msRequestFullScreen) {
    videoContainer.msRequestFullScreen();
  }
  fullScreen.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreen.removeEventListener("click", goFullScreen); // 이미 full화면인데 또 full화면 할 필요 없어서 제거
  fullScreen.addEventListener("click", exitFullScreen);
}

//동영상 재생 시간 구하기
const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  //console.log(secondsNumber);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

//현제 재생 표시
function getCurrentTime() {
  // 현재 재생 시점을 초 단위로 표현한 double값입니다. 이 값을 세팅하여 재생 시점을 변경할 수 있습니다.
  currentTime.innerText = formatDate(Math.floor(videoPlayer.currentTime));
  // 한번말 발생함.
}

//전체 동영상 길이
function setTotalTime() {
  // 미디어의 전체 길이를 초 단위로 double 값으로 반환합니다. 재생 가능한 미디어가 없을 경우 0을 반환합니다.
  const totlaTimeString = formatDate(videoPlayer.duration);
  totalTime.innerText = totlaTimeString;
  setInterval(getCurrentTime, 1000); // 매 초마다 호출. (Timer 함수)
}

//video 종료시 처음 화면으로
function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

//볼륨
function handelDrag(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.value = value;
  if(value>=0.6){
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if(value >=0.2){
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeCilck);
  fullScreen.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime); // 데이터가로드 된 경우 이벤트가 발생합니다.
  videoPlayer.addEventListener("ended", handleEnded); // video 끝났을때
  volumeRange.addEventListener("input", handelDrag);
}

if (videoContainer) {
  init();
}
