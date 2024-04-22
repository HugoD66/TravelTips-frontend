import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchCountryByName, getCountryByName} from "../services/countryService";
import {CountryModel} from "../models/CountryModel";
import {CityModel} from "../models/CityModel";
import Map from "../components/Map";

const CountryPage = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState<any>();
  const [countryDb, setCountryDb] = useState<CountryModel>();
  const defaultLat = 46.5681;
  const defaultLng = 3.3349;
  useEffect(() => {
    if (countryName) {
    const fetchData = async () => {
        try {
          const fetchedCountry = await fetchCountryByName(countryName);
          setCountry(fetchedCountry);

        } catch (error) {
          console.error("Error fetching country:", error);
        }
      }
    const fetchCountryDb = async () => {
      try {
        const fetchedCountryDb = await getCountryByName(countryName);
        setCountryDb(fetchedCountryDb );
        console.log(fetchedCountryDb)
      } catch (error) {
        console.error("Error fetching country:", error);
      }
    }

    fetchData();
    fetchCountryDb()
    }
  }, [countryName]);
  console.log('country');
  console.log(country);
  console.log('countryDb');
  console.log(countryDb);
  return (
    <div>
      <h1>Country Page</h1>
      {country ? (
        <div>
          <p>Name: {country.name}</p>
          <p>Code: {country.alpha3Code}</p>
          <p>Coordinates: {country.latlng.join(", ")}</p>
          {countryDb ? (
            <>
              <div>
                <p>Nos villes enregistrées déjà enregistrées :</p>
                {countryDb.city && countryDb.city.map((city: CityModel, index) => (
                  <p key={index}>{city.name}</p>
                ))}
              </div>
              <Map lat={country.latlng[0] || defaultLat} lng={country.latlng[1] || defaultLng} zoom={4} geoList={countryDb.geoCoords} />
            </>
          ) : (
            <div>Toujours pas de villes enregistrées</div>
          )}
        </div>
      ) : (
        <p>Chargement des informations sur le pays...</p>
      )}
    </div>
  );
}
export default CountryPage;
