var game = new Game(0);

function Game(score){
    this.score = score
    this.multiplier = new Multiple(50,1)
    this.isBuyable = function(score,price){
        return false
    }
    this.increaseScore = function(){}
}

function Multiple(price, level){
    this.price = price
    this.level = level
    this.evolPrice = function(price){
        return price*2
    }
    this.evolLevel = function(level){
        return level*2
    }
}