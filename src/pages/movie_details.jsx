import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/axios";
import { LangContext } from "../utils/lang_context";

export default function MovieDetails() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const { lang } = useContext(LangContext);

    async function fetchMovieDetails() {
        try {
            const res = await axiosInstance.get('movie/' + id);
            console.log(res.data);
            setMovieDetails(res.data);
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        fetchMovieDetails();
    }, []);

    return (
        <div
            dir={lang === "en" ? "ltr" : "rtl"}
            className="relative bg-black text-white h-screen flex flex-col items-center justify-center"
        >
            <img
                src={`https://image.tmdb.org/t/p/w1280/${movieDetails.poster_path}`}
                alt={movieDetails.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="relative z-10 p-6 bg-black bg-opacity-60 rounded-md text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{movieDetails.title}</h1>
                <p className="text-lg">{movieDetails.overview}</p>
            </div>
        </div>
    );
}
