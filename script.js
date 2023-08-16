
console.log("Welcome to Music Player");

let play = document.getElementById('play');
let forward = document.getElementById('forward');
let backward = document.getElementById('backward');
let seek = document.getElementById('seekbar');
let progress = 0;
let songindex = 0;
let song = [
    { songname: "Faded", artistname: "Alan Walker", filepath: "https://drive.google.com/uc?export=download&id=1iC9p-XqZeM02jp4JrWCAK1xHmIvF8gJy", coverPath: "https://drive.google.com/uc?export=download&id=170Vwrcv3PdKXmink6qFUzvzMQV87Z32J"}, 
    { songname: "Pal Pal Dil ke Paas", artistname: "Arijit Singh", filepath: "https://drive.google.com/uc?export=download&id=1b2eDi2UJuC8OOgN7nZAPGEXrzHtINblm", coverPath: "https://drive.google.com/uc?export=download&id=1YQkSWhvi1Q399RNq4v4q8CmdPm0cchVi"}, 
    { songname: "Boba Tunnel", artistname: "Anupam Roy", filepath: "https://drive.google.com/uc?export=download&id=1oCM06uIHQHZXJknlbORXg8sECCkxtsyw", coverPath: "https://drive.google.com/uc?export=download&id=1Fp2j7BrgK4oQdRO_-U0b5b_9O5BGzNOr"}, 
    { songname: "Benche Thakar Gaan", artistname: "Fossils band", filepath: "https://drive.google.com/uc?export=download&id=1wmDGU5IsxQPJeigM4SW9YJ0e8TljI5UB", coverPath: "https://drive.google.com/uc?export=download&id=17IImAyV-ap-SZj-1tXfrHnw0RCyj1Ohj"}, 
    { songname: "Bojhena se Bojhena", artistname: "Arijit Singh", filepath: "https://drive.google.com/uc?export=download&id=1eDEU4onGu9suv7SNnNhTFpTQbMJ0x4D-", coverPath: "https://drive.google.com/uc?export=download&id=1xbBRCoVINj2AZEvzdBVXMjy60lzgVZTf"}, 
    { songname: "Love me like you do", artistname: "Elle Goulding", filepath: "https://drive.google.com/uc?export=download&id=18IssVJ5bt3QAECCKuPUza0MXpP6yj7bd", coverPath: "https://drive.google.com/uc?export=download&id=1aJqMxiMrmLH7MLXOx-FjtB0SXPWfC_XK"}, 
    { songname: "Let me down slowly", artistname: "Alec Benjamin", filepath: "https://drive.google.com/uc?export=download&id=1MrEGSNJDMtbax_-ZbKez7vD-qY339BJQ", coverPath: "https://drive.google.com/uc?export=download&id=1_jZnE1QsAtQN5qK3uYxBik0_KuRDO30m"}, 
    { songname: "Pee Loon", artistname: "Mohit Chauhan", filepath: "https://drive.google.com/uc?export=download&id=1scbJDaDSBMroirqUd4s0ZbAs8JoVOMjW", coverPath: "https://drive.google.com/uc?export=download&id=1pUJghUR-_MJJK-MOkLfSeR0JwpSE0SKN"}, 
    { songname: "Phir aur kya chahiye", artistname: "Arijit Singh", filepath: "https://drive.google.com/uc?export=download&id=1k6K0Bwd0jBPKUI0dxBoHDAJTvyeUIJd1", coverPath: "https://drive.google.com/uc?export=download&id=19VwcUqKSdAH5HpmxiP-UTplGC5ZaoL5D"}, 
    { songname: "Ae Dil hai Mushkil", artistname: "Arijit Singh", filepath: "https://drive.google.com/uc?export=download&id=1SQcntMYfy9AB9ELYkGxJjVzjHv6Rd1v7", coverPath: "https://drive.google.com/uc?export=download&id=1opFmHwX0VvgMS9h8EPWtCcSj0Koh1enI"}, 
]
let noofsong = song.length;
let audioElement = new Audio('faded.mp3');

play.addEventListener('click' , ()=>{
    if( audioElement.paused || audioElement.currentTime==0)
    {
        audioElement.play();
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    }
    else
    {
        audioElement.pause();
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    }
})

audioElement.addEventListener('timeupdate', seekupdate);
function seekupdate(){
    progress = Math.round(audioElement.currentTime/audioElement.duration*100);
    seek.value = progress;
    let minute = Math.floor(audioElement.currentTime/60);
    let second = Math.floor(audioElement.currentTime%60);
    if(second==60) {
        minute += 1;
        second = 0;
    }
    if (second<10) {
    document.getElementById('timedisplay').innerHTML = `-- ${minute} : 0${second} --`;
    }
    else
    document.getElementById('timedisplay').innerHTML = `-- ${minute} : ${second} --`;
    if(progress==100)
    {
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
        seek.value = 0;
        audioElement.pause();
        if(songindex==(noofsong-1))
            songindex=0;
        else
        songindex += 1;
        audioElement = new Audio(song[songindex].filepath);
        audioElement.play();
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
        audioElement.addEventListener('timeupdate', seekupdate);
        mainbannerupdate();
    }
}

seek.addEventListener('change', ()=>{
    audioElement.currentTime = seek.value*audioElement.duration/100;
})

Array.from(document.getElementsByClassName('song-banner')).forEach(bannerplay);
        function bannerplay(element){
        element.addEventListener('click', bannerfunc);
}
function bannerfunc(e)
    {
        songindex = parseInt(e.target.id)-1;
        console.log(parseInt(e.target.id));
        audioElement.pause();
        audioElement = new Audio(song[songindex].filepath);
        audioElement.currentTime = 0;
        audioElement.play();
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
        audioElement.addEventListener('timeupdate', seekupdate);
        mainbannerupdate();
    }
    function mainbannerupdate() {
        document.getElementById('mainname').innerHTML=song[songindex].songname;
        document.getElementById('mainsinger').innerHTML=song[songindex].artistname;
        document.getElementById('banner').src=song[songindex].coverPath;
        console.clear();
    }

forward.addEventListener('click', ()=>{
    audioElement.pause();
    audioElement.currentTime = 0;
    if (songindex==(noofsong-1))
    songindex = 0;
    else
    songindex += 1;
    audioElement = new Audio(song[songindex].filepath);
    audioElement.play();
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
    audioElement.addEventListener('timeupdate',seekupdate);
    mainbannerupdate();
})

backward.addEventListener('click', ()=>{
    audioElement.pause();
    audioElement.currentTime = 0;
    if (songindex==0)
    songindex = noofsong-1;
    else
    songindex -= 1;
    audioElement = new Audio(song[songindex].filepath);
    console.log(song[songindex].filepath);
    audioElement.play();
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
    audioElement.addEventListener('timeupdate',seekupdate);
    mainbannerupdate();
})
console.log(song);
let addsong = document.getElementById('addsong');
addsong.addEventListener('click',newsong);
function newsong() {
    let name = prompt("Enter the name of the song");
    let artist = prompt("Enter the name of the artist");
    let path = prompt("Enter the file path: local path or direct drive link");
    let temp = confirm("Do you want to enter the cover path?");
    let cover;
    if (temp==true) {
        cover = prompt("Enter the cover path: local path or direct drive link");
    }
    else
    cover = "";
    song.push({songname: `${name}`, artistname: `${artist}`, filepath: `${path}`, coverpath: `${cover}`});
    noofsong = song.length;
    console.log(song);
    console.log(noofsong);
}