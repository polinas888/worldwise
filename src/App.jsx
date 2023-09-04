import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CityContextProvider } from "./slices/citiesSlice/CitiesContext";
import { AuthContextProvider } from "./slices/fakeAuthSlice/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNoFound = lazy(() => import("./pages/PageNotFound"));
const Homepage = lazy(() => import("./pages/HomePage"));
const VisitedPlaces = lazy(() => import("./pages/VisitedPlaces"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <div>
      <AuthContextProvider>
        <CityContextProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />}></Route>
                <Route path="product" element={<Product />}></Route>
                <Route path="price" element={<Pricing />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route
                  path="map"
                  element={
                    <ProtectedRoute>
                      <VisitedPlaces />
                    </ProtectedRoute>
                  }
                >
                  <Route
                    index
                    element={<Navigate replace to="cities" />}
                  ></Route>
                  <Route path="countries" element={<CountryList />}></Route>
                  <Route path="cities" element={<CityList />}></Route>
                  <Route path="cities/:id" element={<City />}></Route>
                  <Route path="form" element={<Form />}></Route>
                </Route>
                <Route path="*" element={<PageNoFound />}></Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CityContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
