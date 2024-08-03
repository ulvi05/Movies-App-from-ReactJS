import Home from "../pages/Home";
import Movies from "../pages/Movies";
import AddMovies from "../pages/AddMovies";
import MoviesDetail from "../pages/MoviesDetail";
import EditMovies from "../pages/EditMovies";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/MainLayout";
import Wishlist from "../pages/Wishlist";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";

export const ROUTERS = [
  {
    element: <MainLayout />,
    path: "/",
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "movies",
        element: (
          <PrivateRoute>
            <Movies />
          </PrivateRoute>
        ),
      },
      {
        path: "add-movies",
        element: (
          <PrivateRoute>
            <AddMovies />
          </PrivateRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "movies/:id",
        element: (
          <PrivateRoute>
            <MoviesDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-movies",
        element: (
          <PrivateRoute>
            <EditMovies />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-movies/:id",
        element: (
          <PrivateRoute>
            <EditMovies />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
