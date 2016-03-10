var activeSound;

window.onload = function() {
  activeSound = document.getElementById('sound');
  document.getElementById('soundTime').innerHTML = "0:00 / " + Math.floor(activeSound.duration / 60) + ":" + (Math.floor(activeSound.duration % 60) < 10 ? '0' : '') + Math.floor(activeSound.duration % 60);
};

function playPause(id){
    if (activeSound.paused){
         activeSound.play();
		 document.getElementById('playpause').setAttribute('class', 'glyphicon glyphicon-pause');
    }else{
         activeSound.pause();
		 document.getElementById('playpause').setAttribute('class', 'glyphicon glyphicon-play');
    }
}

function updateTime(){
    var currentSeconds = (Math.floor(activeSound.currentTime % 60) < 10 ? '0' : '') + Math.floor(activeSound.currentTime % 60);
    var currentMinutes = Math.floor(activeSound.currentTime / 60);
    document.getElementById('soundTime').innerHTML = currentMinutes + ":" + currentSeconds + ' / ' + Math.floor(activeSound.duration / 60) + ":" + (Math.floor(activeSound.duration % 60) < 10 ? '0' : '') + Math.floor(activeSound.duration % 60);

    var percentageOfSong = (activeSound.currentTime/activeSound.duration);
    var percentageOfSlider2 = document.getElementById('pbar').offsetWidth * percentageOfSong;
    
	document.getElementById('pbarslide').style.width = Math.round(percentageOfSlider2);
	document.getElementById('pbarslide').setAttribute('aria-valuenow', Math.round(percentageOfSong * 100));
	if (activeSound.ended) {
		document.getElementById('playpause').setAttribute('class', 'glyphicon glyphicon-play');
	}
}

function setLocation(percentage){
    activeSound.currentTime = activeSound.duration * percentage;
}

function setpbarPosition(obj,e){
    var pbarWidth = obj.offsetWidth;
    var evtobj=window.event? event : e;
    clickLocation =  evtobj.layerX - obj.offsetLeft;
    var percentage = (clickLocation/pbarWidth);
    setLocation(percentage);
}

function stopSong(){
    activeSound.currentTime = 0;
    activeSound.pause();
	document.getElementById('playpause').setAttribute('class', 'glyphicon glyphicon-play');
}