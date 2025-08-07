let boxes=document.querySelectorAll(".box")
let resetBtn=document.querySelector("#reset-btn")
let newBtn=document.querySelector("#newBtn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg")
let turn=true;// is it X turn or Y (X-true,Y-False)

const winPattern=[
[0,1,2],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[2,4,6],
[3,4,5],
[6,7,8]
];

let count=0;//no of time button is clicked (total no of filled boxes)

boxes.forEach((box)=> {
    //apply event to each box

    box.addEventListener("click",()=>{
        console.log("button was clicked");
        count++;
        if(turn){
            box.style.color = "red";
            box.innerText = "X";
            turn = false;
        }else{
            box.style.color = "blue";
            box.innerText = "O";
            turn=true;
        }
        box.disabled=true;//after a box is clicked(X or O is entered) it cant be changed/clicked again

        checkWinner();//check winner after every click

        });
});

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulation! Winner is ${winner} `;
    msgContainer.classList.remove("hide");//show the msg (present inside msgContainer)
    disableBoxes();//cant enter (x or 0) after game is Over->Won
}


const checkWinner=()=>{
    let win=false;
for(let pattern of winPattern){//check all winning pattern
    let posVal1=boxes[pattern[0]].innerText
    let posVal2=boxes[pattern[1]].innerText
    let posVal3=boxes[pattern[2]].innerText
   
    
    if(posVal1!="" && posVal2!="" && posVal3!=""){//Matching boxes should not be empty
        if(posVal1==posVal2 && posVal2==posVal3){
            win=true;
            console.log("Winner");
            showWinner(posVal1);//posVal1 will be the winner
        }
    }
}

if(count==9 && win==false){//if all boxes are filled(count =9) and no winn pattern
    msg.innerText=`Game is a Draw`;
    msgContainer.classList.remove("hide");
}
}

const resetGame=()=>{
    turn=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");

}

newBtn.addEventListener("click",resetGame)
resetBtn.addEventListener("click",resetGame)