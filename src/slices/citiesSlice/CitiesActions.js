import { useCallback } from "react";

const REACT_APP_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

function useActions(dispatch, cities) {
  const getCurrentCity = useCallback(
    async function getCurrentCity(id) {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${REACT_APP_BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    },
    [dispatch]
  );

  const fetchCities = useCallback(
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${REACT_APP_BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    },
    [dispatch]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const hasCity = cities.find(
        (city) => city.cityName.toLowerCase() === newCity.cityName.toLowerCase()
      );

      if (hasCity) {
        dispatch({ type: "rejected", payload: "There is such city already" });
        return;
      }

      const response = await fetch(`${REACT_APP_BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });

      if (!response.ok) {
        throw new Error("Failed to create city.");
      }
      dispatch({ type: "city/created", payload: newCity });
      fetchCities(dispatch);
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete city.");
      }
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }

  return {
    getCurrentCity,
    fetchCities,
    createCity,
    deleteCity,
  };
}

export default useActions;
