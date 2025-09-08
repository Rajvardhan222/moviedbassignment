'use client'
import config from '@/constants'
import Image from 'next/image'
import React, { useEffect } from 'react'
import {LoaderCircle} from 'lucide-react'

const realTMDBdATA = {
  "adult": false,
  "backdrop_path": "/hGGC9gKo7CFE3fW07RA587e5kol.jpg",
  "belongs_to_collection": null,
  "budget": 175000000,
  "genres": [
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 12,
      "name": "Adventure"
    }
  ],
  "homepage": "http://disney.go.com/disneypictures/up/",
  "id": 14160,
  "imdb_id": "tt1049413",
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_title": "Up",
  "overview": "Carl Fredricksen spent his entire life dreaming of exploring the globe and experiencing life to its fullest. But at age 78, life seems to have passed him by, until a twist of fate (and a persistent 8-year old Wilderness Explorer named Russell) gives him a new lease on life.",
  "popularity": 13.6667,
  "poster_path": "/mFvoEwSfLqbcWwFsDjQebn9bzFe.jpg",
  "production_companies": [
    {
      "id": 3,
      "logo_path": "/1TjvGVDMYsj6JBxOAkUHpPEwLf7.png",
      "name": "Pixar",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2009-05-28",
  "revenue": 735103954,
  "runtime": 96,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "The greatest adventure is just getting back home.",
  "title": "Up",
  "video": false,
  "vote_average": 7.959,
  "vote_count": 20937
}

const tempDataAboutMovieUpFromImdb = {
    "Title": "Up",
    "Year": "2009",
    "Rated": "PG",
    "Released": "29 May 2009",
    "Runtime": "96 min",
    "Genre": "Animation, Adventure, Comedy",
    "Director": "Pete Docter, Bob Peterson",
    "Writer": "Pete Docter (original story by), Bob Peterson (original story by), Tom McCarthy (screenplay by)",
    "Actors": "Edward Asner, Christopher Plummer, Jordan Nagai, Bob Peterson",
    "Plot": "A young boy named Carl Fredricksen fulfills his lifelong dream of a great adventure by tying thousands of balloons to his house and flying to South America. However, he inadvertently takes a young boy named Russell with him.",
    "Language": "English",
    "Country": "USA",
    "Awards": "Won 2 Oscars. Another 75 wins & 142 nominations.",
    "Poster": "https://webneel.com/wallpaper/sites/default/files/images/07-2013/4%20up%20movie%20wallpaper.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "8.2/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "98%"
        },
        {
            "Source": "Metacritic",
            "Value": "88/100"
        }
    ],
    "Metascore": "88",
    "imdbRating": "8.2",
    "imdbVotes": "540,000",
    "imdbID": "tt1049413",
    "Type": "movie",
    "DVD": "10 Nov 2009",
    "BoxOffice": "$731,342,139",
    "Production": "Walt Disney Pictures",
    "Website": "http://disney.go.com/disneyvideos/animatedfilms/up/",
    "Response": "True"
}
 function Page({params}) {
  // TMDB image base URL for posters (w500 is a good size for responsive design)
  const [movieData, setMovieData] = React.useState(null);
  const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const posterUrl = movieData?.poster_path ? `${tmdbImageBaseUrl}${movieData.poster_path}` : config.imageUrl;
  const [loading,setIsLoading] = React.useState(true);

  // Convert vote_average to 5-star scale (TMDB uses 10-point scale)
  const starRating = Math.round(movieData?.vote_average / 2);

  let movieId =  params.movieId

  const fetchMovieDetails = async () => {
    if(!movieId) return;
    const response = await fetch(`/api/movies/${movieId}`);
    const data = await response.json();
    return data;
  };


  useEffect(() => {
    fetchMovieDetails().then(data => {
      console.log('Fetched movie details:', data);
        setMovieData(data);
    }).finally(()=> {
        setIsLoading(false);
    });
  }, [movieId]);

  if(loading){
    return <div className='w-full min-h-screen m-auto flex items-center justify-center text-4xl font-semibold'>
        <LoaderCircle className="animate-spin w-16 h-16 sm:w-20 sm:h-20 md:w-36 md:h-36 lg:w-40 lg:h-40" />
    </div>
  }
  return (
   movieData && <div className={`w-full h-full flex flex-col gap-y-7 px-4 transition-opacity duration-500 ease-in-out md:px-10 ${
        !loading ? 'opacity-100' : 'opacity-0'
      }`}>
        <Image 
          className='rounded-3xl m-auto w-full max-w-2xl object-cover' 
          src={posterUrl}  
          width={500} 
          height={750}
          alt={movieData.title}
        />

        <h1 className='text-2xl md:text-3xl font-bold text-center md:text-left'>{movieData.title}</h1>

        {/* Tagline */}
        <p className='text-lg md:text-xl italic text-center md:text-left opacity-75'>"{movieData.tagline}"</p>

        {/* Overview */}
        <p className='text-sm md:text-base leading-relaxed text-gray-300'>{movieData.overview}</p>

        {/* Genres */}
       <div className='flex flex-wrap gap-2'>
         {
            movieData.genres.map((genre) => (
                <span key={genre.id} className='text-white opacity-50 text-sm md:text-base px-2 py-1 bg-gray-800 rounded-lg'>
                  {genre.name}
                </span>
            ))
        }
       </div>

        <div className='bg-primary rounded-2xl flex flex-col gap-y-5 p-4 md:p-5'>
            <div className='flex items-center justify-between'>
                {/* Stars rating */}
               <div className='flex'>
                 {[...Array(5)].map((_, index) => (
                    <span key={index} className={`text-xl md:text-2xl ${index < starRating ? 'text-yellow-500' : 'text-gray-600'}`}>
                      &#9733;
                    </span>
                ))}
               </div>
                <span className='text-white ml-2 text-sm md:text-base'>{movieData.vote_count.toLocaleString()} votes</span>
            </div>
            
            <div className='flex items-center justify-between'>
                <p className='text-white opacity-50 text-sm md:text-base'>TMDB Rating</p>
                <p className='text-sm md:text-base'>{movieData.vote_average.toFixed(1)}/10</p>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-white opacity-50 text-sm md:text-base'>Release Date</p>
                <p className='text-sm md:text-base'>{new Date(movieData.release_date).toLocaleDateString()}</p>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-white opacity-50 text-sm md:text-base'>Runtime</p>
                <p className='text-sm md:text-base'>{movieData.runtime} minutes</p>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-white opacity-50 text-sm md:text-base'>Budget</p>
                <p className='text-sm md:text-base'>${movieData.budget.toLocaleString()}</p>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-white opacity-50 text-sm md:text-base'>Revenue</p>
                <p className='text-sm md:text-base'>${movieData.revenue.toLocaleString()}</p>
            </div>

            <div className='flex items-center justify-between'>
                <p className='text-white opacity-50 text-sm md:text-base'>Status</p>
                <p className='text-sm md:text-base'>{movieData.status}</p>
            </div>
        </div>

        {/* Production Companies */}
        {movieData.production_companies.length > 0 && (
          <div className='flex flex-col gap-y-3'>
            <h3 className='text-lg md:text-xl font-semibold'>Production Companies</h3>
            <div className='flex flex-wrap gap-3'>
              {movieData.production_companies.map((company) => (
                <div key={company.id} className='bg-gray-800 rounded-lg p-3 flex flex-col items-center text-center'>
                  {company.logo_path && (
                    <Image 
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      color='white'
                      alt={company.name}
                      width={80}
                      height={40}
                      className='mb-2 object-contain'
                    />
                  )}
                  <p className='text-sm font-medium'>{company.name}</p>
                  <p className='text-xs opacity-50'>{company.origin_country}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
    </div>
  )
}

export default Page