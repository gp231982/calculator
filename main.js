let currencyInput = document.querySelector(".js-currency__input");
let tableCells = document.querySelectorAll(".table__cell");
let currencyRatioInput = document.querySelector(
  ".js-form__field--currencyRatio"
);
let calculationButton = document.querySelector(".js-form__calculationButton");
let selectFrom = document.querySelector(".js-form__field--currencyFrom");
let selectTo = document.querySelector(".js-form__field--currencyTo");
let result = document.querySelector(".js-form__result");
let resetButton = document.querySelector(".js-form__reset");
let clickedTableCells = [];
let clickedPreviousTableCellsSiblings = [];
let tableCellsArray = [...tableCells];

tableCellsArray.forEach((tableCell) => {
  tableCell.addEventListener("click", (e) => {
    result.innerText = "N/A";

    function currencyAutoSelection() {
      let threeFirstLetters = tableCell.previousElementSibling.innerText.slice(
        0,
        3
      );
      let threeLastLetters =
        tableCell.previousElementSibling.innerText.slice(-3);
      switch (threeFirstLetters) {
        case "EUR":
          selectFrom.value = "EUR";
          break;
        case "USD":
          selectFrom.value = "USD";
          break;
        case "GBP":
          selectFrom.value = "GBP";
          break;
        case "CHF":
          selectFrom.value = "CHF";
          break;
        case "PLN":
          selectFrom.value = "PLN";
          break;
        default:
          break;
      }
      switch (threeLastLetters) {
        case "EUR":
          selectTo.value = "EUR";
          break;
        case "USD":
          selectTo.value = "USD";
          break;
        case "GBP":
          selectTo.value = "GBP";
          break;
        case "CHF":
          selectTo.value = "CHF";
          break;
        case "PLN":
          selectTo.value = "PLN";
          break;
        default:
          break;
      }
    }

    currencyAutoSelection();

    if (+e.target.innerText > 0) {
      currencyRatioInput.value = (+e.target.innerText).toFixed(4);
    }

    if (
      (+tableCell.innerText).toFixed(4) ===
      (+currencyRatioInput.value).toFixed(4)
    ) {
      if (tableCell.classList.contains("table__on")) {
        return;
      }

      if (
        !tableCell.classList.contains("table__on") &&
        !tableCell.previousElementSibling.classList.contains("table__on")
      ) {
        selectFrom.classList.add("table__on");
        selectTo.classList.add("table__on");
        currencyRatioInput.classList.add("table__on");

        clickedTableCells.push(tableCell);
        clickedPreviousTableCellsSiblings.push(
          tableCell.previousElementSibling
        );
        tableCell.classList.add("table__on");
        tableCell.previousElementSibling.classList.add("table__on");
        if (
          clickedTableCells.length === 2 &&
          clickedPreviousTableCellsSiblings.length === 2
        ) {
          clickedTableCells[0].classList.remove("table__on");
          clickedPreviousTableCellsSiblings[0].classList.remove("table__on");
          clickedTableCells.shift();
          clickedPreviousTableCellsSiblings.shift();
        }
      }
    }
  });
});

function currencyInputEvent() {
  if (currencyInput.value < 1) {
    currencyInput.value = "";
  }

  currencyInput.value !== ""
    ? currencyInput.classList.add("table__on")
    : currencyInput.classList.remove("table__on");
}

currencyInput.addEventListener("input", () => {
  currencyInputEvent();
});

function selectFromEvent() {
  tableCellsArray.forEach((tableCell) =>
    tableCell.classList.remove("table__on")
  );

  clickedTableCells.length = 0;
  clickedPreviousTableCellsSiblings.length = 0;

  console.log(selectFrom.value);
  switch (selectFrom.value) {
    case "PLN":
    case "USD":
    case "GBP":
    case "EUR":
    case "CHF":
      selectFrom.classList.add("table__on");
      break;
    case "":
      selectFrom.classList.remove("table__on");
    default:
      break;
  }
  console.log(selectFrom);
}

selectFrom.addEventListener("input", () => {
  selectFromEvent();
});

function selectToEvent() {
  tableCellsArray.forEach((tableCell) =>
    tableCell.classList.remove("table__on")
  );

  clickedTableCells.length = 0;
  clickedPreviousTableCellsSiblings.length = 0;

  switch (selectTo.value) {
    case "PLN":
    case "USD":
    case "GBP":
    case "EUR":
    case "CHF":
      selectTo.classList.add("table__on");
      break;
    case "":
      selectTo.classList.remove("table__on");
    default:
      break;
  }
}

selectTo.addEventListener("input", () => {
  selectToEvent();
});

function currencyRatioInputEvent() {
  tableCellsArray.forEach((tableCell) =>
    tableCell.classList.remove("table__on")
  );

  if (currencyRatioInput.value < "-") {
    currencyRatioInput.value = "";
  }

  clickedTableCells.length = 0;
  clickedPreviousTableCellsSiblings.length = 0;

  currencyRatioInput.value !== ""
    ? currencyRatioInput.classList.add("table__on")
    : currencyRatioInput.classList.remove("table__on");
}

currencyRatioInput.addEventListener("input", () => {
  currencyRatioInputEvent();
});

function formValidationAndResultCalculation() {
  if (
    (selectFrom.value === "" ||
      selectTo.value === "" ||
      currencyInput.value === "" ||
      currencyRatioInput.value === "") &&
    selectFrom.value !== selectTo.value
  ) {
    result.innerText = "Uzupełnij brakujące pola";
  } else if (
    (selectFrom.value === "" ||
      selectTo.value === "" ||
      currencyInput.value === "" ||
      currencyRatioInput.value === "") &&
    selectFrom.value === selectTo.value
  ) {
    result.innerText =
      "Uzupełnij brakujące pola oraz wybierz dwie inne waluty!";
  } else if (selectFrom.value === selectTo.value) {
    result.innerText = "Wybierz dwie inne waluty!";
  } else
    result.innerText = `Wynik: Za ${currencyInput.value} ${
      selectFrom.value
    } kupisz ${(currencyInput.value * currencyRatioInput.value).toFixed(2)} ${
      selectTo.value
    } `;
}

calculationButton.addEventListener("click", (e) => {
  e.preventDefault();
  formValidationAndResultCalculation();
});

const resetFunction = () => {
  currencyInput.classList.remove("table__on");
  selectFrom.classList.remove("table__on");
  selectTo.classList.remove("table__on");
  currencyRatioInput.classList.remove("table__on");

  tableCellsArray.forEach((tableCell) =>
    tableCell.classList.remove("table__on")
  );
};

resetButton.addEventListener("click", () => {
  resetFunction()
});
