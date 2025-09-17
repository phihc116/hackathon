import { IsNotEmpty } from 'class-validator';

export class JwtConfigValidation {
  @IsNotEmpty()
  JWT_ISS: string | undefined;
  @IsNotEmpty()
  JWT_AUD: string | undefined;
  @IsNotEmpty()
  JWT_ACCESS_TTL: string | undefined;
  @IsNotEmpty()
  JWT_REFRESH_TTL: string | undefined;
  @IsNotEmpty()
  JWT_CLOCK_SKEW: number | undefined;
  @IsNotEmpty()
  JWT_SECRET: string | undefined;
}

export default () => ({
  jwt: {
    iss: process.env.JWT_ISS,
    aud: process.env.JWT_AUD,
    access_token_ttl: process.env.JWT_ACCESS_TTL,
    refresh_token_ttl: process.env.JWT_REFRESH_TTL,
    clock_skew: process.env.JWT_CLOCK_SKEW,
    secret: process.env.JWT_SECRET,
  },
});
