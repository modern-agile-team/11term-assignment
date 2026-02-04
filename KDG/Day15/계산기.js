const inbtn = document.getElementById("in-btn");
const intext1 = () =>document.getElementById("in-text").value;
const intext = intext1; 
const display = document.getElementById("result-display");


const click = () => {
    const userInput = intext();
    const result = calculate(userInput);
    if (result !== undefined) {
    print(result);
}}
const exit = () => alert("계산기를 종료합니다.");

const exitcheck = (exit) => (exit === "exit" ) ? true : false;

const calculate = (userInput) => {
    if (exitcheck(userInput)) {
    exit();
    return;
}

    try {
        const allFunction = new Function("return " + userInput);
        const result = allFunction();
        return result;
    }
    catch (err) {
        return "Error";
    }
}

inbtn.onclick = click;

const A4 = () =>  document.getElementById("result-display");

const print = (intext) => {
    intext === "Error" ? alert("0으로 나눌 수 없습니다") :
    A4().innerText = Number(intext).toFixed(2);
      
}