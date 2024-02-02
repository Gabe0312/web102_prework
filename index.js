/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++){
        const newGames = games[i];

        const Cartridge = document.createElement("div");

        Cartridge.classList.add("game-card");

        Cartridge.innerHTML = `
        <img class = "game-img" src="${newGames.img}" alt="${newGames.name}" 
        <h3>${newGames.name}</h3>
        <p>${newGames.description}</p>
        <p>Pledged: $${newGames.pledged.toLocaleString()}</p>
        <p>Goal: $${newGames.goal.toLocaleString()}</p>
        <p>Backers: ${newGames.backers}</p>
        `;
        gamesContainer.append(Cartridge);
    }


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}
addGamesToPage(GAMES_JSON);

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce( ( backers , games) => {
    return backers + games.backers;

}, 0);
contributionsCard.innerHTML = totalBackers.toLocaleString('en-US');






// set the inner HTML using a template literal and toLocaleString to get a number with commas





// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalAmount = GAMES_JSON.reduce((pledged, games) => {
    return pledged + games.pledged;
}, 0);

raisedCard.innerHTML = "$" + totalAmount.toLocaleString('en-US');
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const gamesNumber = GAMES_JSON.reduce((games) => {
    return GAMES_JSON.length;
}, 0);
gamesCard.innerHTML = gamesNumber.toLocaleString('en-US');


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);


   // const totalAmount = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);

    // use filter() to get a list of games that have not yet met their goal
    let gamesUnreachedGoal = GAMES_JSON.filter((games) =>{
     return games.pledged < games.goal;
    });
    
    


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(gamesUnreachedGoal);
    console.log("Number:",gamesUnreachedGoal.length);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

   // const totalAmount = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);


    // use filter() to get a list of games that have met or exceeded their goal
    let gamesFundedGoal = GAMES_JSON.filter((games) =>{
        return games.pledged >= games.goal
    });
    


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(gamesFundedGoal);
    console.log("Number:",gamesFundedGoal.length);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click", showAllGames)



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
   const unfundedGameSum = GAMES_JSON.filter((games) => games.pledged < games.goal).length;


// create a string that explains the number of unfunded games using the ternary operator
const displayStr = document.createElement('p');
displayStr.innerHTML = `We have raised a total amount of: $${totalAmount.toLocaleString()} for ${gamesNumber} game${gamesNumber !== 1 ? 's' : ''}. Currently, there ${unfundedGameSum === 1 ? 'is' : 'are'} ${unfundedGameSum} unfunded game${unfundedGameSum !== 1 ? 's' : ''}. Please help us finish raising funds for these amazing games!`;


  
 





// create a new DOM element containing the template string and append it to the description container

descriptionContainer.appendChild(displayStr);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const[topGame, secondGame, thirdgame, ...remainingGames] = sortedGames;
    

// create a new element to hold the name of the top pledge game, then append it to the correct element
firstGameContainer.innerHTML = `
<h2>${topGame.name}</h2>
<p>Pledged: $${topGame.pledged.toLocaleString()}</p>
`;

// do the same for the runner up item
secondGameContainer.innerHTML = `
<h2>${secondGame.name}</h2>
<p>Pledged: $${secondGame.pledged.toLocaleString()}</p>
`;

