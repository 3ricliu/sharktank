# SharkTank!

[Play Here!](https://3ricliu.github.io/sharktank)

## Summary

SharkTank is an in-browser game utilizing Javascript, Canvas, and CSS.

To play, hit ```SPACE``` every so often to dodge the spikes that come at ya from all directions! Make sure to not go too far up or down!

#### HomeScreen
![home] (./readme/home.gif)

#### Food Power Up
Eat food for bonus points!

![food] (./readme/steak.gif)

#### Star Power Up
Grab stars for invincibility!

![star] (./readme/star.gif)

## Structure

Game keeps track of all objects:
* Shark
* Spikes
* Scoreboard
* Boosts

Boosts inherits from BoostObject class with prototypical inheritance.

Boost Holder randomizes when and which boosts (*currently only star and steak*) appear to the user.

Side Spikes increase in proportion to player's score.

```LocalStorage``` is used to remember how many games the user has played, and their best high score.

Util class adds ```documentListeners``` for controls to play.

## To Do

* Implement additional boosts.
* Make each boost weighted, such that certain boosts appear more frequently than others.
* Refactor to make spikes more modular.

¸.·´¯`·.´¯`·.¸¸.·´¯`·.¸><(((º>
