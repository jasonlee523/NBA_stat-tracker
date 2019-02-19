
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

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can add a player to the list
4. as a user, I can delete a player to the list
5. as a user, I can change the filters on my list


    * Use FB Connect to implement user authentication
    * Use NBA API to search for stats and filter them out into lists
