'use strict'
// // 1行目に記載している 'use strict' は削除しないでください

let image = document.getElementById('dietMan');
let flag = true;
changeImage();
// 3秒ごとにchangeImage()関数を実行 
setInterval(changeImage, 3000); //setInterval 関数は、指定した間隔ごとに指定した関数を繰り返し実行

function changeImage(){  
  if(image.style.opacity === ''){
    image.style.opacity = 1;
  }
  let opacityInt = image.style.opacity * 100;
  //フェードアウトの処理（opacityを50ミリ秒ごとに0.05づつ減らす）
  let intervalId = setInterval( () => {
    opacityInt = opacityInt - 5;
    image.style.opacity = opacityInt / 100;

    if(image.style.opacity <= 0){
      clearInterval(intervalId);
      //画像を交換
      if(flag === true){
        image.src = 'diet_after_man.png';
        flag = false;
      }else{
        image.src = 'diet_before_man.png';
        flag = true;
      }

      opacityInt = image.style.opacity * 100;
      //フェードインの処理（opacityを50ミリ秒ごとに0.05づつ増やす）
      intervalId = setInterval( () => {
        opacityInt = opacityInt + 5;
        image.style.opacity = opacityInt / 100;
        if(image.style.opacity >= 1){
          clearInterval(intervalId);
        }
      }, 50);
    }
  }, 50);
}
