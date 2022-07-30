import { ApiResponseProperty } from "@nestjs/swagger";

export class DtoPaginationResult<T> {
  @ApiResponseProperty()
  data?: T[];

  @ApiResponseProperty()
  beforeCursor?: string;

  @ApiResponseProperty()
  afterCursor?: string;

  @ApiResponseProperty()
  pageSize: number;

  @ApiResponseProperty()
  totalCount?: number;

  constructor(obj: Partial<DtoPaginationResult<T>>) {
    Object.assign(this, obj);
  }
}
