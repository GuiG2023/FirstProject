
var errors = 0;
var card_list = [ // create 10 lables for my cards then doule cards, plan to bulid a 4 rows * 5 col board with cards
    "Guiran",
    "ProfessorScott",
    "SF",
    "SFStateGator",
    "StrongGator",
    "ThrontonHall",
    "Humanities",
    "Library",
    "Mashouf",
    "StudentCenter",
]

var cardSet;
var board = [];
var rows = 4;
var cols = 5;

var card1Selected;
var card2Selected;

var oneOrZero;
var countDown = 10;

window.onload = function () {//when we load the whole page window, we call shufflecards() and startgame();
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = card_list.concat(card_list); // double each of cards, so we have 20 total now.
    console.log(cardSet);//print those 20 elements on the console

    //shuffle
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length); // get a random index  1.get num from 0-1, times 20 and floor it to get a integer index
        //swap new j with original [i]  
        //swap two card
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
    console.log(cardSet);
}

function startGame() {
    // board should be 4 * 5 
    for (let i = 0; i < rows; i++) {
        let row = []; // arrange the rows
        for (let j = 0; j < cols; j++) {
            let cardImg = cardSet.pop(); // pop one card from my random cardset each time
            row.push(cardImg); // push one card in to the row[] each time

            // connect imges with the elements in [][]

            //<img>tag created and create different id for each tag
            let card = document.createElement("img")
            card.id = i.toString() + "-" + j.toString(); // we crate id like 0-0, 0-1 ...... "
            card.src = "card/" + cardImg + ".png"
            card.classList.add("card"); // we now have class = "card"  implement CSS 
            card.addEventListener("click", selectCard); // make everycard clickable ,when the card is being click, it going to call selectCard method
            document.getElementById("board").append(card);

            // these will go to html page and add 20 card
        }
        board.push(row);
        setTimeout(hideCard, 5000); // set a timer for 5s that player can see all the cards
    }

    console.log(board);

}

function hideCard() { // set all card at back
    // we have two different card back randomly
    let randomNum = Math.random(); //0-1
    oneOrZero = Math.round(randomNum);

    if (oneOrZero == 1) {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let card = document.getElementById(i.toString() + "-" + j.toString());
                card.src = "card/cardback2.png";
            }
        }
    } else {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let card = document.getElementById(i.toString() + "-" + j.toString());
                card.src = "card/cardback.png";
            }
        }
    }

}

function selectCard() {
    if (this.src.includes("cardback")) {//if the path includes cardback.png keyword then
        if (!card1Selected) {// card 1 is not select

            card1Selected = this; // set this(the card we just click) to card1Selected
            // we split id 0-0 into ["0","0"] strings and store in a new array represent card position.

            let coords = card1Selected.id.split("-");
            let i = parseInt(coords[0]);
            let j = parseInt(coords[1]);

            card1Selected.src = "card/" + board[i][j] + ".png";
        } else if (!card2Selected && this != card1Selected) { // if card 2 is not seclected and not == to card 1
            //apply those above to card2

            card2Selected = this;

            let coords = card2Selected.id.split("-");
            let i = parseInt(coords[0]);
            let j = parseInt(coords[1]);

            card2Selected.src = "card/" + board[i][j] + ".png";
            setTimeout(update, 1000); // we can have 1s to remember what are those 2 cards
        }
    }
}

function update() {
    //if same
    if (card1Selected.src == card2Selected.src) {
        countDown--;
        if (countDown == 0) {
            gameover();
        }
    }

    //if 2 cards are not same, filp those back
    if (card1Selected.src != card2Selected.src) {
        if (oneOrZero == 1) {
            card1Selected.src = "card/cardback2.png";
            card2Selected.src = "card/cardback2.png";
        } else {
            card1Selected.src = "card/cardback.png";
            card2Selected.src = "card/cardback.png";
        }
        errors++;
        document.getElementById("errors").innerText = errors;
    }

    card1Selected = null;
    card2Selected = null;


}

function gameover() { // try to make an end gif
    document.getElementById("ending").classList.remove("hidden");
    document.getElementById("usagileft").src = "usagi.gif";
    document.getElementById("usagiright").src = "usagi.gif";
}

