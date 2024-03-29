export interface TripInterface {
  _id: string,
  name: string;
  targetCountry: string;
  startDate: string;
  endDate: string;
  price: number;
  amountOfFreePlaces: number;
  description: string;
  imgSrc: string;
  allMiniImgSrc: string[],
  allLargeImgSrc: string[]
  __v: number
  }