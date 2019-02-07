# Index List

This document is, as expected, the index of our project. It contains lists of names attributed to variables, functions, classes, etc.. used in our project, as well as a short description of their role in our program.

The list is divided into sections, as follow :
* HTML Classes
* HTML IDs
* Objects
* For each object :
* * Properties
* * Children 
* * Methods

## To Sort


## HTML Classes

| Name | Location | Description |
| ---- | -------- | ----------- |

## HTML IDs

| Name | Location | Description |
| ---- | -------- | ----------- |
| score | index.html | Display score in html |

## Objects

| Name | Class | Parent | Children | Description |
| ---- | ----- | ------ | -------- | ----------- |
| game | Game | window | multiplier | Main object, the game itself |
| multiplier | Multiple | game | none | Contains the data allowing us to increase the score multiplier per click |

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
| increaseScore | | | Increases the value of the score when the user clicks |

### Multiple

#### Properties

| Name | Description |
| ---- | ----------- |
| price | Price of the upgrade |
| level | Actual value of the upgrade |

#### Children

| Name | Arguments | Description |
| ---- | --------- | ----------- |


#### Methods

| Name | Arguments | Return | Description |
| ---- | --------- | ------ | ----------- |
| evolPrice | price | newPrice | Function used to increase the price of the update |
| evolLevel | level | newLevel | Function used to increase the level of the multiplier |