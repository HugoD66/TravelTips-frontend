export interface ApiResponse {
  name: { common: string };
  latlng: [number, number];
  cca3: string;
  currencies: { [key: string]: { name: string } };
  capital: [string];
  region: string;
  subregion: string;
  flags: { svg: string };
}

export interface Country {
  name: string;
  latlng: [number, number];
  alpha3Code: string;
  currency: string;
  capital: string;
  region: string;
  subregion: string;
  flag: string;
}

export interface CountryName {
  name: string;
  alpha3Code: string;
  latlgn: [number, number];
}
