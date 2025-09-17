import { IUploadValidationStrategy } from '../upload-validate-strategy.interface';

export interface IStorageService {
  generateTempUploadUrl(key: string): Promise<string>;
  moveTempToOfficial(
    tempKey: string,
    officialKey: string,
    strategy: IUploadValidationStrategy,
  ): Promise<void>;

  deleteFile(key: string): Promise<void>;
  getSignedPreviewUrl(key: string): Promise<string>;

  buildPreviewUrlWithCdn(key: string, bucket: string): string;
}

export const IStorageService = Symbol('IStorageService');
