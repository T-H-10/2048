let size =5;
let board=[];
const createNum=(num, color)=>{
    return{num,
    color}
}
const numbers=[
    createNum(0, "rgba(238, 228, 218, 0.35)"),
    createNum(2,"#eee4da"),
    createNum(4,"#ede0c8"),
    createNum(8,"#f2b179"),
    createNum(16,"#f59563"),
    createNum(32,"#f59563"),
    createNum(64,"#f65e3b"),
    createNum(128,"#edcf72"),
    createNum(256,"#edcc61"),
    createNum(512,"#edc850"),
    createNum(1024,"#edc53f"),
    createNum(2048,"#edc22e"),
    createNum(4096,"#3c3a32"),
    createNum(8192,"#3c3a32")
]
let helpMat=[];
let max=0;
let isChanged=false;
let isEndGame=false;
let time=0
let sumScore=0;
let users=[];
let userObj = {
    userName: "",
    maxScore: 0,
    time: "0:0:0"
};
let currentUserName="";
let isWon=false
let isAbleToMove=true;
let fontsize;
