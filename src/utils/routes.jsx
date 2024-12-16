import { createBrowserRouter } from "react-router-dom";
import ToDoList from "../pages/todolist";
import Layout from "../pages/layout";
import LogIn from "../pages/login";
import SignUp from "../pages/signup";
import MovieDetails from "../pages/movie_details";
import Movies from "../pages/movies";

export const router = createBrowserRouter([{
  path: "/", element: <Layout />, children: [
    { index: true, element: <ToDoList /> },
    { path: "login", element: <LogIn /> },
    { path: "signup", element: <SignUp /> },
    { path: "movies", element: <Movies /> },
    { path: "moviedetails/:id", element: <MovieDetails /> }]
}]);
