//Printing 6 random ability scores
function rollDice() {
  const dice = [...document.querySelectorAll(".die-list")];
  sides = document.querySelectorAll(".die-item");
  for (let i = counter1; i < counter1 + 6; i++) {
    sides[i].style.opacity = 1;
  }
  for (let i = counter2; i < counter2 + 6; i++) {
    sides[i].style.opacity = 1;
  }
  for (let i = counter3; i < counter3 + 6; i++) {
    sides[i].style.opacity = 1;
  }
  for (let i = counter4; i < counter4 + 6; i++) {
    sides[i].style.opacity = 1;
  }
  for (let i = counter5; i < counter5 + 6; i++) {
    sides[i].style.opacity = 1;
  }
  for (let i = counter6; i < counter6 + 6; i++) {
    sides[i].style.opacity = 1;
  }

  console.log(sides);
  dice.forEach((die) => {
    toggleClasses(die);
    const roll = getRandomNumber(1, 6);
    die.dataset.roll = roll;
    rolls.push(roll);
  });

  console.log(rolls);

  rolls1 = rolls.splice(0, 4);
  console.log(rolls1);

  rolls2 = rolls.splice(0, 4);
  console.log(rolls2);

  rolls3 = rolls.splice(0, 4);
  console.log(rolls3);

  rolls4 = rolls.splice(0, 4);
  console.log(rolls4);

  rolls5 = rolls.splice(0, 4);
  console.log(rolls5);

  rolls6 = rolls.splice(0, 4);
  console.log(rolls6);

  setTimeout(() => {
    counter1 = removeLowestDie(rolls1, 1) * 6;
    for (let i = counter1; i < counter1 + 6; i++) {
      sides[i].style.opacity = 0.1;
    }
    rolls = [];
  }, 2500);
  setTimeout(() => {
    counter2 = removeLowestDie(rolls2, 2) * 6 + 24;
    for (let i = counter2; i < counter2 + 6; i++) {
      sides[i].style.opacity = 0.1;
    }
    rolls = [];
  }, 2500);
  setTimeout(() => {
    counter3 = removeLowestDie(rolls3, 3) * 6 + 48;
    for (let i = counter3; i < counter3 + 6; i++) {
      sides[i].style.opacity = 0.1;
    }
    rolls = [];
  }, 2500);
  setTimeout(() => {
    counter4 = removeLowestDie(rolls4, 4) * 6 + 72;
    for (let i = counter4; i < counter4 + 6; i++) {
      sides[i].style.opacity = 0.1;
    }
    rolls = [];
  }, 2500);
  setTimeout(() => {
    counter5 = removeLowestDie(rolls5, 5) * 6 + 96;
    for (let i = counter5; i < counter5 + 6; i++) {
      sides[i].style.opacity = 0.1;
    }
    rolls = [];
  }, 2500);
  setTimeout(() => {
    counter6 = removeLowestDie(rolls6, 6) * 6 + 120;
    for (let i = counter6; i < counter6 + 6; i++) {
      sides[i].style.opacity = 0.1;
    }
    rolls = [];
  }, 2500);

  console.log(rolls);
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeLowestDie(rollss, position) {
  let lowest = rollss.indexOf(Math.min(...rollss));
  let lowestNum = Math.min(...rollss);
  const reducer = (a, b) => a + b;
  console.log(rollss.reduce(reducer));
  value = rollss.reduce(reducer) - lowestNum;
  document.getElementById(`count${position}`).innerHTML = value;
  return lowest;
}

document.getElementById("roll-button").addEventListener("click", rollDice);

let rolls = [];
let counter1 = 0;
let counter2 = 0;
let counter3 = 0;
let counter4 = 0;
let counter5 = 0;
let counter6 = 0;

//Point buy table

//Tracking the remaining budget
function trackCost(value, pre) {
  let cost = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9,
  };

  budget = budget - (cost[value] - cost[previous[pre]]);
  remaining.value = budget;

  previous[pre] = value;

  // console.log(previous);
  // console.log(cost[value]);
  console.log(budget);
}

let previous = [8, 8, 8, 8, 8, 8];
let remaining = document.getElementById("remaining");
let budget = 27;

//Update resulting ability score in the table
function updateResults(value, row) {
  let table = document.getElementById("point_buy");

  table.rows[row].cells[5].innerHTML =
    parseInt(value, 10) + parseInt(table.rows[row].cells[2].innerHTML, 10);

  changeMods();
}

