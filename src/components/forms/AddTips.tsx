import {ApiResponse, CountryName} from "../../models/CountryData";
import React, {ChangeEvent, useCallback, useContext, useEffect, useState} from "react";
import axios from "axios";
import Map from "../Map";
import Loading from "../Loading";
import {createCountry, fetchCountryList} from "../../services/countryService";
import {createCity} from "../../services/cityService";
import {useCity} from "../../context/CityProvider";
import {createTip} from "../../services/tipService";
import {PictureModel} from "../../models/PictureModel";
import {createPicture} from "../../services/pictureService";

const AddTips = () => {
  const { cityDetails, setCityDetails } = useCity();
  const [country, setCountry] = useState<string>("");
  const [countriesList, setCountriesList] = useState<CountryName[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [pictureFiles, setPictureFiles] = useState<File[]>([]); // Corrected state

  useEffect(  () => {
    const fetchData = async () => {
      try {
        const fetchedCountries = await fetchCountryList();
        setCountriesList(fetchedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    console.log("Country selected:", country);
  }, [country]);

  useEffect(() => {
    console.log("Updated cityDetails:", cityDetails);
  }, [cityDetails]);



  const handleAddTipsSubmit = async (event: any) => {
    event.preventDefault();

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
    let newCity
    if (cityDetails.city && cityDetails.postcode && countryId) {
      try {
        newCity = await createCity({ name: cityDetails.city, idCountry: countryId, zipCode: cityDetails.postcode});
      } catch (error) {
        console.error("Error during city creation", error);
      }
    }
    let pictureList: PictureModel[] = [];
    if (newCity) {
      pictureList = await Promise.all(
        pictureList.map((picture: PictureModel) => {
          return createPicture({
            url: picture.url,
            createdBy: '4e0f31e0-aaf3-4f17-b3b5-04e14f4a1dc3'
          });
        })
      );
    }

    const tips = createTip({
      name: name,
      price: parseInt(price),
      idCity: newCity.id,
      adress: "",
      approvate: false,
      pictures: pictureList
    })
      .then((response) => {
      console.log("Tip added with success", response);
    }).catch((error) => {
      console.error("Error during tip creation", error);
    });

  }

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };
  const selectedCountry = countriesList.find(c => c.name === country);
  const defaultLat = 51.509865; // Exemple: Latitude pour Londres
  const defaultLng = -0.118092;



  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("Files selected:", event.target.files);
      setPictureFiles(Array.from(event.target.files));
    }
  };

  return (
    <div>
      <h1>Add Tips</h1>
      <div className="add-tips-form">
        <form onSubmit={handleAddTipsSubmit}>
          <div className="form-group">
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

            <label htmlFor="pictureList">Photos:</label>
            <input id="pictureList" type="file" name="pictureList" multiple onChange={handleFileChange}/>

            <button
              type="submit"
              value="Envoyer"
              className="submit-button-form"
            >Envoyer
            </button>
          </div>

          <div className="map-content">
            <label htmlFor="country" className="country-input">
              Choisissez un pays
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
              />
            ) : (
              <Loading width={400} height={400}/>
            )}
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddTips;
