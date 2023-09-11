

// Sample player data
const players = [
    {
    "id": 0,
    "playerName": "Hardik Pandya",
    "from": "MI",
    "price": "6.50 Cr",
    "isPlaying": true,
    "description": "All-rounder"
    },
    {
    "id": 1,
    "playerName": "Virat Kohli",
    "from": "RCB",
    "price": "8.00 Cr",
    "isPlaying": true,
    "description": "Batsman"
    },
    {
    "id": 2,
    "playerName": "Yuvraj Singh",
    "from": "MI",
    "price": "1.00 Cr",
    "isPlaying": false,
    
    "description": "Batsman"
    },
    {
    "id": 3,
    "playerName": "Chris Morris",
    "from": "RR",
    "price": "16.25 Cr",
    "isPlaying": true,
    "description": "All-rounder"
    },
    {
    "id": 4,
    "playerName": "Glenn Maxwell",
    "from": "RCB",
    "price": "14.25",
    "isPlaying": true,
    "description": "All-rounder"
    },
    {
    "id": 5,
    "playerName": "Rohit Sharma",
    "from": "MI",
    "price": "6.50 Cr",
    "isPlaying": true,
    "description": "BatsMan"
    },
    {
    "id": 6,
    "playerName": "Ishan Kishan",
    "from": "MI",
    "price": "2.50 Cr",
    "isPlaying": true,
    "description": "BatsMan"
    }
    ,
    {
    "id": 7,
    "playerName": "Jasprit Bumrah",
    "from": "MI",
    "price": "2.50 Cr",
    "isPlaying": true,
    "description": "BatsMan"
    }
    ,
    {
    "id": 8,
    "playerName": "Siraj",
    "from": "RCB",
    "price": "2.50 Cr",
    "isPlaying": true,
    "description": "BatsMan"
    }
    ,
    {
    "id": 9,
    "playerName": "Sanju Samson",
    "from": "RR",
    "price": "2.50 Cr",
    "isPlaying": true,
    "description": "BatsMan"
    }
    
    
    
];

// Function to display players on the homepage
function displayPlayers(playersData) {
    const playerGrid = document.getElementById('player-grid');

    playerGrid.innerHTML = "";

    playersData.forEach((player) => {
        const playerCard = document.createElement('div');
        playerCard.classList.add('player-card');
        playerCard.innerHTML = `
            <img src="../player-photos/${player.id}.jpg" alt="${player.playerName}">
            <h3>${player.playerName}</h3>
            <p>Team: ${player.from}</p>
            <p>Price: ${player.price}</p>
            <p>Status: ${player.isPlaying ? "Playing" : "On Bench"}</p>
            <p>Role: ${player.description}</p>
        `;
        playerGrid.appendChild(playerCard);
    });
}




// Create an empty object to store team counts
const teamCounts = {};

// Loop through the players and count them by team
for (const player of players) {
    const team = player.from;

    // If the team exists in teamCounts, increment the count, otherwise initialize it to 1
    if (teamCounts.hasOwnProperty(team)) {
        teamCounts[team]++;
    } else {
        teamCounts[team] = 1;
    }
}

// Print the team counts
for (const team in teamCounts) {
    if (teamCounts.hasOwnProperty(team)) {
        const teamCountString = ` ${teamCounts[team]} players`;
        localStorage.setItem(team, teamCountString);
        console.log(teamCountString);
    }
}


// Function to show player details
function showPlayerDetails(playerId) {
    const player = players.find((p) => p.id === playerId);

    if (player) {
        // Populate player details page with data
        document.getElementById('player-name').textContent = player.playerName;
        document.getElementById('player-photo').src = `player-photos/${player.id}.jpg`;
        document.getElementById('player-from').textContent = player.from;
        document.getElementById('player-price').textContent = player.price;
        document.getElementById('player-status').textContent = player.isPlaying ? "Playing" : "On Bench";
        document.getElementById('player-role').textContent = player.description;

        // Redirect to player details page
        window.location.href = 'player-details.html';
    }
}

// Function to search players by team code
function searchPlayers() {
    const teamCodeInput = document.getElementById('team-code-input').value.toUpperCase();
    const filteredPlayers = players.filter((player) => player.from === teamCodeInput);

    if (filteredPlayers.length === 0) {
        alert('No players found for the entered team code.');
    } else {
        // Display the filtered players in the card grid
        displayPlayers(filteredPlayers);
    }
}

// Function to add a new player
function addNewPlayer() {
    const playerNameInput = document.getElementById('player-name-input').value;
    const playerFromInput = document.getElementById('player-from-input').value.toUpperCase();
    const playerPriceInput = document.getElementById('player-price-input').value;
    const isPlayingInput = document.getElementById('is-playing-input').checked;
    const playerDescriptionInput = document.getElementById('player-description-input').value;

    // Generate a unique player ID (in a real app, this should be handled more robustly)
    const playerId = players.length;

    const newPlayer = {
        id: playerId,
        playerName: playerNameInput,
        from: playerFromInput,
        price: playerPriceInput,
        isPlaying: isPlayingInput,
        description: playerDescriptionInput
    };

    players.push(newPlayer);

    // Clear the form
    document.getElementById('add-player-form').reset();

    // Refresh the UI to display the newly added player
    displayPlayers(players);
}

// Initialize the homepage
displayPlayers(players);
