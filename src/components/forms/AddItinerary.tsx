import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { CountryModel } from "../../models/CountryModel";
import moment from "moment";

const AddItinerary = ({
  onSubmit,
  listCountry,
}: {
  onSubmit: (
    name: string,
    country: string,
    dateDebut: string,
    dateFin: string
  ) => void;
  listCountry: CountryModel[];
}) => {
  const [country, setCountry] = useState("");
  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [dateFin, setDateFin] = useState<Date | null>(null);
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (country && dateDebut && dateFin) {
      onSubmit(name, country, dateDebut.toISOString(), dateFin.toISOString());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="">Sélectionner un pays</option>
        {listCountry.map((country) => (
          <option key={country.id} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      <div>
        <label>Nom de l'itinéraire :</label>
        <input
          type="text"
          placeholder="Nom de l'itinéraire"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Date de début :</label>
        <Datetime
          value={dateDebut || undefined} // Utilisez undefined si dateDebut est null
          onChange={(date) => setDateDebut(moment(date).toDate())} // Convertit Moment en Date
        />
      </div>
      <div>
        <label>Date de fin :</label>
        <Datetime
          value={dateFin || undefined} // Utilisez undefined si dateFin est null
          onChange={(date) => setDateFin(moment(date).toDate())} // Convertit Moment en Date
        />
      </div>
      <button type="submit">Créer mon itinéraire</button>
    </form>
  );
};

export default AddItinerary;
