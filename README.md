The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.


# NBA Tracker 

## Overview

There are too many player statlines to keep track of! I'm too busy to constantly check, but I still love being updated with impressive statlines. NBA Tracker is a customizable app that allows users to save player statlines. A user will have flexible options on which players to choose, and the ability to filter statlines (for ex: points > 30, rebounds > 10, assists > 10). These statlines will be saved to a list where the player can add, delete, or filter. NBA tracker will allow users to register and login to view their lists and to add or change restrictions to their lists.


## Data Model

The application will store Users, Lists and Players

* each user has a unique list
* each list stores multiples players

An Example User:

```javascript
{
  username: "NBATracker",
  hash: // a password hash,
  lists: // an array of references to List documents
}
```

An Example List with Embedded Logs:

```javascript
{
  user: // a reference to a User object
  name: "Russell Westbrook Triple Doubles",
  logs: [
    { player: "Russell Westbrook", date: "01/29/2017", points: 40},
    { player: "Russell ", date: "3/29/2017", points: 57},
  ],
  createdAt: // timestamp
}
```


## [Link to Commented First Draft Schema](db.js) 

![list](/db.js)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create2.jpg)

/list - page for showing all shopping lists

![list](documentation/list.jpg)

/list/slug - page for showing specific shopping list

![list](documentation/link:slug.jpg)

## Site map

![list](documentation/map.jpg)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can add a player to the list
4. as a user, I can delete a player to the list
5. as a user, I can change the filters on my list

## Research Topics

* (6 points) Integrate user authentication
    * I will use FB Connect to implement user authentication
* (2 points) Use external API NBA Stats
    * I will use this API to search for stats and filter them out into lists

8 points total out of 8 required points


## [Link to Initial Main Project File](app.js) 

![list](app.js)

## Annotations / References Used
