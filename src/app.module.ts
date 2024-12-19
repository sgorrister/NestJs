import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { ExpenseReportController } from './expense-report.controller';
import { ExpenseReportService } from './expense-report.service';

@Module({
  imports: [],
  controllers: [ExpenseController, ExpenseReportController],
  providers: [ExpenseService, ExpenseReportService],
})
export class AppModule {}