//Class Choice
let choice = document.getElementById("class");
choice.addEventListener("change", function () {
  let table = document.getElementById("point_buy");

  for (let i = 0; i < 6; i++) {
    table.rows[i + 1].cells[5].innerHTML =
      parseInt(table.rows[i + 1].cells[5].innerHTML, 10) -
      parseInt(table.rows[i + 1].cells[2].innerHTML, 10);

    table.rows[i + 1].cells[2].innerHTML = raceScores[this.value][i];

    table.rows[i + 1].cells[5].innerHTML =
      parseInt(table.rows[i + 1].cells[5].innerHTML, 10) +
      parseInt(table.rows[i + 1].cells[2].innerHTML, 10);
  }

  let chaStat = document.getElementById("6");
  if (choice.value == "human_variant") {
    console.log("yes");
    for (let i = 0; i < 7; i++) {
      table.rows[i].cells[3].style.display = "table-cell";
      chaStat.style.display = "";
    }
  } else if (choice.value == "half_elf") {
    for (let i = 0; i < 7; i++) {
      table.rows[i].cells[3].style.display = "table-cell";
      chaStat.style.display = "none";
    }
  } else {
    for (let i = 0; i < 7; i++) {
      table.rows[i].cells[3].style.display = "";
      chaStat.style.display = "";
    }
  }

  changeMods();
  console.log(this.value);
});

//Random base scores
let random = document.getElementById("random");
random.addEventListener("click", function () {
  let randomPointBuy = [];

  for (let i = 0; i < 6; i++) {
    randomPointBuy.push(Math.floor(Math.random() * 8) + 8);
  }

  base_str.value = randomPointBuy[0];
  updateResults(randomPointBuy[0], 1);
  trackCost(randomPointBuy[0], 0);
  base_dex.value = randomPointBuy[1];
  updateResults(randomPointBuy[1], 2);
  trackCost(randomPointBuy[1], 1);
  base_con.value = randomPointBuy[2];
  updateResults(randomPointBuy[2], 3);
  trackCost(randomPointBuy[2], 2);
  base_int.value = randomPointBuy[3];
  updateResults(randomPointBuy[3], 4);
  trackCost(randomPointBuy[3], 3);
  base_wis.value = randomPointBuy[4];
  updateResults(randomPointBuy[4], 5);
  trackCost(randomPointBuy[4], 4);
  base_cha.value = randomPointBuy[5];
  updateResults(randomPointBuy[5], 6);
  trackCost(randomPointBuy[5], 5);
});

//Updating modifires
function changeMods() {
  let table = document.getElementById("point_buy");

  for (let i = 0; i < 6; i++) {
    if (table.rows[i + 1].cells[5].innerHTML <= 9) {
      table.rows[i + 1].cells[6].innerHTML = "-1";
    } else if (table.rows[i + 1].cells[5].innerHTML <= 11) {
      table.rows[i + 1].cells[6].innerHTML = "+0";
    } else if (table.rows[i + 1].cells[5].innerHTML <= 13) {
      table.rows[i + 1].cells[6].innerHTML = "+1";
    } else if (table.rows[i + 1].cells[5].innerHTML <= 15) {
      table.rows[i + 1].cells[6].innerHTML = "+2";
    } else if (table.rows[i + 1].cells[5].innerHTML <= 17) {
      table.rows[i + 1].cells[6].innerHTML = "+3";
    } else if (table.rows[i + 1].cells[5].innerHTML <= 19) {
      table.rows[i + 1].cells[6].innerHTML = "+4";
    }
  }
}

let raceScores = {
  default: [0, 0, 0, 0, 0, 0],
  dragonborn: [2, 0, 0, 0, 0, 1],
  dwarf_hill: [0, 0, 2, 0, 1, 0],
  dwarf_mountain: [2, 0, 2, 0, 0, 0],
  elf_drow: [0, 2, 0, 0, 0, 1],
  elf_high: [0, 2, 0, 1, 0, 0],
  elf_wood: [0, 2, 0, 0, 1, 0],
  gnome_forest: [0, 1, 0, 2, 0, 0],
  gnome_rock: [0, 0, 1, 2, 0, 0],
  half_elf: [0, 0, 0, 0, 0, 2],
  halfling_lightfoot: [0, 2, 0, 0, 0, 1],
  halfling_stout: [0, 2, 1, 0, 0, 0],
  half_orc: [2, 0, 1, 0, 0, 0],
  human: [1, 1, 1, 1, 1, 1],
  human_variant: [0, 0, 0, 0, 0, 0],
  tiefling: [0, 0, 0, 1, 0, 2],
};

//Resetting table data to default values
let reset = document.getElementById("reset");
reset.addEventListener("click", function () {
  let table = document.getElementById("point_buy");

  base_str.value = 8;
  base_dex.value = 8;
  base_con.value = 8;
  base_int.value = 8;
  base_wis.value = 8;
  base_cha.value = 8;

  choice.value = "default";
  for (let i = 0; i < 6; i++) {
    table.rows[i + 1].cells[2].innerHTML = raceScores[choice.value][i];
  }

  for (let i = 0; i < 7; i++) {
    table.rows[i].cells[3].style.display = "";
  }

  for (let i = 0; i < 6; i++) {
    table.rows[i + 1].cells[5].innerHTML = 8;
  }

  previous = [8, 8, 8, 8, 8, 8];

  budget = 27;
  remaining.value = budget;

  changeMods();
});

