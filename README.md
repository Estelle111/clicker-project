# Clicker Project
Welcome to our Clicker project, **Jungle Banana Jungle**, a game based on Cookie clicker.

## Summary

- [Guide line](#guide-line)
  
- [Tasks assignment](#tasks-assignment)
  
- [Built with](#built-with)
  
- [Workflow](#workflow)
  
- [Sprints](#sprints)
  
- [Challenges](#challenges)
  
- [Known bugs](#known-bugs)
  
- [Commentary](#commentary)
  
- [Authors](#authors)

## Guide line
* Using 
	* camelCase
	* english / explicits names
	* scss
	* functions

* merge request only on **experimental** branch

* Always work with the **[Index-list](./index-list)**
  For each ID, class, function, variable,... creation => add

* Watch the [todo list](https://github.com/Estelle111/clicker-project/projects/1) regularly and modify it if necessary

* To link scss to css use the link **`sh linkScss.sh`** 

* 3 meetings / day

## Tasks assignment
**Scrum master** : **Estelle**
* communication management within the team
* smooth project and timing
* Readme.md

**Product checker** : **Maxime**
* features pusher

**Corrector** : **Alexandre**
* master branch management
* code checking of everyone to improve it as needed

**Testers** : **Matthieu** & **Magid**
* bugs management 
* try to crack the code to check if everything is holding

**Indexer** : **Maxime**
* [Index-list](./index-list) creation and management
 

## Built With
* HTML
* SCSS
* CSS
* Javascript

## Workflow

- We worked on a different branch we named by our respective names.
- With each new feature, or major update done, we have merged our personal branches to the common one, named 'experimental' (usualy 'development'). Conflicts had to be resolved at this time.
- Finally, corrector was checking the code, and merging 'experimental' onto master branch.

<br />

    - master 
      - experimental 
        - alex
        - mat
        - max
        - estel
        - magid

## Sprints
* **Sprint 1**
	* Planning organization. 
	* Roles Distribution.
	* Initialization of repo on github.
	* Basic structure of html, scss and javascript files.
	* JS preparation: 
		* game object constructor and object. 
		* score and multiply properties.
* **Sprint 2**
	* No credit : When you click the button, increase the score property, then display score in the div display.
	* Meter display : Display multiplier counter inside the button.
	* Price display and multiplier : Display multiplier counter inside button. 
	* Price evolution and multiplier : The more you buy multipliers, the more expensive they are.
	* Increase of the score compared to the number of clicks.
	* Prepare and use of the multiplier : Add a button whose identifier is multiply. Create a click counter on this button.The score increase by clicking the button integrates the multiplier value.
	* Purchase of banana (decrease in score)
	* Deduction of the score according to the purchase of bananas

* **Sprint 3**
	* Autoclick : As soon as you have a score of 20, one click is done automatically every second.
	* Purchase autoclick : After a score of 20, the autoclick is no longer automatic, you have to buy it.
	* Disable buttons when there is not enough bananas to buy them.
	* Bonus : Create the bonus button. Adds a method that multiplies by 5 the number of bananas per click then divides it by 5 after 5 seconds.
	* Random time prototype on bonus.
	* Discussion of the css theme.

* **Sprint 4**
	* Layout and design
	* Background
	* Textures of the boards
	* Title
	* Storage score / save

* **Sprint 5**
	* Ropes
	* Reset button
	* Police
	* Autoclick design
	* Multiply design

* **Sprint 6**
	* Create the second object and autoclick button.
	* Design of the autoclick 2
	* Bonus animation
	* Time and appearance random of the bonus
	* Progress Curve
	* Debug JS
	* Correcting the code and adding comments
	* Updated Readme, [Index-list](./index-list) and [Bug-list](./buglist.md).

## Challenges

* **Work with objects** - This was a first time for some of us.

* **The NO-IMAGE rule** - It was a true challenge to achieve our initial visual objective, we tried to create visual elements using HTML and CSS.  

* **Working as a group !** - It required a lot of communication and organization. We also decided to dispatch the tasks as equally as possible in order to let everyone progress and not lean on each person's own proficiency.

## Commentary
If you have any comment, recommendation or advice, please feel free to contact us.

## Authors
* [Alexandre Mondt](https://github.com/Amondt) 
* [Estelle Mol](https://github.com/Estelle111)
* [Magid Jbari Mansori](https://github.com/Quake08)
* [Matthieu Meurant](https://github.com/MazzinWX)
* [Maxime Broodcoorens](https://github.com/Broodco) 

