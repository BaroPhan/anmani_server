import { PickType } from '@nestjs/swagger';
import { Report, createReportDTO } from '../entities/report.entity';

export class CreateReportDto extends PickType(Report, createReportDTO) {}
