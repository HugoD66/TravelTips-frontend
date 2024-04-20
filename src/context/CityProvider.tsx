import React, {useState, createContext, useContext, Dispatch, SetStateAction, ReactNode} from "react";

interface CityContextType {
  cityDetails: {
    city: string;
    postcode: string;
  };
  setCityDetails: Dispatch<SetStateAction<{
    city: string;
    postcode: string;
  }>>;

}

const CityContext = createContext<CityContextType>({
  cityDetails: { city: "", postcode: "" },
  setCityDetails: () => {}
});

export const useCity = () => useContext(CityContext);


export const CityProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [cityDetails, setCityDetails] = useState({ city: "", postcode: "" });

  return (
    <CityContext.Provider value={{ cityDetails, setCityDetails }}>
      {children}
    </CityContext.Provider>
  );
};

export default CityProvider;
