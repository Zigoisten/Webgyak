let cellColors = ["", "", "", ""];
let currentColor = "red";

function changeColor(element) {
    const index = element.dataset.index;
    const cell = document.getElementById(`cell-${index}`);

    if (cellColors[index] === "") {
        cell.style.backgroundColor = currentColor;
        cellColors[index] = currentColor;
        currentColor = (currentColor === "red") ? "blue" : "red";
    }
}

function renderMatrix() {
    let content = '';

    for (let i = 0; i < 4; i++) {
        content += `<div id="cell-${i}" class="cell" data-index="${i}" onclick="changeColor(this)"></div>`;
    }

    document.getElementById('matrix-container').innerHTML = content;
}

renderMatrix();