import { Injectable } from '@nestjs/common';
import { Expense } from './expense.model';
import { ExpenseService } from './expense.service'; // Додати імпорт для ExpenseService

@Injectable()
export class ExpenseReportService {
    private expenses: Expense[] = []; // Додати властивість expenses

    constructor(private readonly expenseService: ExpenseService) {
        this.expenses = []; // Ініціалізувати expenses у конструкторі
    }

    private loadExpenses() {
        this.expenses = this.expenseService.findAll(); // Завантажити витрати
    }

    getReport(startDate: string, endDate: string) {
        this.loadExpenses(); // Завантажити витрати перед фільтрацією
        console.log('Expenses:', this.expenses); // Додати логування
        const filteredExpenses = this.expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
        });

        const totalAmount = filteredExpenses.reduce((total, expense) => total + expense.amount, 0);
        const categoryTotals = filteredExpenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});

        const categoryPercentages = Object.keys(categoryTotals).map(category => ({
            category,
            percentage: ((categoryTotals[category] / totalAmount) * 100).toFixed(2),
        }));

        return {
            totalAmount,
            categoryPercentages,
        };
    }
}
