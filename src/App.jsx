import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNoFound from "./pages/PageNotFound";
import Homepage from "./pages/HomePage";
import VisitedPlaces from "./pages/VisitedPlaces";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="price" element={<Pricing />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="map" element={<VisitedPlaces />}></Route>
          <Route path="*" element={<PageNoFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
