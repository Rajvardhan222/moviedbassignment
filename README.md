# Movie DB
This project uses TMDB API for fetching and listing movies.

## Following are the features offer by this application
   - Get a list of most popular movies on home page.
   - Search a movies.
   - Click on a movie listed to get more detail about it.

## Stack and API used
Next.js and TMDB API

## steps to develop this app on your machine
- first get the api key from [here](https://www.themoviedb.org/settings/api)
 - clone this repo to your machine
- run `npm install`
 - change to the project directory
 - create a file `.env` in the root of the project
 - fill it with this data and add your api key which you previously got from above link.
    ```js
    TMDB_API_KEY=Enter your api key
    
    NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3

    ```
 - run `npm run dev` to start the dev server

 ## Project Structure
    src
        |--->app
                |--->page.tsx (root of the application)
                |--->[movieId]
                              |--->page.tsx (display Individual movie detail)
            |---> api
                    |--->trending
                                 |---> route.ts (contain get route to fetch most trending movies)
                    |--->search
                               |--->route.ts (contain route for fetching the search result)
                    |--->[movieId]
                                  |---> route.ts (contain routes fetching detail for individual movies)
 

## Features
 - The search result uses a debounce search so we dont flood the backend with many request and call it after 500ms
 - I have also implemented infinity Scroll using observer API which allow user to scroll endlessly.
 - User get the details of the movie with a poster picture and some key details and facts about it.




 This project was created as a part of assignment from `Trinity Packaging Co. Pvt. Ltd` by Rajvardhan Ranawat


            

