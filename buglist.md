#A list about bugs & errors
**Version:**
*0.1a:*
-----
**Bugs:**

- Bonus button have a display problem when a 4th button exist.
with CSS display:fixed, 4th button is underneath the Bonus button

- When bonus is on, multiplier boost is applied and visual updated, but when bonus is off, visual isn't updated

-----

**Version:**
*0.2a:*
-----
**Bugs:**

- Automatic save, when reloading page, doesn't refresh BpS counter.

**Bugfixes:**

- Visual render updated when bonus is off

-----

**Version:**
*0.3a:*
-----
**Bugs:**

- Visual bug for screen-contouring leaves:  Not aligned correctly

- Visual location of banana, multi-banana & monkey are not correct


**Bugfixes:**

- CSS update: bonus button is not longer moving everything in vicinity

- Refresh BpS counter is done when automatic save is applied

-----

**Version:**
*0.4a:*
-----
**Bugs:**

- New autoclicker added: display of autoclicker's value is not done correctly. Showing own value only, not total.

- Multiplier's addition is not modified correctly when in "bonus state". Only +1 is added to the "x5 addition"

- +1 to multiplier when in bonus state doesn't scale correctly (when bonus is out, multiplier is .20)

**Bugfixes:**

- CSS corrections. Leaves, banana & all visuals are correctly placed.

-----

**Version:**
*1.0:*
-----

**Known bugs:**

- *Problem:* Multiplier (+1) when in "bonus state".
Doesn't apply correctly the +1
*Solution:* Change the multiplier from +1 to +5 **OR** keep the original multiplier in another variable until boost is finished

**Bugfixes:**

- CSS class call problem is resolved

- Autoclicker's value are correctly displayed. Each one have a separate one, the total BpS is displayed correctly too

-----