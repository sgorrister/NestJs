import { Controller, Get, Query } from '@nestjs/common';
import { ExpenseReportService } from './expense-report.service';

@Controller('report')
export class ExpenseReportController {
    constructor(private readonly expenseReportService: ExpenseReportService) {}

    @Get()
    getReport(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
        return this.expenseReportService.getReport(startDate, endDate);
    }
}
