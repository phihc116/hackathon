import {
  S3Client,
  PutObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Inject, Injectable } from '@nestjs/common';
import { IStorageService } from '../../abstractions/storage-service.interface';
import { IStorageOptionsService } from '../../../../config/storage/storage-service.option.interface';
import { IUploadValidationStrategy } from '../../upload-validate-strategy.interface';

@Injectable()
export class R2StorageService implements IStorageService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;

  constructor(
    @Inject(IStorageOptionsService)
    private readonly storageOptionsService: IStorageOptionsService,
  ) {
    this.bucket = storageOptionsService.bucket;
    this.s3Client = new S3Client({
      region: storageOptionsService.region,
      endpoint: storageOptionsService.endpoint,
      credentials: {
        accessKeyId: storageOptionsService.accessKeyId,
        secretAccessKey: storageOptionsService.secretAccessKey,
      },
    });
  }
  buildPreviewUrlWithCdn(key: string, bucket: string): string {
    return `${this.storageOptionsService.cdnUrl}/${bucket}/${key}`;
  }

  generateTempUploadUrl(key: string): Promise<string> {
    const expiresInSeconds = this.storageOptionsService.uploadUrlExpiresIn;

    const command = new PutObjectCommand({ Bucket: this.bucket, Key: key });

    return getSignedUrl(this.s3Client, command, {
      expiresIn: expiresInSeconds,
    });
  }

  async moveTempToOfficial(
    tempKey: string,
    officialKey: string,
    strategy: IUploadValidationStrategy,
  ): Promise<void> {
    const metadata = await this.s3Client.send(
      new HeadObjectCommand({
        Bucket: this.bucket,
        Key: tempKey,
      }),
    );

    strategy.validate({
      key: tempKey,
      contentType: metadata.ContentType!,
      contentLength: metadata.ContentLength!,
    });

    await this.s3Client.send(
      new CopyObjectCommand({
        Bucket: this.bucket,
        CopySource: `${this.bucket}/${tempKey}`,
        Key: officialKey,
      }),
    );

    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: tempKey,
      }),
    );
  }

  async deleteFile(key: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: key }),
    );
  }

  async getSignedPreviewUrl(key: string): Promise<string> {
    const expiresInSeconds = this.storageOptionsService.previewUrlExpiresIn;

    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });

    return getSignedUrl(this.s3Client, command, {
      expiresIn: expiresInSeconds,
    });
  }
}
