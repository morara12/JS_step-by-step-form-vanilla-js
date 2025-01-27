// 作者コメントは文に対して上（注意書きあり）
// 自分のは文にたいして下
const previousButton = document.getElementById("previous")
// id=previous previousのボタン(1、2ページ目)
const nextButton = document.getElementById("next")
// id=next nextボタン (1、2ページ目)
const submitButton = document.getElementById('validate')
// id=validate　submitボタン(3P)検証用
const form = document.getElementById('stepByStepForm')
// id =stepByStepForm 作っているところ全体
const dots = document.getElementsByClassName('progress-bar__dot')
// id ＝progress-bar__dot　プログレスバー＝長時間かかるタスクの進捗状況がどの程度完了したのかを視覚的・直感的に表示するもの
const numberOfSteps = 3
let currentStep = 1

for(let i = 0 ; i < dots.length ; ++i){
   dots[i].addEventListener('click', ()=>{
     goToStep(i+1) 
   })
}
// progress-bar__dot＝3つあり
// 〇の進行ゲージをクリックするとが該当のところにとばす
previousButton.onclick = goPrevious
nextButton.onclick = goNext
// onclick…ユーザーが要素をクリックした際に起動する処理を指定するイベント属性

function goNext(e) {
   e.preventDefault()
   currentStep += 1
   goToStep(currentStep)
}
// currentStep += 1⇒1+1=2
// event.preventDefaultmigi⇒フォームが持つデフォルトの動作とは、フォームの内容を指定したURLへ送信する⇒このデフォルトの動作をキャンセルする
// 現在のURLに対してフォームの送信が行われると、結果的にページがリロードされてしまいます。 
// そのため、event.preventDefault()を呼び出し、デフォルトの動作をキャンセルしていました。
//  event.preventDefault()をコメントアウトすると、ページがリロードされてしまうことが確認できます。
function goPrevious(e) {
   e.preventDefault()
   currentStep -= 1
   goToStep(currentStep)
}

function goToStep(stepNumber){   
   currentStep = stepNumber
   // currentStep ＝1
   let inputsToHide = document.getElementsByClassName('step')
   // 任意のクラス名が付与されているHTML要素をすべて抽出できる
   let inputs = document.getElementsByClassName(`step${currentStep}`)
   // step
   let indicators = document.getElementsByClassName('progress-bar__dot')
   // progress-bar__dot = 3つあり
   for(let i = indicators.length-1; i >= currentStep ; --i){
      indicators[i].classList.remove('full')
   }
   // indicators＝progress-bar__dotの配列3つ-1＝2
   for(let i = 0; i < currentStep; ++i){
      indicators[i].classList.add('full')
   }
   // fullで進捗ゲージがわかるようにしている

   //※hide all input（作成者コメント↓）
   for (let i = 0; i < inputsToHide.length; ++i) {
      hide(inputsToHide[i])
   }
   // inputsToHide=step=５つ
   // hide…特定のHTML要素を非表示

   //※only show the right one（作成者コメント↓）
   for (let i = 0; i < inputs.length; ++i) {
      show(inputs[i])
   }
   
   //※if we reached final step（作成者コメント↓最終ステップに到達した場合）
   if(currentStep === numberOfSteps){
      enable(previousButton)
      disable(nextButton)
      show(submitButton)
   }


   //※else if first step（作成者コメント↓）
   else if(currentStep === 1){
     disable(previousButton)
      enable(next)
      hide(submitButton)
   }
   
   else {
      enable(previousButton)
      enable(next)
      hide(submitButton)
   }
}

function enable(elem) {
   elem.classList.remove("disabled");
   elem.disabled = false;
}
// 無効を解除＝ボタンを押せる

function disable(elem) {
   elem.classList.add("disabled");
   elem.disabled = true;
}
// 無効が有効＝ボタンが押せない
function show(elem){
   elem.classList.remove('hidden')
}
// 表示する必要があるところを表示するために追加
function hide(elem){
   elem.classList.add('hidden')
}
// 表示する必要のないところを消すために追加