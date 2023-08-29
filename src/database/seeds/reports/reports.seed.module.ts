import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsSeedService } from './reports.seed.service';
import { Report } from 'src/reports/entities/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [ReportsSeedService],
  exports: [ReportsSeedService],
})
export class ReportsSeedModule {}
