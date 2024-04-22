import { CountryName } from "../../models/CountryData";
import React, { useEffect, useState } from "react";
import Map from "../Map";
import Loading from "../Loading";
import { createCountry, fetchCountryList } from "../../services/countryService";
import { createCity } from "../../services/cityService";
import { useCity } from "../../context/CityProvider";
import { createTip } from "../../services/tipService";
import { TipModel } from "../../models/TipModel";

const AddTips = () => {
  const { cityDetails, setCityDetails } = useCity();
  const [country, setCountry] = useState<string>("");
  const [countriesList, setCountriesList] = useState<CountryName[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [pictureFiles, setPictureFiles] = useState<File[]>([]);

  useEffect(() => {
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

  const handleAddTipsSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const selectedCountry = countriesList.find((c) => c.name === country);
      const newCountry = await createCountry({ name: selectedCountry!.name });
      const newCity = await createCity({
        name: cityDetails.city,
        idCountry: newCountry.id,
        zipCode: cityDetails.postcode,
      });
      const userId = localStorage.getItem("id");
      if (!userId) {
        console.warn("Il faut etre connecté pour ajouter un tip");
        return;
      }
      const tips: TipModel = {
        name: name,
        price: price,
        idCity: newCity.id,
        adress: cityDetails.adress,
        approvate: false,
        idUser: userId,
      };

      const tipsResponse = await createTip(tips);
      if (tipsResponse && tipsResponse.id) {
        console.log("Tip added with success", tipsResponse);
        for (const file of pictureFiles) {
          const formData = new FormData();
          formData.append("file", file);

          const uploadUrl = `http://localhost:4000/picture/upload-file/4e0f31e0-aaf3-4f17-b3b5-04e14f4a1dc3/${tipsResponse.id}`;
          const responsePicture = await fetch(uploadUrl, {
            method: "POST",
            body: formData,
            headers: {},
          });

          if (!responsePicture.ok) {
            throw new Error("Network response was not OK");
          }
          //const pictureData = await responsePicture.json();
        }
        console.log("Pictures uploaded with success");
      } else {
        console.error(
          "No tip ID returned, check the creation process",
          tipsResponse
        );
      }
    } catch (error) {
      console.error("Error during the creation process", error);
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };
  const selectedCountry = countriesList.find((c) => c.name === country);
  const defaultLat = 46.5681;
  const defaultLng = 3.3349;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files);

      setPictureFiles(Array.from(event.target.files));
      console.log(pictureFiles);
    }
    console.log(pictureFiles);
  };

  return (
    <div>
      <h1>Ajouter un Tips</h1>
      <div className="add-tips-form">
        <form onSubmit={handleAddTipsSubmit}>
          <div className="map-content">
            <label htmlFor="country" className="country-input">
              Choisissez un pays
              <select
                id="country"
                name="country"
                onChange={handleCountryChange}
                value={country}
              >
                {countriesList.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </label>
            {selectedCountry ? (
              <Map
                lng={selectedCountry?.latlgn?.[1] || defaultLng}
                lat={selectedCountry?.latlgn?.[0] || defaultLat}
              />
            ) : (
              <Loading width={400} height={400} />
            )}
          </div>
          <div className="city-content">
            <label>
              Ville:
              <input type="text" value={cityDetails.city} readOnly />
            </label>
            <label>
              Code postal:
              <input type="text" value={cityDetails.postcode} readOnly />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="name">
              Nom du tips:
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label htmlFor="price">
              Fourchette de prix:
              <input
                id="price"
                type="range"
                name="price"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                min="0"
                max="5"
                step="1"
              />
            </label>

            <label htmlFor="pictureList">Photos:</label>
            <input
              id="pictureList"
              type="file"
              name="pictureList"
              multiple
              onChange={handleFileChange}
            />

            <button
              type="submit"
              value="Envoyer"
              className="submit-button-form"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTips;
