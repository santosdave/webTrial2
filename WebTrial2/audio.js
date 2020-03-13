//  SONGS TO PLAY
const audios       = [
    ['https://www.bensound.com/bensound-music/bensound-ukulele.mp3', '2:37'], 
    ['https://www.bensound.com/bensound-music/bensound-memories.mp3', '3:50'], 
    ['https://www.bensound.com/bensound-music/bensound-sunny.mp3', '2:20'],
    ['https://www.bensound.com/bensound-music/bensound-buddy.mp3', '2:02'],
    ['https://www.bensound.com/bensound-music/bensound-energy.mp3', '2:59'],
    ['https://www.bensound.com/bensound-music/bensound-love.mp3', '5:35'],
    ['https://www.bensound.com/bensound-music/bensound-tenderness.mp3', '2:03']

  ];

let songs = [];
songs = audios;

// IMAGES OF THE SONGS . THESE WILL BE MIXED WHEN THE SHUFFLE BUTTON IS PRESSED
const images     = [
    'https://images.pexels.com/photos/395196/pexels-photo-395196.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260', 
    'https://images.pexels.com/photos/1684617/pexels-photo-1684617.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', 
    'https://images.unsplash.com/photo-1498550744921-75f79806b8a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', 
    'https://images.pexels.com/photos/35188/child-childrens-baby-children-s.jpg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
    'https://images.pexels.com/photos/372882/pexels-photo-372882.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260', 
    'https://images.unsplash.com/photo-1552319704-41c50c38c26e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80', 
    'https://images.pexels.com/photos/205000/pexels-photo-205000.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'
 ];


let  posters  = [],  // THIS ARRAY LETS TO WORK  WITH THE IMAGES
myColors = []; // THIS ARRAY LETS TO WORK  WITH THE HEART ICON'S COLORS

posters = images;        


// THIS "for" CRATES AN ARRAY OF THE HEART ICON'S COLORS
for (let i = 0; i <= images.length; i++ ){
myColors.push('#fff');
}


