/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions*/

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (const items of games) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    gameCard.innerHTML = `
        <img class="game-img" src = "${items.img}" />
        <p><b>Name: ${items.name}</b></p>
        <p>${items.description} </p>
        <p>Backers: ${items.backers}</p>
    `;
    gamesContainer.appendChild(gameCard);
  }
}

addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

const contributionsCard = document.getElementById("num-contributions");

let total_contributions = GAMES_JSON.reduce((acc, num) => {
  return acc + num.backers;
}, 0);
const formatted_total = total_contributions.toLocaleString("en-US");
contributionsCard.innerHTML = `${formatted_total}`;

const raisedCard = document.getElementById("total-raised");

let raised = GAMES_JSON.reduce((acc, raise) => {
  return acc + raise.pledged;
}, 0);
const formatted_total_raised = raised.toLocaleString("en-US");
raisedCard.innerHTML = `$${formatted_total_raised}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let total_games = GAMES_JSON.length;
gamesCard.innerHTML = `${total_games}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  let lisOfNotmet = GAMES_JSON.filter((game) => {
    return game.goal > game.pledged;
  });

  addGamesToPage(lisOfNotmet);
}

// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  let listOfYes = GAMES_JSON.filter((game) => {
    return game.goal < game.pledged;
  });

  addGamesToPage(listOfYes);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfun = GAMES_JSON.filter((game) => {
  return game.goal > game.pledged;
});
let unfunlen = unfun.length;
let allgame = GAMES_JSON.length;
let unfungoal = unfun.reduce((acc, game) => {
  return acc + game.goal;
}, 0);
let unfunpledged = unfun.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);

const displayStr = `A total of $${formatted_total_raised} has been raised for ${allgame} games. Currently, ${unfunlen} ${
  unfunlen > 1 ? "games remain" : "game remains"
} unfunded. We need to raise $${unfungoal.toLocaleString(
  "en-US"
)} but we only have $${unfunpledged.toLocaleString(
  "en-US"
)}. We need you to help fund ${
  unfunlen > 1 ? "these amazing games" : "this amazing game"
}!`;

let addedpart = document.createElement("p");
addedpart.innerHTML = displayStr;
descriptionContainer.appendChild(addedpart);
// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

let [top, runner_up, ...rest] = sortedGames;

const [topN, second] = [top, runner_up].map((game) => {
  const p = document.createElement("b");
  p.textContent = game.name;
  return p;
});

firstGameContainer.appendChild(topN);
secondGameContainer.appendChild(second);
// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  deleteChildElements(gamesContainer);
  const query = searchInput.value.toLowerCase();
  const filtered = GAMES_JSON.filter((game) =>
    game.name.toLowerCase().includes(query)
  );
  addGamesToPage(filtered);
});
