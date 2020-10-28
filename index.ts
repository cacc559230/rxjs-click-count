import { fromEvent, of, Subject } from 'rxjs'; 
import { filter, map } from 'rxjs/operators';

// 開始按鈕
const startButton = document.querySelector('#start');
// 計數按鈕
const countButton = document.querySelector('#count');
// 發生錯誤按鈕
const errorButton = document.querySelector('#error');
// 計數完成按鈕
const completeButton = document.querySelector('#complete');

// 計數器內容
const currentCounterLabel = document.querySelector('#currentCounter');
// 只顯示偶數的計數器內容
const evenCounterLabel = document.querySelector('#evenCounter');
// 目前狀態
const statusLabel = document.querySelector('#status');

let counter = 0
let counter$:Subject<number>;

fromEvent(startButton,'click').subscribe(() => {

  counter$ = new Subject();
  counter = 0;

  statusLabel.innerHTML = "目前狀態: 開始計數";
  const eventCounter$ = counter$.pipe(
    filter(data => data % 2 === 0)
  ).subscribe( data => {
    evenCounterLabel.innerHTML = `偶數計數 : ${data}`;
  })
  counter$.subscribe({
  next: data => {
    currentCounterLabel.innerHTML = `目前計數：${data}`
  },
  error: message => {
    statusLabel.innerHTML = `目前狀態：錯誤 -> ${message}`
  },
  complete: () => {
    statusLabel.innerHTML = '目前狀態：完成'
  }
  });
  counter$.next(counter);
})
fromEvent(countButton,'click').subscribe(()=>{
  counter$.next(++counter);
})
fromEvent(errorButton,'click').subscribe(()=>{
  const reason = prompt("請輸入錯誤訊息");
  counter$.error(reason || 'error');
})
fromEvent(completeButton,'click').subscribe(()=>{
  counter$.complete();
})