// WAIT FOR THE DOCUMENT TO BE LOADED
document.addEventListener("DOMContentLoaded", function(event) { 

const song        = new Audio(),                              // AUDIO OBJECT
songTitle   = document.querySelector('#songTitle'),     // SONG TITLE
fillBar     = document.querySelector('#fill'),          // FILL OF THE PROGRESS BAR
progressBar = document.querySelector('.progress-bar'),  // CONTAINER OF THE PROGRESS BAR  
currTime    = document.querySelector('#current-time'),  // CONTAINER OF THE CURRENT TIME
remainTime  = document.querySelector('#remaining-time'),// CONTAINER OF THE REMAINING TIME
play        = document.querySelector('.play-icon'),     // PLAY BUTTON
pause       = document.querySelector('.pause-icon'),    // PAUSE BUTTON
next        = document.querySelector('.next'),          // NEXT BUTTON
prev        = document.querySelector('.prev'),          // PREV BUTTON
poster      = document.querySelector('img'),            // BACKGROUND IMAGE
activ       = document.querySelectorAll('.active'),     // GREEN CIRCLE
btnTitle    = document.querySelectorAll('.button'),     // ENABLES THE TEXT OF EACH SONG TO BE PLAYED
upVolum     = document.querySelector('.vol-container'), // CONTAINER OF THE VOLUME CONTROL
volum       = document.querySelector('.up-down'),       // GREEN CONTAINER OF THE VOLUME
btnVolum    = document.querySelector('.volume'),        // SVG ICON OF THE VOLUME
btnReplay   = document.querySelector('.replay'),        // SVG REPLAY ICON
paths       = btnReplay.firstElementChild.querySelectorAll('path'),   // PATHS OF THE REPLAY ICON
btnShuffle  = document.querySelector('.shuffle'),       // SVG SHUFFLE ICON
sPaths      = btnShuffle.firstElementChild.querySelectorAll('path'),  // PATHS OF THE SHUFFLE ICON
btnFavorite = document.querySelectorAll('.favorite-song'),            // HEART ICON
playList    = document.querySelector('#playlist-music'),              // PLAYLIST CONTAINER
finTime     = playList.querySelectorAll('.final-time');               // WHERE THE LENGHT OF A SONG IS SET

let currentSong   = 0,                                       // POINTING TO THE FIRST SONG
volumEnable   = false,                                   // TO SHOW OR HIDDE THE VOLUME 
loopEnable    = false,                                   // TO ENABLE THE REPLAY BUTTON
shuffleEnable  = false;                                  // TO ENABLE THE SHUFFLE BUTTON



starting();

// LISTENING THE EVENTS

play.addEventListener('click', () => {
song.play();
playTrack();                    // CHANGES THE PLAY-ICON TO PAUSE-ICON
});

pause.addEventListener('click', () => {
song.pause();
pauseTrack();                   // CHANGES THE PAUSE-ICON TO PLAY-ICON
});

prev.addEventListener('click', prevSong); // LISTENING THE 'click' EVENT OF THE PREV-ICON
next.addEventListener('click', nextSong);// LISTENING THE 'click' EVENT OF THE NEXT-ICON

song.addEventListener('timeupdate', progressFunc);  //   PROGRESS BAR WIDTH
progressBar.addEventListener('click', seek);  //   PROGRESS BAR SEEK
upVolum.addEventListener('click', volume);  //   PROGRESS BAR SEEK


//  THIS "for" IS TO LISTEN WHEN A HEART IS CLICKED
for(i = 0; i <= btnFavorite.length-1; i++)
{
(function (arg) {
let x = i;
btnFavorite.item(i).addEventListener('click', function(){

if (arg === '#27EC55'){
arg = '#fff'

btnFavorite[x].querySelector('path').style.fill = arg;
}
else if (arg === '#fff'){
arg = '#27EC55'
btnFavorite[x].querySelector('path').style.fill = arg;
}
});
}(myColors[i]));
}


//  LISTEN WHEN THE TITLE OF A SONG IS CLICKED AND PLAY IT
for(i = 0; i <= btnTitle.length-1; i++)
{
(function (arg) {

btnTitle.item(i).addEventListener('click', function(){
let index = songs.indexOf(arg); // 

if (!shuffleEnable){
titlePlays(index);  // IF SHUFFLE IS ACTIVE YOU CAN'T CLICK OVER THE TITLE
}


});
}(songs[i]));
}

// LISTEN THE REPLAY ICON, IF IT IS CLICKED, THE COLOR OF THE ICON CHANGES AND THE SONG IS REPEATED WHEN ENDS
btnReplay.addEventListener('click', ()=> {
if (loopEnable === false) {
song.loop = true;
loopEnable = true; 
paths[0].style.stroke = '#27EC55';
paths[1].style.stroke = '#27EC55';
} else {
song.loop = false;
loopEnable = false; 
paths[0].style.stroke = '#fff';
paths[1].style.stroke = '#fff';
}
});


//  LISTEN THE SHUFFLE ICON, IF IT IS CLICKED, THE ORDER OF THE SONGS IS SHUFFLED AND THE ICON CHANGES ITS COLOR
//  THE FIRST SONG OF THE NEW SHUFFLED LIST IS PLAYED
btnShuffle.addEventListener('click', ()=> {
if (shuffleEnable === false) {
shuffleEnable = true; 
sPaths[0].style.stroke = '#27EC55';
sPaths[1].style.stroke = '#27EC55';
sPaths[2].style.stroke = '#27EC55';
songs =  _.shuffle( songs );
posters = _.shuffle( posters );
starting();

} else {
shuffleEnable = false; 
sPaths[0].style.stroke = '#fff';
sPaths[1].style.stroke = '#fff';
sPaths[2].style.stroke = '#fff';
songs = audios;
posters = images;
starting();
}

song.play();
playTrack();                    // CHANGES THE PLAY-ICON TO PAUSE-ICON


});


// LISTEN IF THE VOLUME ICON IS CLICKED. WHEN IT IS CLICKED, SHOWS THE VOLUME CONTROL 
btnVolum.addEventListener('click', ()=>{
if (volumEnable === false){
upVolum.style.display = "block";
volumEnable = true;
}
else {
upVolum.style.display = "none";
volumEnable = false;
}
});


// FUNCTIONS



// IT GIVES FORMAT TO THE TIME
timeFormatted = (duration) => {
let minutes = Math.floor(duration / 60);
let seconds = Math.floor(duration) - minutes*60;
let timeFormat = (isNaN(minutes) ? 0 : minutes).toString().padStart(1, '0') 
+ ':' 
+ (isNaN(seconds) ? 0:seconds).toString().padStart(2, '0'); 
return timeFormat
}




// INITIALIZE THE PAGE WITH DEFAULT VALUES
function starting() {

for( let i = 0; i < songs.length; i++){
activ[i].style.opacity = 0;
btnTitle[i].style.color = "white";
}


for ( let i = 0; i < songs.length ; i++ ) {
btnTitle[i].innerHTML = extractText(i);
finTime[i].innerHTML =songs[i][1];
}

//SOURCE OF THE AUDIO TO BE PLAYED
currentSong = 0;
song.src = songs[currentSong][0];
//SOURCE OF THE POSTER TO BE DISPLAYED
poster.src = posters[currentSong];
activ[currentSong].style.opacity = 1;
btnTitle[currentSong].style.color = "#27EC55";
songTitle.firstChild.nodeValue = extractText(currentSong);  // Set the song TITLE
}

// EXTRACTS THE TEXT OF THE SRC AND FORMAT IT TO BE SHOWN AS THE TITLE OF THE SONG
function extractText(currentSong) {
const regex =/-/gi; // THIS CHANGES ALL THE INSTANCES THAT HAVE THE '-'
let preText = songs[currentSong][0].replace(regex, ' ').slice(48);
let capitalizedText = preText.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
let finalText = capitalizedText.slice(0, -4);
return finalText;
}




// THIS FUNCTION INCREMENTS THE WIDTH OF THE BAR == timeProgress
function progressFunc() {
let timeProgress = song.currentTime / song.duration;
fillBar.style.width = timeProgress * 100 + '%';
currTime.firstChild.nodeValue = timeFormatted(song.currentTime);  //
remainTime.firstChild.nodeValue = timeFormatted(song.duration-song.currentTime);  // 
}

// THIS FUNCTION ALLOWS YOU TO ADVANCE OR RETURN THE AUDIO PLAYBACK
function seek(event) {
let percent = event.offsetX / this.offsetWidth;
song.currentTime = percent * song.duration;
fillBar.style.width = percent / 100;

}

// THIS FUNCTION INCREMENTS THE HEIGHT OF THE VOLUME CONTROL  (GREEN CONTAINER)
function volume(event) {
let percenta = event.offsetY / this.offsetHeight;
percenta = Math.round(percenta*100)/100;
song.volume = 1 - percenta;
volum.style.height = `${(1-percenta)*100}%`;
}

// END TRACK FUNCTION
song.addEventListener('ended', () => {
pauseTrack();   // CHANGES THE PAUSE-ICON TO PLAY-ICON
nextSong();     // PLAYS THE NEXT SONG
});


// FUNCTION THAT CHANGES THE PLAY-ICON TO PAUSE-ICON 
function playTrack() {  
document.querySelector('.pause-icon').style.display = "block";
document.querySelector('.play-icon').style.display = "none";
}

// FUNCTION THAT CHANGES THE PAUSE-ICON TO PLAY-ICON
function pauseTrack() {
document.querySelector('.pause-icon').style.display = "none";
document.querySelector('.play-icon').style.display = "block";
}



//   FUNCTION NEXT SONG
function nextSong() {

currentSong++;

if(currentSong > (songs.length -1)){
currentSong = 0;
song.src = songs[currentSong][0];
poster.src = posters[currentSong];

for( let i = 0; i < songs.length; i++){
activ[i].style.opacity = 0;
btnTitle[i].style.color = "white";
}
// activ[songs.length-1].style.opacity = 0;
activ[currentSong].style.opacity = 1;
// btnTitle[btnTitle.length-1].style.color = "white";
btnTitle[currentSong].style.color = "#27EC55";
songTitle.firstChild.nodeValue = extractText(currentSong);  // Set the title of song

}else {
song.src = songs[currentSong][0];
poster.src = posters[currentSong];

for( let i = 0; i < songs.length; i++){
activ[i].style.opacity = 0;
btnTitle[i].style.color = "white";
}

// activ[currentSong-1].style.opacity = 0;
activ[currentSong].style.opacity = 1;
// btnTitle[currentSong-1].style.color = "white";
btnTitle[currentSong].style.color = "#27EC55";
songTitle.firstChild.nodeValue = extractText(currentSong);  // Set the title of song
}
song.play();
playTrack();                    // Changes the play-icon to pause-icon
}


//   FUNCTION PREVIOUS SONG
function prevSong() {

currentSong--;

if(currentSong < 0){
currentSong = songs.length -1;
song.src = songs[currentSong][0];
poster.src = posters[currentSong];

for( let i = 0; i < songs.length; i++){
activ[i].style.opacity = 0;
btnTitle[i].style.color = "white";
}
// activ[0].style.opacity = 0;
activ[currentSong].style.opacity = 1;
// btnTitle[0].style.color = "white";

btnTitle[currentSong].style.color = "#27EC55";
songTitle.firstChild.nodeValue = extractText(currentSong);  // Set the title of song

}else {
song.src = songs[currentSong][0];
poster.src = posters[currentSong];

for( let i = 0; i < songs.length; i++){
activ[i].style.opacity = 0;
btnTitle[i].style.color = "white";
}

// activ[currentSong+1].style.opacity = 0;
activ[currentSong].style.opacity = 1;
// btnTitle[currentSong+1].style.color = "white";
btnTitle[currentSong].style.color = "#27EC55";
songTitle.firstChild.nodeValue = extractText(currentSong);  // Set the title of song

}
song.play();
playTrack();                    // Changes the play-icon to pause-icon
}


// THIS FUNCTION PLAYS A SONG WHEN THE TITLE IS CLICKED
function titlePlays(miSong) {

for( let i = 0; i < songs.length; i++){
activ[i].style.opacity = 0;
btnTitle[i].style.color = "white";
}

activ[miSong].style.opacity = 1;
btnTitle[miSong].style.color = "#27EC55";
songTitle.firstChild.nodeValue = extractText(miSong);  // Set the title of song
song.src = songs[miSong][0];
poster.src = posters[miSong];
currentSong = miSong;
song.play();
playTrack();                    // Changes the play-icon to pause-icon

return currentSong;
}

});
