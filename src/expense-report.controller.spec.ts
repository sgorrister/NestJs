import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseReportController } from './expense-report.controller';
import { ExpenseReportService } from './expense-report.service';

describe('ExpenseReportController', () => {
    let expenseReportController: ExpenseReportController;
    let expenseReportService: ExpenseReportService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExpenseReportController],
            providers: [
                {
                    provide: ExpenseReportService,
                    useValue: {
                        getReport: jest.fn(),
                    },
                },
            ],
        }).compile();

        expenseReportController = module.get<ExpenseReportController>(ExpenseReportController);
        expenseReportService = module.get<ExpenseReportService>(ExpenseReportService);
    });

    it('should be defined', () => {
        expect(expenseReportController).toBeDefined();
    });

    it('should return report', () => {
        const report = { totalAmount: 100, categoryPercentages: [] };
        jest.spyOn(expenseReportService, 'getReport').mockImplementation(() => report);
        expect(expenseReportController.getReport('2024-01-01', '2024-12-31')).toBe(report);
    });
});
