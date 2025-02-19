// main animation for header and footer
if (sessionStorage.getItem("heading_footer")) {
  document
    .querySelector("header")
    ?.classList.remove(
      "animate__animated",
      "animate__fadeInDown",
      "animate__slower"
    );
  document
    .querySelector("footer")
    ?.classList.remove(
      "animate__animated",
      "animate__fadeInDown",
      "animate__slower"
    );
} else {
}
window.addEventListener("load", () => {
  if (
    document.querySelector("header") !== null &&
    document.querySelector("footer") !== null
  ) {
    sessionStorage.setItem("heading_footer", "displayed");
  }
});
window.addEventListener("beforeunload", (e) => {
  localStorage.setItem("savedTasks", cardsHolder.innerHTML);
});

// user current date
const displayDate = document.querySelector("#userDate") as HTMLParagraphElement;
const date: Date = new Date();
displayDate.textContent = `${date.getDate()} / ${
  date.getMonth() + 1
} / ${date.getFullYear()}`;

// create cards
const inputNewTask = document.querySelector(
  ".create__form > input"
) as HTMLInputElement;
const buttonAddTask = document.querySelector(
  ".create__form > button"
) as HTMLButtonElement;
const cardsHolder = document.querySelector(".cards") as HTMLDivElement;

buttonAddTask.addEventListener("click", (e) => {
  createCard(inputNewTask.value);
});

// load cards
if (localStorage.getItem("savedTasks")) {
  cardsHolder.innerHTML = localStorage.getItem("savedTasks") || "";
}

// card options
const deleteTask = document.querySelectorAll(".fa-trash")!;
deleteTask.forEach((iconD) => {
  iconD.addEventListener("click", (e) => {
    if (confirm("Desea borrar esta tarea?")) {
      const target = e.target as HTMLElement;
      if (target) {
        target.parentElement?.parentElement?.remove();
        localStorage.setItem("savedTasks", cardsHolder.innerHTML);
      }
    }
  });
});
const editTask = document.querySelectorAll(".fa-pen-to-square");
editTask.forEach((iconE) => {
  iconE.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target) {
      const desc = target.parentElement?.parentElement
        ?.firstElementChild as HTMLElement;
      let newDesc = prompt("Editando tarea...");
      if (newDesc == "" || newDesc == null) {
        alert("No se puede crear una tarea sin descripción");
      } else {
        desc.textContent = newDesc;
        localStorage.setItem("savedTasks", cardsHolder.innerHTML);
      }
    }
  });
});
const paraHTML = document.querySelectorAll(
  ".card"
) as NodeListOf<HTMLDivElement>;
paraHTML.forEach((p: HTMLDivElement) => {
  p.addEventListener("click", (e) => {
    const target = e.target as HTMLDivElement;
    target.firstElementChild?.classList.toggle("finished");
  });
});

function createCard(descTask: string): void {
  if (descTask == "" || descTask == null) {
    alert("Debe de rellenar la descripción de la nueva tarea.");
  } else {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    const cardDesc = document.createElement("p");
    cardDesc.innerText = descTask;
    cardDesc.classList.add("not__finished");
    const options = document.createElement("div");
    options.classList.add("card__options");
    const deleteCard = document.createElement("p");
    deleteCard.classList.add(...["fa-solid", "fa-trash"]);
    const editCard = document.createElement("p");
    editCard.classList.add(...["fa-solid", "fa-pen-to-square"]);
    cardsHolder.append(newCard);
    newCard.append(cardDesc);
    newCard.append(options);
    options.append(deleteCard);
    options.append(editCard);
    localStorage.setItem("savedTasks", cardsHolder.innerHTML);
    location.reload();
  }
}
