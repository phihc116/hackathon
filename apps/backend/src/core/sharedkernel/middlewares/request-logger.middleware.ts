import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
	private readonly logger = new Logger(RequestLoggerMiddleware.name);
	use(req: Request, res: Response, next: NextFunction) {
		const { method, originalUrl } = req;
		const start = Date.now();

		this.logger.log(`[REQ]::[${method}] ${originalUrl}`);

		res.on('finish', () => {
			const duration = Date.now() - start;
			const { statusCode, errored } = res;

			this.logger.log(
				`[RES]::[${method}] ${originalUrl} - Status: ${statusCode} - ${duration}ms`,
			);

			if (errored) this.logger.error(`[ERROR]:: ${errored.message}`);
		});

		next();
	}
}
