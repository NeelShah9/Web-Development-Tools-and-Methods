# WEBTV

## Description:

WEBTV is a single page application that helps users find their favotite tv shows and their details by simply logging in. Multiple users can use the application at the same time. Based on the tv shows you select, it gives you recommendations and lets you add comments to them.

The homepage has the Top 10 Tv shows decided via the ratings and a search bar where you can find Tv shows based on keywords. The project uses APIs for the data used. These APIs do not contain all the TV shows ever, hence you might encounter a detail not being available, but those are the limitations of the API.

## How to use:

For the project to start, you can run:

 `npm install` & `npm start`

The content can only be accesed if you're logged in and the username cannot be an empty space or the string 'dog'.

Once you are logged in the home screen shows the Top 10 Tv Shows, you can click on the image or the 'details' button and it shows you the title, year, overview and poster of the Tv show.

You can also discover Tv shows by typing a keyword in the input bar and clicking search. The Tv show best matched with the keyword will appear in a similar fashion as explained above.

Once you have got what you are looking for you can return to homepage or logout, both with the respectively named buttons on the screen.

## API used:

1. https://www.omdbapi.com/. All content licensed under CC BY-NC 4.0.(https://creativecommons.org/licenses/by-nc/4.0/)

2. https://www.themoviedb.org/. The terms of use as in https://www.themoviedb.org/terms-of-use are followed strictly.

