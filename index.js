// Naoto Kito, 5/17 simple stop watch 

var startTime;
var updatedTime;
let savedTime = 0;
let paused = 0;
let differenceTime = 0;

function startButton() {
    startTime = new Date().getTime();
    interval = setInterval(getShowTime,1000);
}

function getShowTime() {
    updatedTime = new Date().getTime();
    let showtime = document.getElementById('time');
    differenceTime = updatedTime - startTime;
    if (savedTime){
        // showtime.innerHTML = `time : ${differenceTime + savedTime}` 
        showtime.innerHTML = `${displayTime(differenceTime+savedTime)}`;
    } else {
        // showtime.innerHTML = `time : ${differenceTime}`
        showtime.innerHTML =   `${displayTime(differenceTime)}`;
    }
}

function pauseButton() {
    if (paused){ //止まってたら再開する.
        // 再開させる＋止まってる状態を無効にする
        paused = 0
        savedTime = differenceTime+savedTime;//前回止めた分の＋前回より前の分
        startButton();
    } else { //動いてたら止める.
        // 今までの時間を記録＋止まってる状態を有効にする.
        clearInterval(interval);
        paused = 1 // paused===1状態
    }
}

function displayTime(time) {
    let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((time % ( 1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((time % ( 1000 * 60 )) / 1000);
    let converted_time = ((hours > 0) ? hours+" hour " : "") + ((minutes > 0) ? minutes+" min " : "") + seconds + " sec";
    return converted_time
}

const formElement = document.querySelector("#js-form");
//form要素から発生したsubmitイベントを受けとる。
const inputElement = document.querySelector("#js-form-input");
const todoList = []
let id = 0;
formElement.addEventListener("submit",(event) => {
    //イベントが発生した時に呼ばれる.
    event.preventDefault();
    console.log(`${inputElement.value}`);
    //配列に追加する.
    todoList.push({
        id: id++,
        text: inputElement.value
    });
});

//フォームから入力をし配列に格納されたものをvueで処理して描写.
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var tdapp = new Vue({
    el: '#app-7',
    data: {
        todoItems: todoList
    }
})