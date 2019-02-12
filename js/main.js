window.onload = () => {
    // Condition for memory load
    // Check if memory exist (saveData !== null)
    if (localStorage.getItem('saveData') !== null) {
        // Creation and Init of game
        game = new Game(0);
        // Getting memory then setting it on live memory
        var retrieveData = localStorage.getItem('saveData');
        var getSave = JSON.parse(retrieveData);     
        game.score = getSave.Score;
        game.multiplier.price = getSave.MultiPrice;
        game.multiplier.level = getSave.MultiLevel;
        game.multiplier.increase = getSave.MultiIncrease;
        game.autoclick.price = getSave.AutoPrice;
        game.autoclick.level = getSave.AutoLevel;
        game.autoclick.bps = getSave.AutoBpS;
        game.multiplier.updateAffichageMultiple();
        game.autoclick.updateAffichageAutoclick();
        game.updateAffichageBps(game.autoclick.bps);

    } else {
        // If nothing in memory, start game with score= 0
        game = new Game(0);        
    }

    gameFlow();

    // Main Function 
    function gameFlow(){
        // Displays informations in the buttons when the game starts
        game.checkPrice();
        game.updateAffichageScore(game.score);
        game.multiplier.updateAffichageMultiple();
        game.autoclick.updateAffichageAutoclick();
        
        // Local data automatic save / 1 minute interval

        setInterval(()=>{
            saveGameData();
            game.multiplier.updateAffichageMultiple();
            game.autoclick.updateAffichageAutoclick();
        }, 5000);
        
        // Increase score by bps every second
        setInterval(()=>{
            game.score+=game.autoclick.bps
            game.updateAffichageScore(game.score);
            game.multiplier.updateAffichageMultiple();
            game.autoclick.updateAffichageAutoclick();
        }, 1000);
        
        // Event Listener for click on reset button
        game.resetBtn.addEventListener ("click",() => {
            var x=confirm("Are you sure you want to do this? \nYou'll not be able to get your banana's back ... ever!!")
            if (x==true)    {
                localStorage.clear();
                // Refresh the page locally (if set on true, reload from server)
                document.location.reload(false);
            }else{}
        })

        // Create event listener on click button
        game.clickBtn.addEventListener('click', () => {
            game.increaseScore();
            game.updateAffichageScore(game.score);
            game.checkPrice();
        })
        // Create event listener on multiply button
        multObject = game.multiplier
        game.multBtn.addEventListener("click",() => {
            if (game.isBuyable(game.score,multObject.price) == true) { 
                game.score = game.payForUpgrade(game.score,multObject.price)
                multObject.multFlow()
                game.checkPrice();
                game.updateAffichageScore(game.score);
            }
        })
        // Create event listener on autoclick button
        autoObject = game.autoclick
        game.autoBtn.addEventListener("click",() => {
            if (game.isBuyable(game.score,autoObject.price) == true) { 
                game.score = game.payForUpgrade(game.score,autoObject.price)
                autoObject.autoFlow();
                game.checkPrice();
                game.updateAffichageScore(game.score);
                game.updateAffichageBps(autoObject.bps);
            }
        })

        // Create event listener on bonus button
        bonusObject = game.bonus
        setTimeout(() => {
            bonusObject.showBonusRandom()
            },
            bonusObject.randomTime
        )
        game.bonusBtn.addEventListener("click",() => {
            bonusObject.hideBonus()
            // multObject.updateAffichageMultiple()
            console.log(multObject.increase)
            bonusObject.evolBonusIncrease()
            setTimeout(() => {
                bonusObject.showBonusRandom()
                },
                bonusObject.randomTime
            )
        })
    }

    function Game(score){
        // Properties of the Game - Add buttons from the DOM into props - Creates new objects
        this.clickBtn = document.querySelector('#hClick')
        this.multBtn = document.querySelector('#hMultiplier')
        this.autoBtn = document.querySelector('#hAutoclick')
        this.bonusBtn = document.querySelector('#hBonus')
        this.resetBtn = document.querySelector('#hReset')
        this.score = score
        this.multiplier = new Multiple(20,1,1)
        this.autoclick = new Autoclick(10,1,0)
        this.bonus = new Bonus()
        // Check if possible buy (score > 0)
        // return false if too expensive, true else
        this.isBuyable = function(score,price){
            if ((score - price) < 0) {
                return false;
            } else {
                return true;
            }
        }
        // Update score display on index.html
        this.updateAffichageScore = function (score) {
            document.querySelector('#hScore').innerHTML = `${score.toFixed(0)} banana(s)`
        }
        // Update bps display on index.html
        this.updateAffichageBps = function (bps) {
            document.querySelector('#hPerSecond').innerHTML = `${bps} banana(s)/second`
        }
        // Increase score by multiplier
        this.increaseScore = function(){
            this.score += this.multiplier.increase
        }
        // Decreases user score to pay for an upgrade
        this.payForUpgrade = function(score,price){      
            return (score - price)      
        }
        // Deactivate buttons if the user has not enough points to buy the upgrade
        this.buttonEnableDisable = function(score, price,btnType){
            btn = btnType
            if (game.isBuyable(score,price)){
                btn.disabled=false;
            }else{
                btn.disabled=true;
            }
        }
        // Cycle through each upgrade object and launch the btn_enabler_disabler method
        this.checkPrice = function(){
            game.buttonEnableDisable(game.score,game.multiplier.price,game.multBtn)
            game.buttonEnableDisable(game.score,game.autoclick.price,game.autoBtn) 
        }
    }

    function Multiple(price, level, increase){
        this.price = price;
        this.level = level;
        this.increase = increase;
        // Function called in the game flow - operates all multiplier changes in one go when the user clicks
        this.multFlow = function(){
            this.price = Math.round(this.price+(this.price/3)+(this.price%3));  //x=x+(x/3)+(x%3)
            this.level = this.level+1;
            this.increase = this.increase+1;
            this.updateAffichageMultiple()
        }
        // Update multiple display on index.html
        this.updateAffichageMultiple = function () {
            game.multBtn.innerHTML = 'X' + this.increase.toFixed(2) + ' | ' + this.price.toFixed(2);
        }
    }

    function Autoclick(price, level, bps) {
        this.price = price;
        this.level = level;
        this.bps = bps;
        // Function called in the game flow - operates all autoclick changes in one go when the user clicks
        this.autoFlow = function(){
            this.price = Math.round(this.price+(this.price/3)+(this.price%2));  //x=x+(x/3)+(x%2)
            this.level = this.level+1;
            this.bps = this.bps+1;
            this.updateAffichageAutoclick()
        }
        // Update autoclick display on index.html
        this.updateAffichageAutoclick = function () {
            game.autoBtn.innerHTML = game.autoclick.bps.toFixed(0)+' bananas per second' + ' | ' + game.autoclick.price.toFixed(2);
        }
    }

    function Bonus() {
        this.randomTime = 5000 + Math.floor((Math.random() * 10000) + 1)
        // Function used to increase the score of the multiplier then decrease after X second
        this.evolBonusIncrease = function () {
            multObject.increase *= 5
            game.multiplier.updateAffichageMultiple()
            console.log(multObject.increase)
            setTimeout(() => {
                multObject.increase /= 5
                console.log(multObject.increase)
                game.multiplier.updateAffichageMultiple()
                ;},
                5000
            )
        }
        // Display the bonus button
        this.showBonusRandom = function () {
            game.bonusBtn.style.display = "inline-block"
            this.randomTime = 5000 + Math.floor((Math.random() * 10000) + 1)
        }
        // Hide the bonus button
        this.hideBonus = function () {
            game.bonusBtn.style.display = "none"
        }
    }

    function saveGameData(){
        var saveData = {
            'Score':game.score,
            'MultiPrice':game.multiplier.price,
            'MultiLevel':game.multiplier.level,
            'MultiIncrease':game.multiplier.increase,
            'AutoPrice':game.autoclick.price,
            'AutoLevel':game.autoclick.level,
            'AutoBpS':game.autoclick.bps
        }
        // -> Storage
        localStorage.setItem('saveData', JSON.stringify(saveData));
        console.log(saveData.Score);
    }
}