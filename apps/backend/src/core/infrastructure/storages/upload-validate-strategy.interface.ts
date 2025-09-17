export interface IUploadValidationStrategy {
  validate(fileMetadata: {
    contentType: string;
    contentLength: number;
    key: string;
  }): void;
}
