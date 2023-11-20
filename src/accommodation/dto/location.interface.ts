interface ILocation {
  country: string;
  region: string;
  city: string;
  st_bu: string;
  room: string;
  position: {
    longitude: number;
    latitude: number;
  };
}
