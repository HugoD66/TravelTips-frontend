import { CountryName } from "../../models/CountryData";
import React, { useEffect, useState } from "react";
import Map from "../Map";
import Loading from "../Loading";
import { createCountry, fetchCountryList } from "../../services/countryService";
import { createCity } from "../../services/cityService";
import { useCity } from "../../context/CityProvider";
import {createTip, deleteTip} from "../../services/tipService";
import { TipModel } from "../../models/TipModel";
import { createPicture } from "../../services/pictureService";
import { toast } from "react-toastify";
import {redirect, useNavigate} from "react-router-dom";

const AddTips = () => {
  const { cityDetails, setCityDetails } = useCity();
  const [country, setCountry] = useState<string>("");
  const [countriesList, setCountriesList] = useState<CountryName[]>([]);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [pictureFiles, setPictureFiles] = useState<File[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCountries = await fetchCountryList();
        const convertedCountries = fetchedCountries.map((country) => ({
          code: null,
          name: country.name,
          alpha3Code: country.alpha3Code,
          latlgn: country.latlgn,
        }));
        setCountriesList(convertedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddTipsSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const selectedCountry = countriesList.find((c) => c.name === country);
      const newCountry = await createCountry({ name: selectedCountry!.name }, token!);
      const newCity = await createCity({
        name: cityDetails.city,
        idCountry: newCountry.id,
        zipCode: cityDetails.postcode,
      });
      const userId = localStorage.getItem("id");
      if (!userId) {
        return;
      }
      const tips: TipModel = {
        name: name,
        price: price,
        idCity: newCity.id,
        address: cityDetails.address,
        approvate: "false",
        idUser: userId,
        lng: cityDetails.lng,
        lat: cityDetails.lat,
        nbApprobation: 3,
      };

      if (!tips.name || !tips.idCity || !tips.address) {
        return;
      }
      if (!token) {
        return;
      }
      const tipsResponse = await createTip(tips, token);
      if (!tipsResponse || !tipsResponse.id) {
        return;
      }
      for (const file of pictureFiles) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          await createPicture(formData, userId, tipsResponse.id);
        } catch (error) {
          await deleteTip(tipsResponse.id, token);
          // @ts-ignore
          toast.error(error.message, {
            position: "top-center",
            autoClose: 3000,
            className: "toast",
          });
          return;
        }
      }
      //      navigate(`/tips/${tipsResponse.id}`);
      navigate(`/destinations`);
      toast.success("Tips ajouté avec succès !", {
        position: "top-center",
        autoClose: 1500,
        className: "toast",
      });
    } catch (error) {
      console.log("Erreur lors de l'ajout du tips:", error);
      toast.error("Erreur d'enregistrement du tips", {
        position: "top-center",
        autoClose: 3000,
        className: "toast",
      });
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };
  const selectedCountry = countriesList.find((c) => c.name === country);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPictureFiles(Array.from(event.target.files));
    }
  };

  return (
    <div className="tips-container">
      <h1>Ajouter un Tips</h1>
      <div className="add-tips-form">
        <form onSubmit={handleAddTipsSubmit}>
          <div className="form-group">
            <label htmlFor="country" className="country-input">
              Choisissez un pays :
            </label>
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
          </div>
          <div className="map-tips">
            {selectedCountry ? (
              <Map
                isInteractive={true}
                initialPosition={{
                  lat: selectedCountry?.latlgn?.[0],
                  lng: selectedCountry?.latlgn?.[1],
                }}
                zoom={5}
                onLocationSelect={(location) => {
                  console.log("Nouvelle position sélectionnée:", location);
                }}
              />
            ) : (
              <Loading width={400} height={400} />
            )}
          </div>
          <div className="form-group">
            <label>Adresse:</label>
            <input type="text" className="input-form-add-tips" value={cityDetails.address} readOnly />
          </div>
          <div className="form-group">
            <label>Ville:</label>
            <input type="text" className="input-form-add-tips" value={cityDetails.city}  />
          </div>
          <div className="form-group">
            <label>Code postal:</label>
            <input type="text" className="input-form-add-tips" value={cityDetails.postcode} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nom du tips:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Fourchette de prix:</label>
            <input
              type="range"
              id="price"
              min="0"
              max="100"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pictureList">Photos:</label>
            <input
              id="pictureList"
              type="file"
              className="picture-input-form-add-tips"
              name="pictureList"
              multiple
              onChange={handleFileChange}
            />
          </div>
            <button
              type="submit"
              value="Envoyer"
              className="submit-button-form"
            >
              Envoyer
            </button>
        </form>
      </div>
    </div>
  );
};

export default AddTips;
