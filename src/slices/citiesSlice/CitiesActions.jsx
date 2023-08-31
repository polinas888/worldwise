import { BASE_URL } from "../../EnvironmentVariables";

export async function getCurrentCity(id, dispatch) {
  dispatch({ type: "loading" });
  try {
    const res = await fetch(`${BASE_URL}/cities/${id}`);
    const data = await res.json();
    dispatch({ type: "city/loaded", payload: data });
  } catch (error) {
    dispatch({ type: "rejected", payload: error.message });
  }
}

export async function fetchCities(dispatch) {
  dispatch({ type: "loading" });
  try {
    const res = await fetch(`${BASE_URL}/cities`);
    const data = await res.json();
    dispatch({ type: "cities/loaded", payload: data });
  } catch (error) {
    dispatch({ type: "rejected", payload: error.message });
  }
}

export async function createCity(newCity, dispatch, cities) {
  dispatch({ type: "loading" });
  try {
    const hasCity = cities.find(
      (city) => city.cityName.toLowerCase() === newCity.cityName.toLowerCase()
    );

    if (hasCity) {
      dispatch({ type: "rejected", payload: "There is such city already" });
      return;
    }

    const response = await fetch(`${BASE_URL}/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCity),
    });
    console.log(newCity);

    if (!response.ok) {
      throw new Error("Failed to create city.");
    }
    dispatch({ type: "city/created", payload: newCity });
    console.log(getCurrentCity);
  } catch (error) {
    dispatch({ type: "rejected", payload: error.message });
  }
}

export async function deleteCity(id, dispatch) {
  dispatch({ type: "loading" });
  try {
    const response = await fetch(`${BASE_URL}/cities/${id}`, {
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

export default function getActions(dispatch, cities) {
  return {
    getCurrentCity: (id) => getCurrentCity(id, dispatch),
    fetchCities: () => fetchCities(dispatch),
    createCity: (newCity) => createCity(newCity, dispatch, cities),
    deleteCity: (id) => deleteCity(id, dispatch),
  };
}
