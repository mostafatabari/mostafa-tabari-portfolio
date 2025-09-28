import "./App.css";
import { RouterProvider } from "react-router-dom";
import Routers from "./components/pages/routers/Routers";

function App() {
  return (
    <>
      <RouterProvider router={Routers} />
    </>
  );
}

export default App;
