import {
  GenericImageUploadService,
  IGenericImageUploadService,
  TGenericImageUploadResponse
} from './services/genericImageUploadService';

import { PostimagesORG } from './services/postimagesORG';

export type ImageUploadServiceName =
  | 'postimages.org'

const services = {
  'postimages.org': PostimagesORG
};

export class ImageUploadService implements IGenericImageUploadService {
  private uploader: GenericImageUploadService;

  constructor(serviceName: ImageUploadServiceName, token: string) {
    const ServiceClass = services[serviceName];
    if (!ServiceClass) {
      throw new Error(`Invalid service name: ${serviceName}`);
    }
    this.uploader = new ServiceClass(token);
  }

  async uploadFromBinary(
    imageData: Buffer,
    filename: string
  ): Promise<TGenericImageUploadResponse> {
    return this.uploader.uploadFromBinary(imageData, filename);
  }

  async uploadFromFile(
    filePath: string,
    filename?: string
  ): Promise<TGenericImageUploadResponse> {
    return this.uploader.uploadFromFile(filePath, filename);
  }

  async uploadFromUrl(
    url: string,
    randomFilename: boolean
  ): Promise<TGenericImageUploadResponse> {
    return this.uploader.uploadFromUrl(url, randomFilename);
  }
}
