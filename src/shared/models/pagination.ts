export class Pagination<PaginationObject> {
  constructor(
    public readonly items: PaginationObject[],
    public readonly itemCount: number,
    public readonly totalItems: number,
    public readonly pageCount: number,
  ) {}
}
