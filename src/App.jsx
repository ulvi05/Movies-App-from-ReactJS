import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTERS } from "./routers";
import { WishlistProvider } from "./services/context/wishlistContext.jsx";
import { AuthProvider } from "./services/context/authContext.jsx";

const routes = createBrowserRouter(ROUTERS);

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <RouterProvider router={routes}></RouterProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
