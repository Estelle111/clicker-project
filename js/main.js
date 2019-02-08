window.onload = () => {

    game = new Game(49);
    gameFlow();
    // Main Function 
    function gameFlow(){
        // Create event listener on click button
        game.clickBtn.addEventListener('click', () => {
            console.log(game.score)
            game.increaseScore();
            game.updateAffichageScore(game.score);
            game.checkPrice();
        })
        // Create event listener on multiply button
        multObject = game.multiplier
        game.multBtn.addEventListener("click",() => {
            if (game.isBuyable(game.score,multObject.price) == true) { 
                game.score = game.payForUpgrade(game.score,multObject.price)
                multObject.price = multObject.evolPrice(multObject.price)
                multObject.level = multObject.evolLevel(multObject.level)
                multObject.increase = multObject.evolIncrease(multObject.increase)
                multObject.updateAffichageMultiple();
                game.checkPrice();
                game.updateAffichageScore(game.score);
            }
        })
        // Create event listener on bonus button
        bonusObject = game.bonus
        game.bonusBtn.addEventListener("click",() => {
            bonusObject.hideBonus()
            multObject.increase = bonusObject.evolBonusIncrease(multObject.increase)
            console.log(multObject.increase)
            multObject.increase = setTimeout(bonusObject.resetBonusIncrease(multObject.increase), 10000)
            console.log(multObject.increase)
            console.log(bonusObject)
        })
    }
    function Game(score){
        // Adds buttons properties
        this.clickBtn = document.querySelector('#hClick')
        this.multBtn = document.querySelector('#hMultiplier')
        this.autoBtn = document.querySelector('#hAutoclick')
        this.bonusBtn = document.querySelector('#hBonus')
        this.score = score
        this.multiplier = new Multiple(50,1,1)
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
            document.querySelector('#hScore').innerHTML = score.toFixed(2)
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
            if (isBuyable(score,price)){
                btn.disabled=false;
            }else{
                btn.disabled=true;
            }
        }
        // Cycle through each upgrade object and launch the btn_enabler_disabler method
        this.checkPrice = function(){
            buttonEnableDisable(game.score,multObject.price,game.multBtn)
            buttonEnableDisable(game.score,autoObject.price,game.autoBtn) // PLACEHOLDER ARGUMENTS - CORRECTION NEEDED AFTER CREATING THE AUTOCLICKER
        }
    }

    function Multiple(price, level, increase){
        this.price = price;
        this.level = level;
        this.increase = increase;
        // update price multiply
        this.evolPrice = function(price){
            return price*1.15;
        }
        // update level multiply (number of time hit)
        this.evolLevel = function(level){
            return level+1;
        }
        // update increase multiply (used to augment clic score)
        this.evolIncrease = function(increase){
            return increase*1.1
        }
        // Update multiple display on index.html
        this.updateAffichageMultiple = function () {
            game.multBtn.innerHTML = 'X' + this.increase.toFixed(2) + ' | ' + this.price.toFixed(2);
        }
    }

    function Bonus() {
        this.randomTime = Math.floor((Math.random() * 10000) + 1)
        this.evolBonusIncrease = function (increase) {
            return increase*5
        }
        this.resetBonusIncrease = function (increase) {
            return increase/5
        }
        this.showBonus = function () {
            game.bonusBtn.style.display = "inline-block"
        }
        this.hideBonus = function () {
            game.bonusBtn.style.display = "none"
        }
    }
}