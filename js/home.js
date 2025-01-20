document.querySelector("#enteranceForm").onsubmit = (e) => {
    e.preventDefault();
    currentUserName = document.querySelector("#name").value;
    location.href = `${document.querySelector("a").href}?currentUserName=${currentUserName}&size=${size}`;
}
let dt=document.querySelector("#details");
const printUsers = (users) => {
    let string = "";
    let br = document.createElement('br');
    users.forEach(val => {
        dt.innerText += `${val.userName}:   Score: ${val.maxScore}, Time: ${val.time} `
        dt.append(br);
    });
    return string;
}
dt.onscroll=()=>{
    dt.style.fontWeight="bolder";
}
document.querySelector("#btnsavedData").onclick = () => {
    users = JSON.parse(localStorage.getItem("users"));
    if(!(!users ||users.length == 0))
        {
            document.querySelector("#details").innerText="";
            printUsers(users);
        }
}
let s= [document.querySelector("#sizeFour"),document.querySelector("#sizeFive"),document.querySelector("#sizeSix")];
s.forEach(element => {
    element.addEventListener("click",(e)=>{
        s.forEach(val => {
            val.classList.remove("currentSize");
        });
        e.currentTarget.classList.add("currentSize");
    })
});
s[0].onclick=()=>size=4;
s[1].onclick=()=>size=5;
s[2].onclick=()=>size=6;