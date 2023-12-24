const inputArea = document.querySelector(".large-area--input");
const outputArea = document.querySelector(".large-area--output");
const btnFormat = document.querySelector(".controls__button--format");
const btnMinify = document.querySelector(".controls__button--minify");
const btnCopy = document.getElementsByClassName(".copyButton")
const historyhtml = "<div><label for='#counter' class='historyLabel'>#counter</label><textarea readonly class='large-area large-area--output' id='#counter'>output</textarea><button class='copyButton' onclick='copy(counter)'>Copiar</button></div>"
let counter = 1;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('history').innerHtml = "";
});


btnFormat.addEventListener("click", () => {
    if (inputArea.value == "") {
        alert("Preencha o campo com o JSON");
        return;
    }
    try {
        const formatted = JSON.stringify(JSON.parse(inputArea.value), null, 4);

        outputArea.value = formatted;

        addHistory(formatted);
    }
    catch (ex) {
        alert("Ocorreu um erro! --> " + ex);
    }
});

btnMinify.addEventListener("click", () => {
    try {
        const minified = JSON.stringify(JSON.parse(inputArea.value));

        outputArea.value = minified;

        addHistory(minified);
    }
    catch (ex) {
        alert("Ocorreu um erro! --> " + ex);
    }
});

function copy(id) {
    navigator.clipboard.writeText(document.getElementById("#" + id).value);
    alert("Copiado com sucesso!")
}

function addHistory(formatted) {
    let html = historyhtml
    html = html.replaceAll("output", formatted);
    html = html.replaceAll("counter", counter)

    document.getElementById('history').insertAdjacentHTML('afterbegin', html);
    counter++;
}
