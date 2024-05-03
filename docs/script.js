console.log("script loaded");
const paper = document.getElementById("paper");
const rock = document.getElementById("rock");
const scissors = document.getElementById("scissors");
const rules_button = document.getElementById("rules-button");
const rules = document.getElementById("rules");
const selection = document.getElementById("selection");
const selected =  document.getElementById("selected");
const score_ele = document.getElementById("score");

let is_rules_open = false;
let score = 0;
score_ele.innerText = score;

function getHouseSelected(){
    let selected = "";
    const get_random = Math.random() * 3;

    if(get_random <= 1){
        selected = "paper";
    }else if(get_random <=2){
        selected = "scissors";
    }else{
        selected = "rock"
    }

    return selected;
};

function getCard(item, operator){
    return `
                    <div id="${operator}-selected" class="items-container">
                        <p class="font-bold text-medium">${operator === "user" ? "You" : "House"} Picked</p>
                        <div class="items ${item}">
                            <button id="${item}">
                                <div class="image">
                                    <img src="../images/icon-${item}.svg" alt="Scissors" />
                                </div>
                            </button>
                        </div>
                    </div>
    `
}

function isUserWinner(user, house){
    if(user === house){
        return false;
    }else if(user === "paper" && house === "rock"){
        return true;
    }else if(user === "scissors" && house === "paper"){
        return true;
    }else if(user === "rock" && house === "scissors"){
        return true;
    } else{
        return false;
    }
}

function getMiddle(is_winner){
    let winner = `
                    <div class="result">
                        <p class="font-bold text-large">You Win</p>
                        <button id="play-again" class="play-again">
                            Play again
                        </button>
                    </div>
    `
    let looser = `
                    <div class="result">
                        <p class="font-bold text-large">You Lose</p>
                        <button id="play-again" class="play-again">
                            Play again
                        </button>
                    </div>
`
    return is_winner ? winner: looser;
}

rules_button.addEventListener("click", e => {
    rules.setAttribute("style", "transform: translate(-50%, -50%)");
    is_rules_open = true;

    let cross = document.getElementById("cross");
    cross.addEventListener("click", e => {
        rules.setAttribute("style", "transform: translate(-50%, -1500%)");
        is_rules_open = false;
    });
});


document.addEventListener("click", e=>{
        if(!rules.contains(e.target) && !is_rules_open){
            rules.setAttribute("style", "transform: translate(-50%, -1500%)");
            is_rules_open = false;
    }
});


const items = [paper, rock, scissors];

items.forEach(item => {
    item.addEventListener("click", e =>{
        if(is_rules_open) return;
        console.log(item.getAttribute("id"));
        selection.setAttribute("hidden", true);
        const house_selected = getHouseSelected();
        const user_selected = item.getAttribute("id");

        const is_winner = isUserWinner(user_selected, house_selected);

        const middle = getMiddle(is_winner);
        if(is_winner){
            score++;
        };

        selected.innerHTML = getCard(user_selected, "user") + middle + getCard(house_selected, "house");
        score_ele.innerText = score;
        selected.removeAttribute("hidden");
        const play_again = document.getElementById("play-again");

        play_again.addEventListener("click", e => {
            selected.setAttribute("hidden", true);
            selection.removeAttribute("hidden");
        });
    });
});
