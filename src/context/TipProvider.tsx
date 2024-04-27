import React, {useState, createContext, useContext, Dispatch, SetStateAction, ReactNode} from "react";
import {TipModel} from "../models/TipModel";

interface TipContextType {
  tipDetail: TipModel;
  setTipDetail: Dispatch<SetStateAction<TipModel>>;
}

const TipContext = createContext<TipContextType>({
  tipDetail: new TipModel(), // Utiliser une nouvelle instance de TipModel comme valeur par défaut
  setTipDetail: () => {}
});

export const useTip = () => useContext(TipContext);

export const TipProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [tipDetail, setTipDetail] = useState<TipModel>(new TipModel()); // Initialiser avec une nouvelle instance de TipModel

  return (
    <TipContext.Provider value={{ tipDetail, setTipDetail }}>
      {children}
    </TipContext.Provider>
  );
};

export default TipProvider;
