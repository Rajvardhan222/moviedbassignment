import config from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface MovieCardProps {
  image: string;
  title: string;
  link: string;
}

function MovieCard({ image, title, link }: MovieCardProps) {
  return (
    <div className='w-full hover:scale-105 transition-transform duration-200'>
        <Link href={link}>
          <div className='cursor-pointer'>
            <Image  
              className='rounded-3xl w-full aspect-[2/3] object-cover mb-2' 
              src={image} 
              alt={title} 
              width={200} 
              height={300} 
            />
            <h2 className='text-lg md:text-xl font-semibold text-white text-center line-clamp-2'>{title}</h2>
          </div>
        </Link>
    </div>
  )
}

export default MovieCard