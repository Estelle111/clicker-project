window.onload = () => {
    // Condition for memory load
    // Check if memory exist (saveData !== null)
    if (localStorage.getItem('saveData') !== null) {
        // Creation and Init of game
        game = new Game(0);
        // Getting memory then setting it on live data's memory
        var retrieveData = localStorage.getItem('saveData');
        var getSave = JSON.parse(retrieveData);     
        game.score = getSave.Score;
        game.multiplier.price = getSave.MultiPrice;
        game.multiplier.level = getSave.MultiLevel;
        game.multiplier.increase = getSave.MultiIncrease;
        game.autoclick.price = getSave.AutoPrice;
        game.autoclick.level = getSave.AutoLevel;
        game.autoclick.bps = getSave.AutoBpS;
        game.autoclick.evol = getSave.AutoEvol;
        game.autoBtn = getSave.autoBtn;
        game.autoclick2.price = getSave.AutoPrice2;
        game.autoclick2.level = getSave.AutoLevel2;
        game.autoclick2.bps = getSave.AutoBpS2;
        game.autoclick2.evol = getSave.AutoEvol2;
        game.autoBtn2 = getSave.AutoDisplayBps2;
        game.multiplier.updateAffichageMultiple();
        game.autoclick.updateAffichageAutoclick();
        game.updateAffichageBps(game.autoclick.bps,game.autoclick2.bps);

    } else {
        // If nothing in memory, start game with score put to 0
        game = new Game(0);        
    }

    gameFlow();

    // Main Function 
    function gameFlow(){
        // Displays informations in the buttons when the game start
        game.checkPrice();
        game.updateAffichageScore(game.score);
        game.multiplier.updateAffichageMultiple();
        game.autoclick.updateAffichageAutoclick();
        game.autoclick2.updateAffichageAutoclick();
        
        // Local data automatic save / 15 seconds interval

        setInterval(()=>{
            saveGameData();
            game.multiplier.updateAffichageMultiple();
            game.autoclick.updateAffichageAutoclick();
            game.autoclick2.updateAffichageAutoclick();
        }, 15000);
        
        // Increase score by bps every second
        setInterval(()=>{
            game.score =game.score + game.autoclick.bps + game.autoclick2.bps
            game.checkPrice();
            game.updateAffichageScore(game.score);
            game.multiplier.updateAffichageMultiple();
            game.autoclick.updateAffichageAutoclick();
            game.autoclick2.updateAffichageAutoclick();
        }, 1000);
        
        // Event Listener for click on reset button
        game.resetBtn.addEventListener ("click",() => {
            var x=confirm("Are you sure you want to do this? \nYou won't be able to get your bananas back ...\n... ever!!")
            if (x==true)    {
                localStorage.clear();
                // Refresh the page locally (if set on true, reload from server)
                document.location.reload(false);
            }else{}
        })

        // Create event listener on click button (the banana)
        game.clickBtn.addEventListener('click', () => {
            game.increaseScore();
            game.updateAffichageScore(game.score);
            game.checkPrice();
        })

        // Create event listener on multiply button (the pack of banana)
        multObject = game.multiplier
        game.grappe.addEventListener("click",() => {
            if (game.isBuyable(game.score,multObject.price) == true) { 
                game.score = game.payForUpgrade(game.score,multObject.price)
                multObject.multFlow()
                game.checkPrice();
                game.updateAffichageScore(game.score);
            }
        })

        // Create event listener on autoclick button
        autoObject = game.autoclick
        game.monkey.addEventListener("click",() => {
            if (game.isBuyable(game.score,autoObject.price) == true) { 
                game.score = game.payForUpgrade(game.score,autoObject.price)
                autoObject.autoFlow();
                game.checkPrice();
                game.updateAffichageScore(game.score);
                game.updateAffichageBps(autoObject.bps,autoObject2.bps);
            }
        })

        // Create event listener on autoclick2 button
        autoObject2 = game.autoclick2
        game.monkey2.addEventListener("click",() => {
            if (game.isBuyable(game.score,autoObject2.price) == true) { 
                game.score = game.payForUpgrade(game.score,autoObject2.price)
                autoObject2.autoFlow();
                game.checkPrice();
                game.updateAffichageScore(game.score);
                game.updateAffichageBps(autoObject.bps,autoObject2.bps);
            }
        })

        // Create event listener on bonus button
        bonusObject = game.bonus
        setTimeout(() => {
            bonusObject.showBonusRandom()
            },
            bonusObject.randomTime()
        )
        game.bonusBtn.addEventListener("click",() => {
            bonusObject.hideBonus()
            bonusObject.defineCoord()
            bonusObject.evolBonusIncrease()
            setTimeout(() => {
                bonusObject.showBonusRandom()
                },
                bonusObject.randomTime()
            )
        })
    }

    function Game(score){
        // Properties of the Game - Add buttons from the DOM into props - Creates new objects
        this.clickBtn = document.querySelector('#hClick')
        this.grappe = document.querySelector('.bananaGrappe')
        this.multBtn = document.querySelector('#hMultiplier')
        this.monkey = document.querySelector('#A1');
        this.monkey2 = document.querySelector('#A2')
        this.autoBtn = document.querySelector('#hAutoclick')
        this.autoBtn2 = document.querySelector('#hAutoclick2')
        this.bonusBtn = document.querySelector('#hBonus')
        this.resetBtn = document.querySelector('#hReset')
        this.score = score
        this.multiplier = new Multiple(50,1,1)
        this.autoclick = new Autoclick(20,1,0,this.autoBtn,1)
        this.autoclick2 = new Autoclick(200,1,0,this.autoBtn2,10)
        this.bonus = new Bonus()
        this.bonus.defineCoord()
        // Check if possible buy (score > 0)
        // return false if too expensive, true else
        this.isBuyable = function(score,price){
            if ((score - price) < 0) {
                return false;
            } else {
                return true;
            }
        }

        // Update score display 
        this.updateAffichageScore = function (score) {
            document.querySelector('#hScore').innerHTML = `${score.toFixed(0)} banana(s)`
        }
        // Update bps display 
        this.updateAffichageBps = function (bps,bps2) {
            var totBps = bps+bps2
            document.querySelector('#hPerSecond').innerHTML = `${totBps} banana(s)/second`
        }
        // Increase score by multiplier
        this.increaseScore = function(){
            this.score += this.multiplier.increase
        }
        // Decreases user score to pay for an upgrade
        this.payForUpgrade = function(score,price){      
            return (score - price)      
        }
        // Deactivate buttons if the user has not enough to buy the upgrade
        this.buttonEnableDisable = function(score, price,btnType){
            if (game.isBuyable(score,price)){
                btnType.disabled=false;
                btnType.classList.remove('grayOut')
            }else{
                btnType.disabled = true;
                btnType.classList.add('grayOut')
            }
        }

        // Cycle through each upgrade object and launch the btn_enabler_disabler method
        this.checkPrice = function(){
            game.buttonEnableDisable(game.score,game.multiplier.price,game.grappe)
            game.buttonEnableDisable(game.score,game.autoclick.price,game.monkey) 
            game.buttonEnableDisable(game.score,game.autoclick2.price,game.monkey2)
        }
        this.updateAffichageAutoclick = function () {
            this.displayBps.innerHTML = this.bps.toFixed(0)+' BPS' + ' | ' + this.price.toFixed(0);
    }
    }

    function Multiple(price, level, increase){
        this.price = price;
        this.level = level;
        this.increase = increase;
        // Function called in the game flow - operates all multiplier changes in one go when the user clicks
        this.multFlow = function(){
            this.price = Math.round(this.price+(this.price/3)+(this.price%3));
            this.level = this.level+1;
            this.increase = this.increase+1;
            this.updateAffichageMultiple()
        }
        // Update multiple display 
        this.updateAffichageMultiple = function () {
            game.multBtn.innerHTML = 'X' + this.increase.toFixed(0) + ' | ' + this.price.toFixed(0);
        }
    }

    function Autoclick(price, level, bps,displayBps,evol) {
        this.price = price;
        this.level = level;
        this.bps = bps;
        this.displayBps = displayBps;
        this.evol=evol;
        // Function called in the game flow - operates all autoclick changes in one go when the user clicks
        this.autoFlow = function(){
            this.price = Math.round(this.price+(this.price/3)+(this.price%2));
            this.level = this.level+1;
            this.bps = this.bps+this.evol;
            this.updateAffichageAutoclick()
        }
        // Update autoclick display 
        this.updateAffichageAutoclick = function () {
            this.displayBps.innerHTML = '+' + this.evol + ' BPS </br>' + this.bps.toFixed(0)+' BPS' + ' | ' + this.price.toFixed(0) + '<img src="./favicon.ico" width="22px"></img>';
            // this.displayBps.innerHTML = '+' + this.evol + ' BPS' + ' | ' + this.price.toFixed(0);
        }
    }

    function Bonus() {
        this.xPos = 100
        this.yPox = 100
        this.getRandomPosition = function() {  
            var x = 1400;
            var y = 600;
            var randomX = Math.floor(Math.random()*x);
            var randomY = Math.floor(Math.random()*y);
            return [randomX,randomY]
        }
        // Part of code for bonus button random location
        this.defineCoord = function() {
            this.btnBonus = document.querySelector('#hBonus')
            this.xPos = this.getRandomPosition()[0]
            this.yPos = this.getRandomPosition()[1]
            this.btnBonus.style.left = this.xPos + 'px'
            this.btnBonus.style.top = this.yPos + 'px'
        }
        
        // Randomize function ranging from 30 to 120 seconds
        this.randomTime = function() {
            totalRandom = 30000 + Math.floor((Math.random() * 90000) + 1)
            return totalRandom
        }
        
        // Function used to increase the score of the multiplier then decrease after 5 second
        this.evolBonusIncrease = function () {
            multObject.increase *= 5
            game.multiplier.updateAffichageMultiple()
            setTimeout(() => {
                multObject.increase /= 5
                game.multiplier.updateAffichageMultiple()
                ;},
                5000
            )
        }
        // Display the bonus button
        this.showBonusRandom = function () {
            game.bonusBtn.style.display = "inline-block"
        }
        // Hide the bonus button
        this.hideBonus = function () {
            game.bonusBtn.style.display = "none"
        }
    }
    // Function made to save every data tied to the game
    function saveGameData(){
        var saveData = {
            'Score':game.score,
            'MultiPrice':game.multiplier.price,
            'MultiLevel':game.multiplier.level,
            'MultiIncrease':game.multiplier.increase,
            'AutoPrice':game.autoclick.price,
            'AutoLevel':game.autoclick.level,
            'AutoBpS':game.autoclick.bps,
            'AutoDisplayBps':game.autoBtn,
            'AutoPrice2':game.autoclick2.price,
            'AutoLevel2':game.autoclick2.level,
            'AutoBpS2':game.autoclick2.bps,
            'AutoDisplayBps2':game.autoBtn2,
            'AutoEvol' :game.autoclick.evol,
            'AutoEvol2' :game.autoclick2.evol
        }
        // Save to Storage
        localStorage.setItem('saveData', JSON.stringify(saveData));
    }
}