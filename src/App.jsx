import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNoFound from "./pages/PageNotFound";
import Homepage from "./pages/HomePage";
import VisitedPlaces from "./pages/VisitedPlaces";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CityContextProvider } from "./slices/citiesSlice/CitiesContext";

function App() {
  return (
    <div>
      <CityContextProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="price" element={<Pricing />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="map" element={<VisitedPlaces />}>
              <Route index element={<Navigate replace to="cities" />}></Route>
              <Route path="countries" element={<CountryList />}></Route>
              <Route path="cities" element={<CityList />}></Route>
              <Route path="cities/:id" element={<City />}></Route>
              <Route path="form" element={<Form />}></Route>
            </Route>
            <Route path="*" element={<PageNoFound />}></Route>
          </Routes>
        </BrowserRouter>
      </CityContextProvider>
    </div>
  );
}

export default App;
