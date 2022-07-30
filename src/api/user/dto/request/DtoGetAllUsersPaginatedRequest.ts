import { DtoPaginationRequest } from "src/shared/dto/DtoPaginationRequest";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { BaseEntity } from "src/entities/base.entity";

export class DtoGetAllUsersPaginatedRequest extends DtoPaginationRequest<BaseEntity> {
  @ApiPropertyOptional()
  @IsString()
  search?: string = "";
}
