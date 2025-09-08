'use client'
import React, { useState } from 'react'
interface SearchProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

function Search({ onSearch, placeholder = "Search movies..." }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch?.(value)
  }

  const handleClear = () => {
    setSearchQuery('')
    onSearch?.('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-2xl mx-auto'>
      <div className='relative flex items-center'>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className='w-full px-6 py-4 pr-12 rounded-3xl bg-background text-white placeholder-white/50 border-2 border-primary focus:border-yellow focus:outline-none transition-colors duration-200 text-lg'
        />
        
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className='absolute right-4 p-2 text-white/70 hover:text-white transition-colors duration-200'
            aria-label="Clear search"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    </form>
  )
}

export default Search