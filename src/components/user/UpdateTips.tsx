import { CountryName } from "../../models/CountryData";
import React, { useEffect, useState } from "react";
import Map from "../Map";
import Loading from "../Loading";
import { createCountry, fetchCountryList } from "../../services/countryService";
import { createCity } from "../../services/cityService";
import { useCity } from "../../context/CityProvider";
import { createTip, updateTip } from "../../services/tipService";
import { TipModel } from "../../models/TipModel";
import { createPicture } from "../../services/pictureService";

interface AddTipsProps {
  selectedTips: TipModel | null; // Le type peut être TipModel ou null
}

const UpdateTips: React.FC<AddTipsProps> = ({ selectedTips }) => {
  const { cityDetails, setCityDetails } = useCity();
  const [country, setCountry] = useState<string>(
    typeof selectedTips === "object" &&
      selectedTips?.hasOwnProperty("idCity") &&
      typeof selectedTips?.idCity === "object"
      ? selectedTips?.idCity.idCountry?.name || ""
      : ""
  );
  const [countriesList, setCountriesList] = useState<CountryName[]>([]);
  const [name, setName] = useState<string>(selectedTips?.name || "");
  const [price, setPrice] = useState<number>(selectedTips?.price || 0);
  const [pictureFiles, setPictureFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const token = localStorage.getItem("token");

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
    } catch (error) {
      setError("Une erreur est survenue lors de la modification du tips");
    }
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };
  const selectedCountry = countriesList.find((c) => c.name === country);

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
      <h1>Modifier un Tips</h1>
      <div className="add-tips-form">
        <form onSubmit={handleUpdateTipsSubmit}>
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
                isInteractive={true}
                initialPosition={{
                  lat: selectedCountry?.latlgn?.[0],
                  lng: selectedCountry?.latlgn?.[1],
                }}
                onLocationSelect={(location) => {
                  console.log("Nouvelle position sélectionnée:", location);
                  // Logique pour ajouter un marqueur ou mettre à jour le state
                }}
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
