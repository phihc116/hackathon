export class PaginatedResult<T> {
  constructor(
    readonly data: T[],
    readonly total: number,
    readonly page: number,
    readonly limit: number,
  ) {
    this.totalPage = Math.ceil(this.total / this.limit);

    this.hasNextPage = this.page < this.totalPage;
    this.hasPreviousPage = this.page > 1;
  }

  totalPage: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}
