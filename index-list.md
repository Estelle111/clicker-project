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

| Name | Description |
| ---- | ----------- |
| leftColumn | One of the three main divs of the html, contains the info pannel and the multiplier button |
| rope | Visual div created to look like a rope - Children divs also are purely there for styling purpose |
| infos | Div containing the info pannel |
| plank | Div containing the plank texture - Children divs also are purely there for styling purpose |
| small - big | Divs used to set the planks size |
| infoTxt | Div containing the info pannel text |
| mult | Div containing the multiplier pannel |
| multTxt | Div containing the multiplier text and button|
| banana , banana-line, bananaBonus, bananaBonus-line, bananaGrappe | Visual divs looking like a bunch of bananas |
| pointer | Adds a cursor : pointer style rule to the div |
| centralColumn | One of the three main divs, contains the title, the main banana and the bonus button |
| rightColumn | One of the three main divs, contains the autoclick pannel |
| autoplank | Div containing the plank pannel |
| auto1Txt | Div containing the first autoclick element, including its "image" and the text with it |
| monkey | Visual element of the autoclick 1 -- Children divs also are purely there for styling purpose |
| auto2Txt | Div containing the second autoclick element, including its "image and the text with it |
| monkey2 |  Visual element of the autoclick 2 | 
| reset | Reset element placed on the top right corner of the screen |
| plankReset | Visual element of the reset button |
| leaf *SideZindex* | Row of leaves placed on the borders of the screen |

***

## HTML IDs

| Name | Description |
| ---- | ----------- |
| page | contain all html |
| main | contain score / score/sec / click |
| hScore | display score |
| hPerSecond | display score per second |
| hMultiplier | multiplier button |
| TitleFont | Div Containing the title |
| hClick | click button |
| hBonus | Bonus Button |
| A1 | First autoclick div - contains the small monkey head |
| A2 | Sedonc autoclick div - contains de big monkey head |
| supplement | contain multi / autoclickers / bonus |
| hAutoclick | auto clicker button |
| hAutoclick2 | Second autoclicker button |

***

## Objects

| Name | Class | Parent | Children | Description |
| ---- | ----- | ------ | -------- | ----------- |
| game | Game | window | multiplier, autoclick, autoclick2, bonus | Main object, the game itself |
| multiplier | Multiple | game | none | Contains the data allowing us to increase the score multiplier per click |
| autoclick | Autoclick | game | none | Contains the data allowing us to click for us when buying it |
| autoclick2 | Autoclick | game | none | Same as autoclick1 but with properties values changed |
| bonus | Bonus | game | none | Contains the data to setup the random bonus event |
| saveData | none | none | none | Object containing all data stored in localstorage |

***

### Game

#### Properties

| Name | Description |
| ---- | ----------- |
| score | The actual score of the user (used to buy upgrades) |
| clickBtn | Selector of the main click button |
| grappe | Selector of the multiplier icon |
| multBtn | Selector of the multiplier text |
| monkey , monkey2 | Selectors of the autoclicks icons |
| autoBtn , autoBtn2 | Selectors of the autoclick texts |
| bonusBtn | Selector of the bonus button |
| resetBtn | Selector of the reset button |

#### Children

| Name | Arguments | Description |
| ---- | --------- | ----------- |
| multiplier | multPrice , multLevel , increase | The multiplier object |
| autoclick , autoclick2 | price, level , bps displaybps , evol | Autoclicks objects, the arguments are used to differentiate both of them and allow for a more diverse progression curve | 
| bonus | none | Bonus banana popping on the screen to give multiplier x5 during 5seconds |

#### Methods

| Name | Arguments | Return | Description |
| ---- | --------- | ------ | ----------- |
| isBuyable | score , price | boolean | Checks if score > price, returns true if so |
| updateAffichageScore | score | none | changes the inner html to display the user score |
| updateAffichageBps | bps | none | changes the inner html to display the user bps |
| increaseScore | increase | increase | Increases the value of the score when the user clicks |
| payForUpgrade | score , price | (score-price) | Deducts the price of an upgrade off the user score |
| buttonEnableDisable | score, price, btnType | none | Uses the isBuyable method do determine if the user can buy an upgrade a enable/disable the button associated to the upgrade according to the result |
| checkPrice | none | none | Cycle through each upgrade btn and calls buttonEnableDisable |
| updateAffichageAutoclick | none | none | Change the BPS meter in the info pannel |

***

### Multiple

#### Properties

| Name | Description |
| ---- | ----------- |
| price | Price of the upgrade |
| level | Number of increments |
| increase | Actual value of the upgrade |


#### Methods

| Name | Arguments | Return | Description |
| ---- | --------- | ------ | ----------- |
| multFlow | none | none | Changes the object properties when called |

***

### Autoclick

#### Properties

| Name | Description |
| ---- | ----------- |
| price | update price autoclick |
| level | number of time autoclick |
| bps | when user buys the upgrade |
| displayBps | Links to the element of the DOM used for the click eventlistener | 
| evol | Number of bps gained when leveling up the upgrade |

#### Methods

| Name | Arguments | Return | Description |
| ---- | --------- | ------ | ----------- |
| autoFlow | none | none | Changes the objects properties when called |
| updateAffichageAutoclick | none | none | Displays the nubmer of bps gained by the object itself |

### Bonus

#### Properties

| Name | Description |
| ---- | ----------- |
| xPos , yPos | Coordinates of the bonus button |

#### Methods

| Name | Arguments | Return | Description |
| ---- | --------- | ------ | ----------- |
| getRandomPosition  none | \[randomX,randomY\] | Method creating a pair of coordinates contained within the page |
| defineCoord | none | none | Changes the bonus button coordinates |
| randomTime | Creates a number between 30000 and 120001, used in ms to delay the appearing of the bonus button |
| evolBonusIncrease | none | none | Function used to increase the score of the multiplier then decrease after X second |
| showBonusRandom | none | none | Display the bonus button randomly |
| hideBonus | none | none | Hide the bonus button |

### saveData

#### Properties 

The properties names are the same as the ones they get their values of. 
This object is just there to stock data into localstorage.