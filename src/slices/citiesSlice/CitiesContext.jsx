import { createContext, useContext, useEffect, useReducer } from "react";
import getActions from "./CitiesActions";
import citiesReducer from "./CitiesReducer";

const CityContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function CityContextProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    citiesReducer,
    initialState
  );

  const { getCurrentCity, createCity, deleteCity, fetchCities } = getActions(
    dispatch,
    cities
  );

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCurrentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const citiesContext = useContext(CityContext);
  return citiesContext;
}

export { CityContextProvider, useCities };
