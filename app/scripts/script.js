const players = {
    "player-1": {},
    "player-2": {}
};

const pokemons = {
    bullbasaur: { name: "Bullbasaur", image: "../assets/bullbasaur.png" },
    pikachu: { name: "Pikachu", image: "../assets/pikachu.png" },
    snorlax: { name: "Snorlax", image: "../assets/snorlax.png" }
};

const validateSelection = (playerId) => {
    const nameInput = document.getElementById(`input-${playerId}`).value.trim();
    const selectedPokemon = document.querySelector(`input[name='${playerId}-character']:checked`);

    if (!nameInput || !selectedPokemon) {
        alert("Debes ingresar tu nombre y seleccionar un Pokémon para continuar.");
        return false;
    }
    
    players[playerId] = {
        name: nameInput,
        pokemon: pokemons[selectedPokemon.value],
        health: 100
    };
    return true;
};

const nextScreen = () => {
    if (!validateSelection("player-1")) return;
    document.getElementById("start-screen-player-1").classList.remove("active");
    document.getElementById("start-screen-player-2").classList.add("active");
};

const startGame = () => {
    if (!validateSelection("player-2")) return;
    
    document.getElementById("start-screen-player-2").classList.remove("active");
    document.getElementById("game-screen").classList.add("active");

    document.getElementById("name-player-1").textContent = players["player-1"].name;
    document.getElementById("pokemon-player-1").textContent = players["player-1"].pokemon.name;
    document.getElementById("health-player-1").textContent = players["player-1"].health;
    
    document.getElementById("name-player-2").textContent = players["player-2"].name;
    document.getElementById("pokemon-player-2").textContent = players["player-2"].pokemon.name;
    document.getElementById("health-player-2").textContent = players["player-2"].health;


    // Agregar imágenes de los Pokémon
    document.getElementById("image-player-1").src = players["player-1"].pokemon.image;
    document.getElementById("image-player-1").alt = players["player-1"].pokemon.name;
    
    document.getElementById("image-player-2").src = players["player-2"].pokemon.image;
    document.getElementById("image-player-2").alt = players["player-2"].pokemon.name;


    turn = 1;
    updateTurnDisplay();
};

let turn = 1;
const updateTurnDisplay = () => {
    document.getElementById("name-player-1").style.backgroundColor = turn === 1 ? "#bee9e8" : "transparent";
    document.getElementById("name-player-1").style.color = turn === 1 ? "black" : "white";
    document.getElementById("name-player-2").style.backgroundColor = turn === 2 ? "#bee9e8" : "transparent";
    document.getElementById("name-player-2").style.color = turn === 2 ? "black" : "white";
};

const attack = () => {
    
    const opponent = turn === 1 ? "player-2" : "player-1";
    
    if (players[opponent].health === 0) return;
    
    const damage = Math.floor(Math.random() * 31);
    players[opponent].health = Math.max(0, players[opponent].health - damage);

    document.getElementById(`health-${opponent}`).textContent = players[opponent].health;
    document.getElementById("log").textContent = `${players[`player-${turn}`].name} hizo ${damage} de daño a ${players[opponent].name}`;
    
    if (players[opponent].health === 0) {
        document.getElementById("log").textContent = `${players[`player-${turn}`].name} ha ganado la batalla!`;
        disableBattleButtons();
    }
    turn = turn === 1 ? 2 : 1;
    updateTurnDisplay();
};

const heal = () => {
    if (players[`player-${turn}`].health === 0) return;

    const healAmount = Math.floor(Math.random() * 21);
    const newHealth = Math.min(100, players[`player-${turn}`].health + healAmount);
    const healedPoints = newHealth - players[`player-${turn}`].health;
    players[`player-${turn}`].health = newHealth;
    
    document.getElementById(`health-player-${turn}`).textContent = players[`player-${turn}`].health;
    document.getElementById("log").textContent = `${players[`player-${turn}`].name} recuperó ${healedPoints} puntos de vida`;

    turn = turn === 1 ? 2 : 1;
    updateTurnDisplay();
};

const disableBattleButtons = () => {
    document.querySelectorAll(".actions button").forEach(button => button.disabled = true);
    document.querySelectorAll(".actions button").forEach(button => button.classList.add("disabled-button"));
};

const reset = () => {
    players["player-1"].health = 100;
    players["player-2"].health = 100;
    document.getElementById("health-player-1").textContent = 100;
    document.getElementById("health-player-2").textContent = 100;
    document.getElementById("log").textContent = "La batalla ha comenzado";
    document.querySelectorAll(".actions button").forEach(button => button.disabled = false);
    document.querySelectorAll(".actions button").forEach(button => button.classList.remove("disabled-button"));
    turn = 1;
    updateTurnDisplay();
};

const exit = () => {
    location.reload();
};
