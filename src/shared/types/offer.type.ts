import { Host } from './host.type.js';
import { Location } from './location.type.js';
import { City } from './city.enum.js';
import { HousingType } from './housing.enum.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  host: Host;
  location: Location;
}
