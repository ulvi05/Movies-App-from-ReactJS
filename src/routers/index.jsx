import Home from "../pages/Home";
import Movies from "../pages/Movies";
import AddMovies from "../pages/AddMovies";
import MoviesDetail from "../pages/MoviesDetail";
import EditMovies from "../pages/EditMovies";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/MainLayout";

export const ROUTERS = [
  {
    element: <MainLayout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "add-movies",
        element: <AddMovies />,
      },
      {
        path: "movies/:id",
        element: <MoviesDetail />,
      },
      {
        path: "edit-movies",
        element: <EditMovies />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
