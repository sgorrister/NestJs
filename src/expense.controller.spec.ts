import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { Expense } from './expense.model';

describe('ExpenseController', () => {
    let expenseController: ExpenseController;
    let expenseService: ExpenseService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExpenseController],
            providers: [
                {
                    provide: ExpenseService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn().mockImplementation(() => undefined), // Виправлення тут
                    },
                },
            ],
        }).compile();

        expenseController = module.get<ExpenseController>(ExpenseController);
        expenseService = module.get<ExpenseService>(ExpenseService);
    });

    it('should be defined', () => {
        expect(expenseController).toBeDefined();
    });

    it('should create an expense', () => {
        const expense: Expense = { description: 'Test Expense', amount: 100, date: '2024-12-19' };
        jest.spyOn(expenseService, 'create').mockImplementation(() => expense);
        expect(expenseController.create(expense)).toBe(expense);
    });

    it('should return all expenses', () => {
        const result: Expense[] = [];
        jest.spyOn(expenseService, 'findAll').mockImplementation(() => result);
        expect(expenseController.findAll()).toBe(result);
    });

    it('should return a single expense', () => {
        const expense: Expense = { description: 'Test Expense', amount: 100, date: '2024-12-19' };
        jest.spyOn(expenseService, 'findOne').mockImplementation(() => expense);
        expect(expenseController.findOne('0')).toBe(expense);
    });

    it('should update an expense', () => {
        const expense: Expense = { description: 'Updated Expense', amount: 150, date: '2024-12-20' };
        jest.spyOn(expenseService, 'update').mockImplementation(() => expense);
        expect(expenseController.update('0', expense)).toBe(expense);
    });

    it('should remove an expense', () => {
        jest.spyOn(expenseService, 'remove').mockImplementation(() => undefined); // Виправлення тут
        expect(expenseController.remove('0')).toBeUndefined();
    });
});
