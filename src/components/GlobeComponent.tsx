import React, { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import axios from 'axios';
import { Country, ApiResponse } from '../models/CountryData';

const GlobeComponent: React.FC<{ onCountryClick: (country: Country) => void }> = ({ onCountryClick }) => {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        axios.get<ApiResponse[]>('https://restcountries.com/v3.1/all')
          .then(response => {
            const fetchedCountries = response.data.map((country): Country => ({
              name: country.name.common,
              latlng: country.latlng,
              alpha3Code: country.cca3,
              currency: country.currencies ? country.currencies[Object.keys(country.currencies)[0]].name : 'N/A',
              capital: country.capital ? country.capital[0] : 'Unknown',
              region: country.region,
              subregion: country.subregion,
              flag: country.flags.svg,
            }));
            setCountries(fetchedCountries);
          })
          .catch(error => console.error("Fetching countries data failed", error));
      }, []);
      

  return (
    <Globe
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
      pointsData={countries}
      pointLat={(point) => (point as Country).latlng[0]} 
      pointLng={(point) => (point as Country).latlng[1]} 
      pointLabel={(point) => (point as Country).name} 
      pointColor={() => '#f5f5f5'}
      onPointClick={(point) => onCountryClick(point as unknown as Country)}
      pointRadius={0.5}
      backgroundColor="rgba(0, 0, 0, 0)"
      pointAltitude={0}
    />
  );
};

export default GlobeComponent;
