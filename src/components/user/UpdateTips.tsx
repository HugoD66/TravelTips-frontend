import { CountryName } from "../../models/CountryData";
import React, { useEffect, useState } from "react";
import Map from "../Map";
import Loading from "../Loading";
import { createCountry, fetchCountryList } from "../../services/countryService";
import { createCity } from "../../services/cityService";
import { useCity } from "../../context/CityProvider";
import { updateTip } from "../../services/tipService";
import { TipModel } from "../../models/TipModel";
import { createPicture } from "../../services/pictureService";

interface AddTipsProps {
  selectedTips: TipModel | null;
}

const UpdateTips: React.FC<AddTipsProps> = ({ selectedTips }) => {
  const { cityDetails, setCityDetails } = useCity();
  const [country, setCountry] = useState<string>("");
  const [countriesList, setCountriesList] = useState<{ name: string }[]>([]);
  const [name, setName] = useState<string>(selectedTips?.name || "");
  const [city, setCity] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [pictureFiles, setPictureFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCountries = await fetchCountryList();
        const countryName = fetchedCountries.map((country) => ({
          name: country.name,
        }));
        setCountriesList(countryName);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTips) {
      const idCity = selectedTips.idCity;
      if (idCity && typeof idCity === "object") {
        setCountry(idCity.idCountry?.name || "");
        setName(selectedTips.name);
        setPrice(selectedTips.price);
        setCity(idCity.name || "");
        setZipCode(idCity.zipCode || "");
        setAddress(selectedTips.address || "");
      }
    }
  }, [selectedTips]);

  const handleUpdateTipsSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (!selectedTips) {
        setError("Aucun tips sélectionné pour la modification");
        return;
      }

      // Mettre à jour les détails du pays et de la ville si nécessaire
      const selectedCountry = countriesList.find((c) => c.name === country);
      const newCountry = selectedCountry
        ? await createCountry({ name: selectedCountry.name })
        : null;
      const newCity = await createCity({
        name: cityDetails.city,
        idCountry: newCountry
          ? newCountry.id
          : selectedTips &&
            typeof selectedTips === "object" &&
            selectedTips.idCity &&
            typeof selectedTips.idCity === "object" &&
            selectedTips.idCity.idCountry
          ? selectedTips.idCity.idCountry
          : "",
        zipCode: cityDetails.postcode,
      });

      const userId = localStorage.getItem("id");
      if (!userId) {
        setError("Il faut être connecté pour modifier un tips");
        return;
      }

      const updatedTips: TipModel = {
        ...selectedTips,
        name: name,
        price: price,
        idCity: newCity.id,
        address: cityDetails.address,
        approvate: "false",
        idUser: userId,
        lng: cityDetails.lng,
        lat: cityDetails.lat,
        nbApprobation: selectedTips.nbApprobation - 1,
      };

      if (!updatedTips.name || !updatedTips.idCity || !updatedTips.address) {
        setError("Vous devez remplir tous les champs");
        return;
      }

      if (!token) {
        setError("Erreur token");
        return;
      }

      await updateTip(updatedTips, token);
      setSuccess("Tips modifié avec succès !");
      setAddress("");
      setCity("");
      setCountry("");
      setName("");
      setPrice(0);
    } catch (error) {
      setError("Une erreur est survenue lors de la modification du tips");
    }
  };
  const handleLocationSelect = (location: any) => {
    setCityDetails({
      ...cityDetails,
      address: location.address,
      city: location.city,
      postcode: location.postcode,
      lng: location.lng,
      lat: location.lat,
    });
    setAddress(location.address);
    setCity(location.city);
    setZipCode(location.postcode);
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
      <h1>Modifier un Tips</h1>
      <div className="add-tips-form">
        <form onSubmit={handleUpdateTipsSubmit}>
          <div className="form-group">
            <label htmlFor="country" className="country-input">
              Choisissez un pays
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
                  lat: parseInt(cityDetails.lat),
                  lng: parseInt(cityDetails.lng),
                }}
                onLocationSelect={handleLocationSelect}
              />
            ) : (
              <Loading width={400} height={400} />
            )}
          </div>
          <div className="form-group">
            <label>Adresse:</label>
            <input type="text" value={address} readOnly />
          </div>
          <div className="form-group">
            Ville: <input type="text" value={city} readOnly />
          </div>
          <div className="form-group">
            <label>
              Code postal:
              <input type="text" value={zipCode} readOnly />
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
              name="pictureList"
              multiple
              onChange={handleFileChange}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              value="Envoyer"
              className="submit-button-form"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default UpdateTips;
