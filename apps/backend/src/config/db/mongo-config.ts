import { IsNotEmpty } from 'class-validator';

export class DatabaseConfigValidation {
  @IsNotEmpty()
  MONGO_URL: string | undefined;
}

export default () => ({
  database: {
    url: process.env.MONGO_URL,
  },
});
