import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationQuery {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page = 1;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit = 10;
}
