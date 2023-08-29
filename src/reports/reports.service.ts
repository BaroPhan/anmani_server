import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
  ) {}

  create(createReportDto: CreateReportDto) {
    return this.reportRepository.save(
      this.reportRepository.create(createReportDto),
    );
  }

  findAll() {
    return this.reportRepository.find();
  }

  findOne(id: string) {
    return this.reportRepository.findOneBy({ id });
  }

  update(id: string, updateReportDto: UpdateReportDto) {
    return this.reportRepository.update(id, updateReportDto);
  }

  remove(id: string) {
    return this.reportRepository.delete(id);
  }
}
