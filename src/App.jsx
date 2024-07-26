import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTERS } from "./routers";

const routes = createBrowserRouter(ROUTERS);

function App() {
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
