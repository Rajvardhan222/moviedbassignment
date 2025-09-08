'use client'
import MovieCard from "@/components/MovieCard";
import Search from "@/components/Search";
import config from "@/constants";
import Image from "next/image";
import React, { useEffect } from "react";

export default function Home() {
  // No need for environment variables in client component anymore!
  
  //  1. Display the trending movies with a infinity scroll
  // 2. if user has searched any movie then with demounce search show searched list
  // 3. If user has not searched any movie then show trending movies
  // 4. Each movie card should have image and title
  // 5. On clicking the movie card it should navigate to the movie details page

  // get a list of most trending movies
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Fetch trending movies
  const fetchTrendingMovies = async (pageNum = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/movies/trending?page=${pageNum}`);
      const data = await response.json();
      
      if (response.ok) {
        if (pageNum === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
        setHasMore(pageNum < data.total_pages);
        console.log("Trending Movies:", data.results);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch search results
  const fetchSearchResults = async (query: string, pageNum = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}&page=${pageNum}`);
      const data = await response.json();
      
      if (response.ok) {
        if (pageNum === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
        setHasMore(pageNum < data.total_pages);
        console.log("Search Results:", data.results);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        setPage(1);
        fetchSearchResults(searchQuery, 1);
      } else {
        setPage(1);
        fetchTrendingMovies(1);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  // Initial load
  useEffect(() => {
    fetchTrendingMovies(1);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Movie Database
        </h1>
        
        <div className="mb-8">
          <Search onSearch={handleSearch} />
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : config.imageUrl}
              title={movie.title}
              link={`/${movie.id}`}
            />
          ))}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center mt-8">
            <div className="text-white">Loading...</div>
          </div>
        )}

        {/* No results */}
        {!isLoading && movies.length === 0 && searchQuery && (
          <div className="text-center text-white mt-8">
            <p>No movies found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
