'use strict'
// // 1行目に記載している 'use strict' は削除しないでください


// カメラ起動 & ライブ画像表示
function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        document.getElementById('video').srcObject = stream;
        document.getElementById('video').play();
    });
}

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
    context.drawImage(video, 0, 0, canvas.width * scale, canvas.height);
}

const camPowerOn = document.getElementById('camPowerOn');
const capturePic = document.getElementById('capture');
camPowerOn.addEventListener('click', function() {
    startCamera(); // ボタンが押された時にカメラを起動
});
capturePic.addEventListener('click', function() {
    takePicToDietPic(); // カメラが起動した後に写真を撮る処理を実行
});
