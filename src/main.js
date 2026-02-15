const inputArea = document.querySelector(".large-area--input");
const outputArea = document.querySelector(".large-area--output");
const btnFormat = document.querySelector(".controls__button--format");
const btnMinify = document.querySelector(".controls__button--minify");
const historyContainer = document.getElementById('history');

let counter = 1;

document.addEventListener("DOMContentLoaded", () => {
    historyContainer.innerHTML = "";
});


btnFormat.addEventListener("click", () => {
    if (!inputArea.value.trim()) {
        sendAlert("Preencha o campo com o JSON", "warning");
        return;
    }
    try {
        const formatted = JSON.stringify(JSON.parse(inputArea.value), null, 4);

        outputArea.value = formatted;

        addHistory(formatted);
    } 
    catch (ex) {
        sendAlert("JSON Inválido! --> " + ex.message, "error");
    }
});

btnMinify.addEventListener("click", () => {
    if (!inputArea.value.trim()) return;
    try {
        const minified = JSON.stringify(JSON.parse(inputArea.value));
        outputArea.value = minified;
        addHistory(minified);
    } catch (ex) {
        sendAlert("JSON Inválido! --> " + ex.message, "error");
    }
});

function copyToClipboard(id) {
    const textToCopy = document.getElementById("hist-" + id).value;
    navigator.clipboard.writeText(textToCopy).then(() => {
        sendAlert("Copiado com sucesso!", "success");
    });
}

function addHistory(content) {
    const historyItem = `
        <div class="history-card">
            <div class="history-header">
                <label class="historyLabel">Item #${counter}</label>
                <button class="copyButton" onclick="copyToClipboard(${counter}, this)">Copiar</button>
            </div>
            <div class="code-wrapper">
                <textarea readonly class="large-area" id="hist-${counter}">${content}</textarea>
            </div>
        </div>
    `;
    historyContainer.insertAdjacentHTML('afterbegin', historyItem);
    counter++;
}

function sendAlert(message, icon) {
    Swal.fire({
        position: "top",
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: '#2c2c2c',
        color: '#ffffff',      
        iconColor: '#6699ff'
    });
}