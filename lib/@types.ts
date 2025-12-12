export interface Country {
  id: string;
  name: {
    en: string;
    fr: string;
  };
  phone_code: string;
  iso_code: string;
}

export interface City {
  coid: string;
  cities: {
    name: string;
    id: string;
  }[];
}
