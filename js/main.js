window.onload = () => {

    game = new Game(49);
    gameFlow();
    // Main Function 
    function gameFlow(){
        game.updateAffichageScore(game.score);
        game.multiplier.updateAffichageMultiple();
        game.autoclick.updateAffichageAutoclick();
        // Increase score by bps every second
        setInterval(()=>{
            game.score+=game.autoclick.bps
            game.updateAffichageScore(game.score);
        }, 1000);
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
        // Create event listener on autoclick button
        autoObject = game.autoclick
        game.autoBtn.addEventListener("click",() => {
            if (game.isBuyable(game.score,autoObject.price) == true) { 
                game.score = game.payForUpgrade(game.score,autoObject.price)
                autoObject.price = autoObject.evolPrice(autoObject.price)
                autoObject.level = autoObject.evolLevel(autoObject.level)
                autoObject.bps = autoObject.evolBps(autoObject.bps)
                autoObject.updateAffichageAutoclick();
                game.checkPrice();
                game.updateAffichageScore(game.score);
            }
        })

        // Create event listener on bonus button
        bonusObject = game.bonus
        // setInterval(bonusObject.showBonus(), 2000)
        // setInterval(() => {game.bonusBtn.style.display = "inline-block";}, (Math.floor((Math.random() * 10000) + 5000)))
        // setInterval(bonusObject.showBonus(), (Math.floor((Math.random() * 10000) + 5000)))
        game.bonusBtn.addEventListener("click",() => {
            bonusObject.hideBonus()
            console.log(multObject.increase)
            bonusObject.evolBonusIncrease()
        })
        bonusObject.showBonusRandom()
    }
    function Game(score){
        // Adds buttons properties
        this.clickBtn = document.querySelector('#hClick')
        this.multBtn = document.querySelector('#hMultiplier')
        this.autoBtn = document.querySelector('#hAutoclick')
        this.bonusBtn = document.querySelector('#hBonus')
        this.score = score
        this.multiplier = new Multiple(50,1,1)
        this.autoclick = new Autoclick(200,1,0)
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
            if (game.isBuyable(score,price)){
                btn.disabled=false;
            }else{
                btn.disabled=true;
            }
        }
        // Cycle through each upgrade object and launch the btn_enabler_disabler method
        this.checkPrice = function(){
            game.buttonEnableDisable(game.score,multObject.price,game.multBtn)
            // game.uttonEnableDisable(game.score,autoObject.price,game.autoBtn) // PLACEHOLDER ARGUMENTS - CORRECTION NEEDED AFTER CREATING THE AUTOCLICKER
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
        // Function used to increase the score of the multiplier then decrease after X second
        this.evolBonusIncrease = function () {
            multObject.increase *= 5
            console.log(multObject.increase)
            setTimeout(() => {multObject.increase /= 5; console.log(multObject.increase);}, 5000)
        }
        // Display the bonus button
        this.showBonusRandom = function () {
            game.bonusBtn.style.display = "inline-block"
            setTimeout(this.showBonusRandom, Math.floor((Math.random() * 10000) + 5000))
        }
        // Hide the bonus button
        this.hideBonus = function () {
            game.bonusBtn.style.display = "none"
        }
    }

    function Autoclick(price, level, bps) {
        this.price = price;
        this.level = level;
        this.bps = bps;
        // update price autoclick
        this.evolPrice = function(price){
            return price*1.15;
        }
        // update level autoclick (number of time autoclick)
        this.evolLevel = function(level){
            return level+1;
        }
        // update bps (when user buys the upgrade)
        this.evolBps= function(bps){
            return bps+1;
        }
        // Update autoclick display on index.html
        this.updateAffichageAutoclick = function () {
            game.autoBtn.innerHTML = game.autoclick.bps.toFixed(2)+' bananas per second' + ' | ' + game.autoclick.price.toFixed(2);
        }
    }
}