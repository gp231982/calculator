{
  const currencyInput = document.querySelector(".js-currency__input");
  const tableCells = document.querySelectorAll(".table__cell");
  const currencyRatioInput = document.querySelector(
    ".js-form__field--currencyRatio"
  );
  const calculationButton = document.querySelector(
    ".js-form__calculationButton"
  );
  const selectFrom = document.querySelector(".js-form__field--currencyFrom");
  const selectTo = document.querySelector(".js-form__field--currencyTo");
  const result = document.querySelector(".js-form__result");
  const resetButton = document.querySelector(".js-form__reset");
  const tableCellsArray = [...tableCells];
  const form = document.querySelector(".js-form");

  const resetFunction = () => {
    currencyInput.classList.remove("active");
    selectFrom.classList.remove("active");
    selectTo.classList.remove("active");
    currencyRatioInput.classList.remove("active");
    tableCellsArray.forEach((tableCell) =>
      tableCell.classList.remove("active")
    );
    calculationButton.classList.add("form__calculationButton--disabled");
    result.innerText = "Wynik:";
  };

  const currencyAutoSelection = (tableCell) => {
    const threeFirstLetters = tableCell.previousElementSibling.innerText.slice(
      0,
      3
    );
    const threeLastLetters =
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
  };

  const activateTableCells = () => {
    if (
      selectFrom.value &&
      selectTo.value &&
      selectFrom.value !== selectTo.value
    ) {
      const combinedValues = `${selectFrom.value}/${selectTo.value}`;
      const filteredCell = tableCellsArray.filter((tableCell) => {
        return tableCell.innerText === combinedValues;
      });
      if (combinedValues === filteredCell[0].innerText) {
        filteredCell[0].classList.add("active");
        filteredCell[0].nextElementSibling.classList.add("active");
      }

      currencyRatioInput.value = filteredCell[0].nextElementSibling.innerText;
      currencyRatioInput.classList.add("active");
    } else if (
      selectFrom.value &&
      selectTo.value &&
      selectFrom.value === selectTo.value
    ) {
      const fixedValue = 1;
      currencyRatioInput.value = fixedValue.toFixed(4);
      currencyRatioInput.classList.add("active");
    }
  };

  const validateCalculationButton = () => {
    if (
      currencyInput.value &&
      selectFrom.value &&
      selectTo.value &&
      currencyRatioInput.value
    ) {
      calculationButton.classList.remove("form__calculationButton--disabled");
    } else if (
      !currencyInput.value ||
      !selectFrom.value ||
      !selectTo.value ||
      !currencyRatioInput.value
    ) {
      calculationButton.classList.add("form__calculationButton--disabled");
    }
  };

  const resetTableCellsArray = () => {
    tableCellsArray.forEach((tableCell) =>
      tableCell.classList.remove("active")
    );
  };

  const currencyInputEvent = () => {
    if (currencyInput.value < 1) {
      currencyInput.value = "";
    }
    currencyInput.value !== ""
      ? currencyInput.classList.add("active")
      : currencyInput.classList.remove("active");
  };

  const activateSelectFrom = () => {
    switch (selectFrom.value) {
      case "PLN":
      case "USD":
      case "GBP":
      case "EUR":
      case "CHF":
        selectFrom.classList.add("active");
        break;
      case "":
        selectFrom.classList.remove("active");
      default:
        break;
    }
  };

  const activateSelectTo = () => {
    switch (selectTo.value) {
      case "PLN":
      case "USD":
      case "GBP":
      case "EUR":
      case "CHF":
        selectTo.classList.add("active");
        break;
      case "":
        selectTo.classList.remove("active");
      default:
        break;
    }
  };

  const selectFromEvent = () => {
    resetTableCellsArray();
    activateSelectFrom();
  };

  const selectToEvent = () => {
    resetTableCellsArray();
    activateSelectTo();
  };

  const calculateResult = () => {
    return (currencyInput.value * currencyRatioInput.value).toFixed(2);
  };

  const presentResult = () => {
    result.innerText = `Wynik: Za ${currencyInput.value} ${
      selectFrom.value
    } kupisz ${calculateResult()} ${selectTo.value} `;
  };

  tableCellsArray.forEach((tableCell) => {
    tableCell.addEventListener("click", (e) => {
      if (isNaN(+tableCell.innerText)) return;
      currencyAutoSelection(tableCell);
      currencyRatioInput.value = (+e.target.innerText).toFixed(4);
      resetFunction();
      validateCalculationButton();
      selectFrom.classList.add("active");
      selectTo.classList.add("active");
      currencyRatioInput.classList.add("active");
      tableCell.classList.add("active");
      tableCell.previousElementSibling.classList.add("active");
      if (currencyInput.value) {
        currencyInput.classList.add("active");
      }
    });
  });

  currencyInput.addEventListener("input", currencyInputEvent);

  selectFrom.addEventListener("input", selectFromEvent);

  selectTo.addEventListener("input", selectToEvent);

  calculationButton.addEventListener("click", (e) => {
    e.preventDefault();
    presentResult();
  });

  resetButton.addEventListener("click", resetFunction);

  form.addEventListener("input", () => {
    activateTableCells();
    validateCalculationButton();
  });
}
