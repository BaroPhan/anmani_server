import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as seedData from './reports.seed.json';
import { Report } from 'src/reports/entities/report.entity';

@Injectable()
export class ReportsSeedService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async seed() {
    const reports = await this.reportRepository.countBy({
      name: In(seedData.map(({ name }) => name)),
    });
    if (reports !== seedData.length)
      await this.reportRepository.upsert(seedData, ['id']);
  }
}
