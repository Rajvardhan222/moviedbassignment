'use client'
import MovieCard from "@/components/MovieCard";
import Search from "@/components/Search";
import config from "@/constants";
import React, { useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import {LoaderCircle} from 'lucide-react'
export default function Home() {
  // State management
  const [page, setPage] = React.useState(1);
  const [movies, setMovies] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  // useInView hook for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px', // Trigger 100px before the element is visible
  });

  // Fetch trending movies
  const fetchTrendingMovies = async (pageNum = 1, append = false) => {
    if (isLoading) return; // Prevent multiple simultaneous requests
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/movies/trending?page=${pageNum}`);
      const data = await response.json();
      
      if (response.ok) {
        if (append) {
          setMovies(prev => [...prev, ...data.results]);
        } else {
          setMovies(data.results);
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
  const fetchSearchResults = async (query: string, pageNum = 1, append = false) => {
    if (isLoading) return; // Prevent multiple simultaneous requests
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/movies/search?query=${encodeURIComponent(query)}&page=${pageNum}`);
      const data = await response.json();
      
      if (response.ok) {
        if (append) {
          setMovies(prev => [...prev, ...data.results]);
        } else {
          setMovies(data.results);
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

  // Handle infinite scroll when element comes into view
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      
      if (searchQuery.trim()) {
        fetchSearchResults(searchQuery, nextPage, true);
      } else {
        fetchTrendingMovies(nextPage, true);
      }
    }
  }, [inView, hasMore, isLoading, page, searchQuery]);

  // Handle search with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        setPage(1);
        setHasMore(true);
        fetchSearchResults(searchQuery, 1, false);
      } else {
        setPage(1);
        setHasMore(true);
        fetchTrendingMovies(1, false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

  // Initial load
  useEffect(() => {
    fetchTrendingMovies(1, false);
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

        {/* Infinite Scroll Trigger */}
        {hasMore && (
          <div ref={ref} className="flex justify-center mt-8 h-20">
            {isLoading ? (
              <div className="text-white flex items-center gap-2">
                <LoaderCircle className="animate-spin" />
                Loading more movies...
              </div>
            ) : (
              <div className="text-white/50 flex items-center">
                Scroll for more
              </div>
            )}
          </div>
        )}

        {/* End of results */}
        {!hasMore && movies.length > 0 && (
          <div className="text-center text-white mt-8">
            <p className="opacity-75">🎬 You've seen all available movies!</p>
          </div>
        )}

        {/* No results for search */}
        {!isLoading && movies.length === 0 && searchQuery && (
          <div className="text-center text-white mt-8">
            <p>No movies found for "{searchQuery}"</p>
            <p className="text-sm opacity-50 mt-2">Try searching for something else</p>
          </div>
        )}

        {/* Initial loading */}
        {isLoading && movies.length === 0 && (
          <div className="flex justify-center items-center mt-8">
            <div className="text-white flex items-center gap-2">
              <LoaderCircle className="animate-spin" />
              Loading movies...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
