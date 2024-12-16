import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MoviesThunkAction } from '../utils/movies_slice';
import { StringManager } from '../utils/stringmanager';
import { LangContext } from '../utils/lang_context';

export default function Movies() {
    const { lang } = useContext(LangContext);
    const navigate = useNavigate();
    const popularMovies = useSelector((state) => state.homeMovies.movies);
    const moviesDispatch = useDispatch();

    useEffect(() => {
        moviesDispatch(MoviesThunkAction());
    }, []);

    return (
        <div dir={lang === 'en' ? 'ltr' : 'rtl'} className="p-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {popularMovies.map((movie) => (
                        <div key={movie.id} className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                                <button
                                    onClick={() => navigate(`/moviedetails/${movie.id}`)}
                                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                                >
                                    {lang === 'en' ? StringManager.viewdetails.en : StringManager.viewdetails.ar}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
