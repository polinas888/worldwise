// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useGeolocationPosition } from "../hooks/useGeolocationPosition";
import { FETCH_CITY_URL } from "../EnvironmentVariables";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import { useCities } from "../slices/citiesSlice/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);
  const [countryEmoji, setCountryEmoji] = useState("");
  const [cityError, setCityError] = useState(null);
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useGeolocationPosition();
  const { isLoading, createCity } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat && !lng) return;
    async function getCity() {
      try {
        setIsLoadingGeolocation(true);
        setCityError(null);
        const res = await fetch(
          `${FETCH_CITY_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "It seems there is no any country here. Try to press to some other place"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setCityError(error.message);
      } finally {
        setIsLoadingGeolocation(false);
      }
    }
    getCity();
  }, [lat, lng]);

  async function handleOnSubmit(e) {
    e.preventDefault();
    console.log("Form submitted!");
    const newCity = {
      cityName,
      country,
      emoji: countryEmoji,
      date,
      notes,
      position: { lat: parseFloat(lat), lng: parseFloat(lng) },
    };
    console.log(newCity);
    if (!newCity.cityName || !newCity.date) return;
    await createCity(newCity);
    navigate("/map/cities");
  }

  if (!lat && !lng)
    return <Message message="Start clicking on some city on the map" />;
  if (cityError) return <Message message={cityError} />;
  if (isLoadingGeolocation) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${isLoading ? "loading" : ""}`}
      onSubmit={handleOnSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{countryEmoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <ReactDatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={handleOnSubmit}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
