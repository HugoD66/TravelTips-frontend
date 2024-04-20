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
import {TipModel} from "../../models/TipModel";

const AddTips = () => {
  const { cityDetails, setCityDetails } = useCity();
  const [country, setCountry] = useState<string>("");
  const [countryId, setCountryId] = useState<string>("");
  const [countriesList, setCountriesList] = useState<CountryName[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
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
  }, [country, setCountry]);

  useEffect(() => {
    console.log("Updated cityDetails:", cityDetails);
  }, [cityDetails]);



  const handleAddTipsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("form start")
    try {
      const selectedCountry = countriesList.find(c => c.name === country);
      const newCountry = await createCountry({name: selectedCountry!.name});
      const newCity = await createCity({
        name: cityDetails.city,
        idCountry: newCountry.id,
        zipCode: cityDetails.postcode
      });
      console.log("form step 1")


      console.log("form step 2")
      const tips : TipModel = {
        name: name,
        price: price,
        idCity: newCity.id,
        adress: "123 rue du test",
        approvate: false,
        public: true,
        idUser: "29457f7c-2156-400f-98e2-7b03d68c031e"
      }
      console.log("form step 3")
      console.log(tips)
      const tipsResponse = await createTip(tips);
      if (tipsResponse && tipsResponse.id) {
        console.log("Tip added with success", tipsResponse);
      } else {
        console.error("No tip ID returned, check the creation process", tipsResponse);
      }

      /*const uploadedPictures = await Promise.all(
        pictureFiles.map(file =>
          createPicture({
            url: URL.createObjectURL(file),
            createdBy: '29457f7c-2156-400f-98e2-7b03d68c031e'
          })
        )
      );*/
    } catch (error) {
      console.error("Error during the creation process", error);
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };
  const selectedCountry = countriesList.find(c => c.name === country);
  const defaultLat = 51.509865; // Exemple: Latitude pour Londres
  const defaultLng = -0.118092;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
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
                     onChange={(e) => setPrice(parseInt(e.target.value, 10))} // Convertit la valeur en nombre
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
