import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, Host, Location, City, HousingType} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private parseHost(host: string): Host {
    const [name, email, avatarUrl, password, isPro] = host.split(';');
    return {
      name,
      email,
      avatarUrl,
      password,
      isPro: isPro === 'pro'
    };
  }

  private parseLocation(location: string) : Location {
    const [lat, lng] = location.split(';');
    return {
      latitude: Number(lat),
      longitude: Number(lng)
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n') // массив строк
      .filter((row) => row.trim().length > 0) // убрать пустые строки
      .map((line) => line.split('\t')) // массив данных
      .map(
        ([
          title,
          description,
          date,
          city,
          previewImage,
          images,
          isPremium,
          isFavorite,
          rating,
          type,
          bedrooms,
          maxAdults,
          price,
          goods,
          host,
          location
        ]) => (
          {
            title,
            description,
            postDate: new Date(date),
            city: City[city as keyof typeof City],
            previewImage,
            images: images.split(';'),
            isPremium: isPremium === 'true',
            isFavorite: isFavorite === 'true',
            rating: Number(rating),
            type: HousingType[type as keyof typeof HousingType],
            bedrooms: Number(bedrooms),
            maxAdults: Number(maxAdults),
            price: Number(price),
            goods: goods.split(';'),
            host: this.parseHost(host),
            location: this.parseLocation(location)
          })
      );
  }
}
