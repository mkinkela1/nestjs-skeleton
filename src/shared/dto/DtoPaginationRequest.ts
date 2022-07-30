import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";
import { Order } from "typeorm-cursor-pagination";
import { BaseEntity } from "src/entities/base.entity";
import { Type } from "class-transformer";

export class DtoPaginationRequest<T extends BaseEntity> {
  @ApiPropertyOptional()
  @IsString()
  beforeCursor?: string = null;

  @ApiPropertyOptional()
  @IsString()
  afterCursor?: string = null;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  @Type(() => Number)
  pageSize?: number = 20;

  @ApiPropertyOptional()
  @IsString()
  sortBy?: keyof T = "createDateTime";

  @ApiPropertyOptional({ enum: Order })
  @IsString()
  orderBy?: Order = Order.ASC;
}
