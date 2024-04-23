import React, {useState, createContext, useContext, Dispatch, SetStateAction, ReactNode} from "react";

interface CityContextType {
  cityDetails: {
    city: string;
    postcode: string;
    address: string;
    lat: string;
    lng: string;
  };
  setCityDetails: Dispatch<SetStateAction<{
    city: string;
    postcode: string;
    address: string;
    lat: string;
    lng: string;
  }>>;
}

const CityContext = createContext<CityContextType>({
  cityDetails: { city: "", postcode: "", address: "", lat: "", lng: ""},
  setCityDetails: () => {}
});

export const useCity = () => useContext(CityContext);

export const CityProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [cityDetails, setCityDetails] = useState({ city: "", postcode: "", address: "", lat: "", lng: "" });

  return (
    <CityContext.Provider value={{ cityDetails, setCityDetails }}>
      {children}
    </CityContext.Provider>
  );
};

export default CityProvider;
