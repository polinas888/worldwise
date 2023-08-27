import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="add your first city by clicking on the city on the map" />
    );

  function getVisitedCountries() {
    const countriesMap = cities.reduce((map, city) => {
      const countryKey = `${city.country}-${city.emoji}`;
      if (!map.has(countryKey)) {
        map.set(countryKey, { country: city.country, emoji: city.emoji });
      }
      return map;
    }, new Map());

    return Array.from(countriesMap.values());
  }

  return (
    <ul className={styles.countryList}>
      {getVisitedCountries().map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
