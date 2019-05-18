// Naoto Kito, 5/17 simple stop watch 

let startTime = 0;
let updatedTime = 0;
let savedTime = 0;
let paused = 1;//止まっている状態.
let differenceTime = 0;
//タイマーをリセットしておく。
let showtime = document.getElementById('time');
showtime.innerHTML = `${displayTime(0)}`;
let interval = 0;

//スタートボタンの処理.
function startButton() {
    if(!startTime) {//startTimeが0のとき.
        startTime = new Date().getTime();
        paused = 0;//動いた状態にする.
        interval = setInterval(getShowTime,1000)
        document.getElementById('start').innerHTML = "<input type='button' id='start_button' value='reset' onclick='startButton();'>";
    } else {
        document.getElementById('start').innerHTML =  "<input type='button' id='start_button' value='start' onclick='startButton();'>";
        clearInterval(interval);
        //タイマーの値を初期化する.
        showtime.innerHTML =    `${displayTime(0)}`;

        //全ての値を初期化する.
        startTime =  0;
        updatedTime = 0;
        savedTime = 0;
        paused = 1;
        differenceTime = 0;
    }
}

//今の時間を表示する関数
function getShowTime() {
    updatedTime = new Date().getTime();
    differenceTime = updatedTime - startTime;
    if (savedTime){
        // showtime.innerHTML = `time : ${differenceTime + savedTime}` 
        showtime.innerHTML = `${displayTime(differenceTime+savedTime)}`;
    } else {
        // showtime.innerHTML = `time : ${differenceTime}`
        showtime.innerHTML =   `${displayTime(differenceTime)}`;
    }
}
//converter関数
function displayTime(time) {
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % ( 1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % ( 1000 * 60 )) / 1000);
    let converted_time = ((hours > 0) ? hours+" hour " : "") + ((minutes > 0) ? minutes+" min " : "") + seconds + " sec";
    return converted_time
}

// pauseボタンが押されたときの処理.
function pauseButton() {
    console.log(paused);
    if (paused){ //止まっているときの処理.（まだ開始されていない場合も含む。）
        // 開始された状態からの場合は、再開させる＋止まってる状態を無効にする
        //startしてからのpauseからのpauseであった場合.
        if(startTime){//再開を行う.
            paused = 0;
            startTime = new Date().getTime();
            interval = setInterval(getShowTime,1000);
        }
    } else if(paused === 0) { //動いてたら止める.
        // 今までの時間を記録＋止まってる状態を有効にする.
        savedTime = differenceTime+savedTime;//前回止めた分の＋前回より前の分
        clearInterval(interval)
        paused = 1 // 止まっている状態
    }
}

