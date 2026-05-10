let day = 1;
let money = 100;
let inventory = [];
let fields = {
  field1: null,
  field2: null,
  field3: null,
  field4: null,
  field5: null
};

class Plant {
  constructor(type) {
    this.type = type;
    this.stage = 0; // 0 = semente, 1 = pequena, 2 = média, 3 = grande
    this.watered = false;
  }

  grow() {
    if (this.watered && this.stage < 3) {
      this.stage++;
      this.watered = false;
    }
  }

  harvestValue() {
    switch (this.type) {
      case "milho": return 30;
      case "trigo": return 40;
      case "soja": return 50;
      default: return 10;
    }
  }
}

function updateUI() {
  document.getElementById("day").innerText = `Dia ${day}`;
  document.getElementById("money").innerText = `Dinheiro: $${money}`;
  document.getElementById("inventory").innerText = `Inventário: ${inventory.join(", ") || "Nenhuma semente"}`;
}

function plantSeed() {
  if (inventory.length === 0) {
    document.getElementById("status").innerText = "Você não tem sementes!";
    return;
  }
  let seed = inventory.shift();
  for (let f in fields) {
    if (fields[f] === null) {
      fields[f] = new Plant(seed);
      document.getElementById(f).innerText = `🌱 ${seed}`;
      document.getElementById("status").innerText = `Você plantou ${seed}!`;
      updateUI();
      return;
    }
  }
  document.getElementById("status").innerText = "Todos os campos estão ocupados!";
}

function waterPlants() {
  let watered = false;
  for (let f in fields) {
    if (fields[f] !== null) {
      fields[f].watered = true;
      document.getElementById(f).innerText = `💧 ${fields[f].type}`;
      watered = true;
    }
  }
  document.getElementById("status").innerText = watered ? "Você regou as plantações!" : "Não há plantações para regar!";
}

function harvestPlants() {
  let harvested = false;
  for (let f in fields) {
    if (fields[f] !== null && fields[f].stage === 3) {
      money += fields[f].harvestValue();
      document.getElementById(f).innerText = "";
      fields[f] = null;
      harvested = true;
    }
  }
  document.getElementById("status").innerText = harvested ? "Você colheu e ganhou dinheiro!" : "Não há plantações prontas!";
  updateUI();
}

function nextDay() {
  day++;
  for (let f in fields) {
    if (fields[f] !== null) {
      fields[f].grow();
      let stageIcon = ["🌱", "🌿", "🌾", "🥕"][fields[f].stage];
      document.getElementById(f).innerText = `${stageIcon} ${fields[f].type}`;
    }
  }
  document.getElementById("status").innerText = `Dia ${day} começou!`;
  updateUI();
}

function buySeed(type) {
  let cost = type === "milho" ? 10 : type === "trigo" ? 15 : 20;
  if (money >= cost) {
    money -= cost;
    inventory.push(type);
    document.getElementById("status").innerText = `Você comprou semente de ${type}!`;
  } else {
    document.getElementById("status").innerText = "Dinheiro insuficiente!";
  }
  updateUI();
}

updateUI();
