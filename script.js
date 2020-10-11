
let num = 16;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var blackSquares = function (element) {
    return function () {
        element.style.transition = "none";
        let style = element.getAttribute('style');
        let indexMatch = style.indexOf("background-color:");
        let opacity = style.substring(indexMatch + 32, indexMatch + 35);
        if (isNaN(opacity)) {
            opacity = 0.1;
        } else {
            opacity = Number(opacity) + 0.1;
        }
        console.log(opacity);
        element.setAttribute("style", `border:1px solid; background-color: rgba(0,0,0,${opacity})`);
    }
}

var colorSquares = function (element) {
    return function () {
        element.style.transition = "none";
        let red = getRandomInt(0, 255);
        let green = getRandomInt(0, 255);
        let blue = getRandomInt(0, 255);
        element.setAttribute("style", `border:1px solid; background-color: rgba(${red},${green},${blue})`);
    }
}

let functionSelected = blackSquares;

function createGrid(num, functionPass) {

    //selects main element
    const main = document.querySelector('main');
    //create div in body element
    const div = document.createElement('div');
    //set id attribute of div to container
    div.setAttribute('id', 'container');
    div.setAttribute('style', `grid-template-columns: repeat(${num}, 1fr); grid-template-rows: repeat(${num}, 1fr);`);
    //append the child element, #container to the body (this actually creates the #container)
    main.appendChild(div);
    //select #container
    const container = document.querySelector('#container')

    //for every grid, create a div element, set attribute of class to grid-item
    for (let i = 0; i < num * num; i++) {
        const div = document.createElement('div')
        div.setAttribute('class', 'grid-item');
        //Added CSS styling for debugging
        div.setAttribute('style', "border:1px solid");
        //Append child (div) to the parent (container)
        container.appendChild(div)
    }

    const divsList = document.querySelectorAll(".grid-item");

    divsList.forEach(element => {
        element.addEventListener("mouseover", functionPass(element));
    });

}

createGrid(num, functionSelected);

let buttonResize = document.getElementById("resize");
buttonResize.onclick = function () {
    let newSize = prompt("Please enter a new size for the square");
    const div = document.querySelector('#container');
    div.remove('div');
    num = newSize;
    createGrid(num, functionSelected);
    let sizeText = document.getElementById("sizeTxt");
    sizeText.innerHTML = `Size: ${num}x${num} squares`;
}

let buttonReset = document.getElementById("reset");
buttonReset.onclick = function () {
    const div = document.querySelector('#container');
    div.remove('div');
    createGrid(num, functionSelected);
}

let buttonColors = document.getElementById("colors");
buttonColors.onclick = function () {
    const div = document.querySelector('#container');
    div.remove('div');
    functionSelected = colorSquares;
    createGrid(num, functionSelected);
}

let buttonBlack = document.getElementById("black");
buttonBlack.onclick = function () {
    const div = document.querySelector('#container');
    div.remove('div');
    functionSelected = blackSquares;
    createGrid(num, functionSelected);
}

