var messages=["•Traders","•Businesses","•Individuals","•Startups","•Non-Profits"];
var rank=0;

document.getElementById("myTypewriter").addEventListener("webkitAnimationEnd", changeTxt);

document.getElementById("myTypewriter").addEventListener("animationend", changeTxt);

function changeTxt(e){
  _p = this.getElementsByTagName("p")[0];
  _p.style.webkitAnimation = 'none';
   setTimeout(function() {
      _p.innerHTML=messages[rank];
      var speed =3.5*messages[rank].length/20;
      _p.style.webkitAnimation = 'typing '+speed+'s steps(50, end), blink-caret .10s step-end infinite';
      (rank===messages.length-1)?rank=0:rank++;
    }, 1000);
}
