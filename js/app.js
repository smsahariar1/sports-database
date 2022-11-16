const loadPlayer = (search) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlayer(data.player));
};

const displayPlayer = (players) => {
  const playerContainer = document.getElementById("player-container");
  playerContainer.innerHTML = "";
  players.forEach((player) => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("col");
    playerDiv.innerHTML = `
    <div class="card h-100">
    <img src="${player.strThumb}" class="card-img-top" alt="Picture of ${player.strPlayer}">
    <div class="card-body" onclick="loadPlayerDetail(${player.idPlayer})">
      <h5 class="card-title">${player.strPlayer}</h5>
      <p class="card-text">Date of Birth: ${player.dateBorn}</p>
      <p class="card-text">Nationality: ${player.strNationality}</p>
      <p class="card-text">Birth Location: ${player.strBirthLocation}</p>
      <p class="card-text">Gender: ${player.strGender}</p>
      <p class="card-text">Height: ${player.strHeight}</p>
      <p class="card-text">Weight: ${player.strWeight}</p>
      <p class="card-text">Sport: ${player.strSport}</p>
      <p class="card-text">Team: ${player.strTeam}</p>
      <p class="card-text">Date of Contract Sign: ${player.dateSigned}</p>
      <p class="card-text">Position: ${player.strPosition}</p>
      <p class="card-text">Activity Status: ${player.strStatus}</p>
      <a href="https://${player.strFacebook}" target="_blank">Facebook</a>
      <a href="https://${player.strTwitter}" target="_blank">Twitter</a>
      <a href="https://${player.strInstagram}" target="_blank">Instagram</a>
    </div>
  </div>
    `;
    playerContainer.appendChild(playerDiv);
  });
};

const searchPlayer = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPlayer(searchText);
  searchField.value = "";
};

const loadPlayerDetail = (idPlayer) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${idPlayer}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlayerDetails(data.players[0]));
};

const displayPlayerDetails = (player) => {
  const detailContainer = document.getElementById("detail-container");
  detailContainer.innerHTML = "";
  const detailDiv = document.createElement("div");
  detailDiv.classList.add("card");
  detailDiv.innerHTML = `
  <img src="${player.strFanart1}" class="card-img-top" alt="Picture of ${player.strPlayer}">
  <div class="card-body">
    <h5 class="card-title">${player.strPlayer}</h5>
    <p class="card-text">${player.strDescriptionEN}</p>
  </div>
  `;
  detailContainer.appendChild(detailDiv);
};

loadPlayer("");
