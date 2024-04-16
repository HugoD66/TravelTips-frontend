import {ApiResponse, CountryName} from "../../models/CountryData";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Map from "../Map";
import Loading from "../Loading";
import { createTip } from "../../services/tipService";
import {createCountry} from "../../services/countryService";
import {addMarker} from "../../services/mapService";
import {Map as MaplibreMap} from "maplibre-gl";
import {createCity} from "../../services/cityService";
import {CountryModel} from "../../models/CountryModel";

interface CityDetails {
  city: string;
  postcode: string;
}

const AddTips = () => {
  const [countriesList, setCountriesList] = useState<CountryName[]>([]);
  const [country, setCountry] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [city, setCity] = useState("");
  const [postcode, setPostCode] = useState("");

  useEffect(() => {
    axios.get<ApiResponse[]>('https://restcountries.com/v3.1/all')
      .then(response => {
        const fetchedCountries = response.data.map((country): CountryName => ({
          name: country.name.common,
          alpha3Code: country.cca3,
          latlgn: country.latlng
        }));
        setCountriesList(fetchedCountries);
      })
      .then(() => console.log("Countries fetched", countriesList))
      .catch(error => console.error("Fetching countries data failed", error));
  }, []);

  useEffect(() => {
    console.log("Country selected:", country);
  }, [country]);



  const handleAddTipsSubmit = async (event: any) => {
    event.preventDefault();
    console.log("Tips added");

    let countryId;
    if (selectedCountry) {
      try {
        const newCountry = await createCountry({name: selectedCountry.name});
        countryId = newCountry.id;
        console.log("Country added with success", newCountry);
      } catch (error) {
        console.error("Error during country creation", error);
      }
    }
    console.log("COUNTRY ID " ) ;
    console.log(countryId) ;
    let cityId = "";
    if (city) {
      try {
        const newCity = await createCity({ name: city, idCountry: countryId, zipCode: postcode});
        //cityId = newCity.id;
        console.log("City added with success", newCity);
      } catch (error) {
        console.error("Error during city creation", error);
      }
    }
   /*
    const tips = createTip({
      name: name,
      price: parseInt(price),
      idCity: country,
      adress: "",
    }).then((response) => {
      console.log("Tip added with success", response);
    }).catch((error) => {
      console.error("Error during tip creation", error);
    });
    */
  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };
  const selectedCountry = countriesList.find(c => c.name === country);
  const defaultLat = 51.509865; // Exemple: Latitude pour Londres
  const defaultLng = -0.118092;


  const handleCityFound = useCallback(({ city, postcode }: CityDetails) => {
    setCity(city);
    setPostCode(postcode);
    console.log("City found:", city, "Postcode:", postcode);
  }, []);

  /**
   * const handleCityFound = useCallback((cityName: any) => {
   *     setCity(cityName.address.city);
   *     setZipCode(cityName.address.postcode);
   *     console.log("City found:", cityName);
   *     console.log("City found:", cityName);
   *     console.log("City found:", cityName);
   *     console.log("City found:", cityName);
   *     console.log("City found:", cityName);
   *   }, []);
   */


  return (
      <div>
        <h1>Add Tips</h1>
        <div className="add-tips-form">
          <form onSubmit={handleAddTipsSubmit}>
            <label htmlFor="name">
              Title:
              <input id="name" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label htmlFor="price">
              Prix:
              <input id="price"
                     type="range"
                     name="price"
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                     min="0" max="5"
                     step="1"
              />
            </label>
            <button type="submit" value="Envoyer">Envoyer</button>

            <label htmlFor="country">
              Country:
              <select id="country" name="country" onChange={handleCountryChange} value={country}>
                {countriesList.map((country, index) =>
                  <option key={index} value={country.name}>{country.name}</option>
                )}
              </select>
            </label>
            {selectedCountry ? (
              <Map
                lng={selectedCountry?.latlgn?.[1] || defaultLng}
                lat={selectedCountry?.latlgn?.[0] || defaultLat}
                onCityFound={handleCityFound}
              />
            ) : (
              <Loading width={400} height={400}/>
            )}

          </form>
        </div>
      </div>
  )
}

export default AddTips;
