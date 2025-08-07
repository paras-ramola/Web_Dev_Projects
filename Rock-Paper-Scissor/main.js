let userScore=0;
let compScore=0;

const choices=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg")

const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#comp-score");


const genCompChoice=()=>{
    const options=["rock","paper","scissors"];
    let randIdx=Math.floor(Math.random()*3);
    return options[randIdx];
}

const drawGame=()=>{
    console.log("DRAW!!");
    msg.innerText=`Draw!`;
    msg.style.color="#818589";
}


const showWinner=(userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        console.log("You Win");
        msg.innerText=`You Won!\n ${userChoice} beats ${compChoice}`;
        msg.style.color="green";
    }else{
        compScore++;
        compScorePara.innerText=compScore;
        console.log("You Lose");
        msg.innerText=`You Lose!\n ${compChoice} beats ${userChoice}`;
        msg.style.color="red";
    }
}
const playGame=(userChoice)=>{
    console.log( "User chose",userChoice);
    let compChoice=genCompChoice();
    console.log("Computer chose",compChoice)


    if(userChoice === compChoice){
        drawGame();
    }
    else{
        let userWin=true;
        if(userChoice==="rock"){
            //comp= paper ,scissors
            userWin=compChoice==="paper"?false:true;
        }
        else if(userChoice==="paper"){
            //comp=rock,scissors
            userWin=compChoice==="rock"?true:false;
        }
        else{
            //user=scissors, comp=rock ,paper
            userWin=compChoice==="rock"?false:true;
        }
        showWinner(userWin,userChoice,compChoice);
    }

};

choices.forEach((choice)=>{

    choice.addEventListener("click",()=>{
        let userChoice=choice.getAttribute("id");
        playGame(userChoice);
    })
});