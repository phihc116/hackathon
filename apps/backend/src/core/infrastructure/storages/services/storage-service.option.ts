import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	IStorageOptionsService,
	STORAGE_CONFIG_KEY,
} from '../../../config/storage/storage-service.option.interface';

@Injectable()
export class StorageOptionsService {
	constructor(private readonly configService: ConfigService) {}

	private get config(): IStorageOptionsService {
		const config =
			this.configService.get<IStorageOptionsService>(STORAGE_CONFIG_KEY);

		if (!config) {
			throw new Error(
				`Storage configuration not found for key: ${STORAGE_CONFIG_KEY}`,
			);
		}

		return config;
	}

	get bucket(): string {
		return this.config.bucket;
	}

	get endpoint(): string {
		return this.config.endpoint;
	}

	get accessKeyId(): string {
		return this.config.accessKeyId;
	}

	get secretAccessKey(): string {
		return this.config.secretAccessKey;
	}

	get region(): string {
		return this.config.region;
	}

	get uploadUrlExpiresIn(): number {
		return this.config.uploadUrlExpiresIn;
	}

	get previewUrlExpiresIn(): number {
		return this.config.previewUrlExpiresIn;
	}

	get cdnUrl(): string {
		return this.config.cdnUrl;
	}
}
