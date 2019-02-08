# Index List

This document is, as expected, the index of our project. It contains lists of names attributed to variables, functions, classes, etc.. used in our project, as well as a short description of their role in our program.

The list is divided into sections, as follow :
* HTML Classes
* HTML IDs
* Objects
* For each object :
  * Properties
  * Children 
  * Methods

## To Sort

***

## HTML Classes

| Name | Location | Description |
| ---- | -------- | ----------- |

***

## HTML IDs

| Name | Location | Description |
| ---- | -------- | ----------- |
| page | index.html | contain all html |
| main | index.html | contain score / score/sec / click |
| hScore | index.html | display score |
| hPerSecond | index.html | display score per second |
| hClick | index.html | click button |
| supplement | index.html | contain multi / autoclickers / bonus |
| hMultiplier | index.html | multiplier button |
| hAutoclick | index.html | auto clicker button |
| hBonus | index.html | bonus button |

***

## Objects

| Name | Class | Parent | Children | Description |
| ---- | ----- | ------ | -------- | ----------- |
| game | Game | window | multiplier | Main object, the game itself |
| multiplier | Multiple | game | none | Contains the data allowing us to increase the score multiplier per click |
| bonus | Bonus | game | none | Contains the data to setup the random bonus event |

***

### Game

#### Properties

| Name | Description |
| ---- | ----------- |
| score | The actual score of the user (used to buy upgrades) |

#### Children

| Name | Arguments | Description |
| ---- | --------- | ----------- |
| multiplier | multPrice , multLevel | The multiplier object |

#### Methods

| Name | Arguments | Return | Description |
| ---- | --------- | ------ | ----------- |
| isBuyable | score , price | boolean | Checks if score > price, returns true if so |
| updateAffichageScore | score | none | changes the inner html to display the user score |
| increaseScore | none | none | Increases the value of the score when the user clicks |

***

### Multiple

#### Properties

| Name | Description |
| ---- | ----------- |
| price | Price of the upgrade |
| level | Number of increments |
| increase | Actual value of the upgrade |

#### Children

| Name | Arguments | Description |
| ---- | --------- | ----------- |


#### Methods

| Name | Arguments | Return | Description |
| ---- | --------- | ------ | ----------- |
| evolPrice | price | newPrice | Function used to increase the price of the update |
| evolLevel | level | newLevel | Function used to increase the level of the multiplier |
| evolIncrease | increase | newIncrease | Function used to increase the score of the multiplier |

### Bonus

#### Properties

| Name | Description |
| ---- | ----------- |

#### Children

| Name | Arguments | Description |
| ---- | --------- | ----------- |


#### Methods

| Name | Arguments | Return | Description |
| ---- | --------- | ------ | ----------- |
| increaseScore | increase | newIncrease | Function used to increase the score of the multiplier |
| showBonus | none | none | Display the bonus button |
| hideBonus | none | none | Hide the bonus button |