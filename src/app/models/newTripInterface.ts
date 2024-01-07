export interface newTripInterface {
  
  name: string;
  targetCountry: string;
  startDate: string;
  endDate: string;
  price: number;
  amountOfFreePlaces: number;
  description: string;

  mainImg: File | null;
  allMiniImg: File[] | undefined;
  allLargeImg: File[] | undefined;
}