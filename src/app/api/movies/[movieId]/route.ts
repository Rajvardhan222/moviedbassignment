const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const GET = async (request: Request, { params }: { params: { 
    movieId: string } }) => {
    try {
        const response = await fetch(`${TMDB_BASE_URL}/movie/${params.movieId}`,{
            headers: {
                Authorization: `Bearer ${TMDB_API_KEY}`,
                accept: 'application/json',
            }
        });
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response('Failed to fetch movie details', { status: 500 });
    }

    
}