//Tacking that no more than two checkboxes are selected
let limit = 2;
$("[type=checkbox]").on("change", function (evt) {
  let table = document.getElementById("point_buy");

  if ($("[type=checkbox]:checked").length > limit) {
    this.checked = false;
  } else if (this.checked) {
    if (this.id == 1) {
      table.rows[1].cells[2].innerHTML = 1;
      updateResults(base_str.value, 1);
    } else if (this.id == 2) {
      table.rows[2].cells[2].innerHTML = 1;
      updateResults(base_dex.value, 2);
    } else if (this.id == 3) {
      table.rows[3].cells[2].innerHTML = 1;
      updateResults(base_con.value, 3);
    } else if (this.id == 4) {
      table.rows[4].cells[2].innerHTML = 1;
      updateResults(base_int.value, 4);
    } else if (this.id == 5) {
      table.rows[5].cells[2].innerHTML = 1;
      updateResults(base_wis.value, 5);
    } else if (this.id == 6) {
      table.rows[6].cells[2].innerHTML = 1;
      updateResults(base_cha.value, 6);
    }
  } else if (!this.checked) {
    if (this.id == 1) {
      table.rows[1].cells[2].innerHTML = 0;
      updateResults(base_str.value, 1);
    } else if (this.id == 2) {
      table.rows[2].cells[2].innerHTML = 0;
      updateResults(base_dex.value, 2);
    } else if (this.id == 3) {
      table.rows[3].cells[2].innerHTML = 0;
      updateResults(base_con.value, 3);
    } else if (this.id == 4) {
      table.rows[4].cells[2].innerHTML = 0;
      updateResults(base_int.value, 4);
    } else if (this.id == 5) {
      table.rows[5].cells[2].innerHTML = 0;
      updateResults(base_wis.value, 5);
    } else if (this.id == 6) {
      table.rows[6].cells[2].innerHTML = 0;
      updateResults(base_cha.value, 6);
    }
  }
});

//#region Tracking value change in base ability scores input fields
let base_str = document.getElementById("base_str");
base_str.addEventListener("input", function () {
  if (parseInt(this.value, 10) <= 15 && parseInt(this.value, 10) >= 8) {
    updateResults(base_str.value, 1);
    trackCost(base_str.value, 0);
  } else if (parseInt(this.value, 10) > 15 || parseInt(this.value, 10) < 8) {
    console.log(this.value);
    this.value = 8;
    updateResults(base_str.value, 1);
    trackCost(base_str.value, 0);
    alert("Используйте как задумано пожалуйста");
  }
});

let base_dex = document.getElementById("base_dex");
base_dex.addEventListener("input", function () {
  if (parseInt(this.value, 10) <= 15 && parseInt(this.value, 10) >= 8) {
    updateResults(base_dex.value, 2);
    trackCost(base_dex.value, 1);
  } else if (parseInt(this.value, 10) > 15 || parseInt(this.value, 10) < 8) {
    this.value = 8;
    updateResults(base_dex.value, 2);
    trackCost(base_dex.value, 1);
    alert("Используйте как задумано пожалуйста");
  }
});

let base_con = document.getElementById("base_con");
base_con.addEventListener("input", function () {
  if (parseInt(this.value, 10) <= 15 && parseInt(this.value, 10) >= 8) {
    updateResults(base_con.value, 3);
    trackCost(base_con.value, 2);
  } else if (parseInt(this.value, 10) > 15 || parseInt(this.value, 10) < 8) {
    this.value = 8;
    updateResults(base_con.value, 3);
    trackCost(base_con.value, 2);
    alert("Используйте как задумано пожалуйста");
  }
});

let base_int = document.getElementById("base_int");
base_int.addEventListener("input", function () {
  if (parseInt(this.value, 10) <= 15 && parseInt(this.value, 10) >= 8) {
    updateResults(base_int.value, 4);
    trackCost(base_int.value, 3);
  } else if (parseInt(this.value, 10) > 15 || parseInt(this.value, 10) < 8) {
    this.value = 8;
    updateResults(base_int.value, 4);
    trackCost(base_int.value, 3);
    alert("Используйте как задумано пожалуйста");
  }
});

let base_wis = document.getElementById("base_wis");
base_wis.addEventListener("input", function () {
  if (parseInt(this.value, 10) <= 15 && parseInt(this.value, 10) >= 8) {
    updateResults(base_wis.value, 5);
    trackCost(base_wis.value, 4);
  } else if (parseInt(this.value, 10) > 15 || parseInt(this.value, 10) < 8) {
    this.value = 8;
    updateResults(base_wis.value, 5);
    trackCost(base_wis.value, 4);
    alert("Используйте как задумано пожалуйста");
  }
});

let base_cha = document.getElementById("base_cha");
base_cha.addEventListener("input", function () {
  if (parseInt(this.value, 10) <= 15 && parseInt(this.value, 10) >= 8) {
    updateResults(base_cha.value, 6);
    trackCost(base_cha.value, 5);
  } else if (parseInt(this.value, 10) > 15 || parseInt(this.value, 10) < 8) {
    this.value = 8;
    updateResults(base_cha.value, 6);
    trackCost(base_cha.value, 5);
    alert("Используйте как задумано пожалуйста");
  }
});
//#endregion
