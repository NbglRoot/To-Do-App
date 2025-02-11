// main animation for header and footer
window.addEventListener("load", function () {
    var _a, _b;
    if (document.querySelector("header") !== null &&
        document.querySelector("footer") !== null) {
        sessionStorage.setItem("heading_footer", "displayed");
    }
    if (sessionStorage.getItem("heading_footer")) {
        (_a = document
            .querySelector("header")) === null || _a === void 0 ? void 0 : _a.classList.remove("animate__animated", "animate__fadeInDown", "animate__slower");
        (_b = document
            .querySelector("footer")) === null || _b === void 0 ? void 0 : _b.classList.remove("animate__animated", "animate__fadeInDown", "animate__slower");
    }
});
window.addEventListener("beforeunload", function () {
    sessionStorage.removeItem("heading_footer");
});
// user current date
var displayDate = document.querySelector("#userDate");
var date = new Date();
displayDate.textContent = "".concat(date.getDate(), " / ").concat(date.getMonth(), " / ").concat(date.getFullYear());
// create cards
var inputNewTask = document.querySelector(".create__form > input");
var buttonAddTask = document.querySelector(".create__form > button");
var cardsHolder = document.querySelector(".cards");
buttonAddTask.addEventListener("click", function (e) {
    createCard(inputNewTask.value);
});
// load cards
if (localStorage.getItem("savedTasks")) {
    cardsHolder.innerHTML = localStorage.getItem("savedTasks") || "";
}
// card options
var deleteTask = document.querySelectorAll(".fa-trash");
deleteTask.forEach(function (iconD) {
    iconD.addEventListener("click", function (e) {
        var _a, _b;
        if (confirm("Desea borrar esta tarea?")) {
            var target = e.target;
            if (target) {
                (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.remove();
                localStorage.setItem("savedTasks", cardsHolder.innerHTML);
            }
        }
    });
});
var editTask = document.querySelectorAll(".fa-pen-to-square");
editTask.forEach(function (iconE) {
    iconE.addEventListener("click", function (e) {
        var _a, _b;
        var target = e.target;
        if (target) {
            var desc = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.firstElementChild;
            var newDesc = prompt("Editando tarea...");
            if (newDesc == "" || newDesc == null) {
                alert("No se puede crear una tarea sin descripción");
            }
            else {
                desc.textContent = newDesc;
                localStorage.setItem("savedTasks", cardsHolder.innerHTML);
            }
        }
    });
});
function createCard(descTask) {
    var _a, _b;
    if (descTask == "" || descTask == null) {
        alert("Debe de rellenar la descripción de la nueva tarea.");
    }
    else {
        var newCard = document.createElement("div");
        newCard.classList.add("card");
        var cardDesc = document.createElement("p");
        cardDesc.innerText = descTask;
        var options = document.createElement("div");
        options.classList.add("card__options");
        var deleteCard = document.createElement("p");
        (_a = deleteCard.classList).add.apply(_a, ["fa-solid", "fa-trash"]);
        var editCard = document.createElement("p");
        (_b = editCard.classList).add.apply(_b, ["fa-solid", "fa-pen-to-square"]);
        cardsHolder.append(newCard);
        newCard.append(cardDesc);
        newCard.append(options);
        options.append(deleteCard);
        options.append(editCard);
        localStorage.setItem("savedTasks", cardsHolder.innerHTML);
        location.reload();
    }
}
