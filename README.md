The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.


# NBA Tracker 

## Overview

There are too many games to keep track of each day! I'm too busy to watch all the games, but I still love being updated with impressive statlines. NBA Tracker is a highly customizable app that allows users to save player game logs from each day. A user will have flexible options on which game logs to save. They can save according to player and/or restrictions in the statline (for ex: points > 30, rebounds > 10, assists > 10). These game logs will be saved to a list that accumulates them as the season goes on. NBA tracker will allow users to register and login to view their updated lists and to add or change restrictions to their lists.


## Data Model

The application will store Users, Lists and Logs

* users can have multiple lists
* each list can have multiple player game logs

(___TODO__: sample documents_)

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

jjl625-final-project/db.js

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create2.jpg)

/list - page for showing all shopping lists

![list](documentation/list.jpg)

/list/slug - page for showing specific shopping list

![list](documentation/link:slug.jpg)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)
