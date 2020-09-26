const yourCard = [1, 2, 3, 4, 5];
const myCard = [1, 2, 3, 4, 5];

let count=0;

let mySelect = 0;
let yourSelect = 0;

let myScore = 0;
let yourScore = 0;


document.getElementById('idyourCard').value=yourCard.join(',');
document.getElementById('idmyCard').value=myCard.join(',');
document.getElementById('idScore').value=`0 : 0`;


function input () {
    mySelect = document.getElementById('input-box').value
    mySelect = Number(mySelect);
    let Myinclude = myCard.includes(mySelect);
    if(Myinclude == false) {
      alert("남아있는 카드 중에서 숫자를 선택해주세요.");
      return false;
    }
  
    yourSelect = Math.floor(Math.random() * 5) +1;
    yourSelect = Number(yourSelect);

    let Yourinclude = yourCard.includes(yourSelect);
    while(Yourinclude == false){
      yourSelect = Math.floor(Math.random() * 5) +1;
      Yourinclude = yourCard.includes(yourSelect);
    }
  
  if(mySelect==1 && yourSelect==5) {
    myScore++;
  }else if(mySelect==5 && yourSelect==1){
    yourScore++;
  }else if(mySelect > yourSelect) {
    myScore++; 
  }else if(mySelect < yourSelect) {
    yourScore++;   
  }
  
    let pos1 = myCard.indexOf(mySelect);
    let pos2 = yourCard.indexOf(yourSelect);
    myCard.splice(pos1, 1);
    yourCard.splice(pos2, 1);
    
    count++;

    document.getElementById('idyourSelect').value=yourSelect;
    document.getElementById('idmySelect').value=mySelect;
    document.getElementById('idyourCard').value=yourCard.join(',');
    document.getElementById('idmyCard').value=myCard.join(',');
    document.getElementById('idScore').value=`${myScore} : ${yourScore}`;

  if(count == 5){
    if( myScore > yourScore){
      alert("You Win! Zebra!");
    } else if (myScore == yourScore){
      alert("You guys are tied!");
    } else {
      alert("You Loose! Zebra!");
    }
  }
}