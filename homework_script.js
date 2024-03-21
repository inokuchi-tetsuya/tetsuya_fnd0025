'use strict'
// // 1行目に記載している 'use strict' は削除しないでください

let camActiveFlag = false;

// カメラ起動 & ライブ画像表示
function startCamera() {
    soundClick();
    navigator.mediaDevices.getUserMedia({ video: true })
    // ビデオストリームを保持する
    .then(function(stream) {
        document.getElementById('video').srcObject = stream;
        document.getElementById('video').play();
    });
    camActiveFlag = true;
}

// 写真を撮影　画像加工　画像表示　
function takePicToDietPic() {
    let video = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    // 現在の体重を取得
    let currentWeight = parseFloat(document.getElementById('currentWeight').value);
    let targetWeight  = parseFloat(document.getElementById('targetWeight' ).value);
    // 目標体重 / 現在の体重 を計算
    let scale = targetWeight / currentWeight;
    // カメラからの映像をキャンバスに描画
    console.log("scale",scale);
    
    soundShow();
    context.drawImage(video, 0, 0, canvas.width * scale, canvas.height);
    // ライブ画像を停止する
    stopCamera();
}


// カメラを停止する
function stopCamera() {
    let video = document.getElementById('video');
    video.pause();
    camActiveFlag = false;
}



// 効果音を再生する関数
function playSound(label) {
    // 効果音ファイルのURLを指定
    const soundUrl = {show: "琴の滑奏.mp3", click: "決定ボタンを押す53.mp3", boo: "ビープ音5.mp3"};
    // Audioオブジェクトを作成
    function playSound() {
        const audio = new Audio(soundUrl[label]);
        // 効果音を再生
        audio.play();
    }
    return playSound;
}

function camActiveJudge() {
    if (camActiveFlag === true) {
        soundClick();
    } else {
        soundBoo();
    }
}

const soundClick = playSound("click");
const soundShow  = playSound("show"); 
const soundBoo  = playSound("boo"); 

const camPowerOn = document.getElementById('camPowerOn');
const capturePic = document.getElementById('capture');
camPowerOn.addEventListener('click', function() {
    startCamera(); // ボタンが押された時にカメラを起動
});
capturePic.addEventListener('click', function() {
    takePicToDietPic(); // カメラが起動した後に写真を撮る処理を実行
});
capturePic.addEventListener('mouseover', camActiveJudge);
