import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum OrderDirectionEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PagingSortingQuery {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page!: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit!: number;

  @IsOptional()
  @IsString()
  public orderField?: string;

  @IsOptional()
  @IsIn(['asc', 'desc', 'ASC', 'DESC'])
  public orderDirection?: string;
  get orderDirectionEnum(): OrderDirectionEnum {
    const dir = this.orderDirection?.toUpperCase();
    return dir === 'ASC' ? OrderDirectionEnum.ASC : OrderDirectionEnum.DESC;
  }
}
