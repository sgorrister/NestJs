import { Injectable } from '@nestjs/common';
import { Expense } from './expense.model';

@Injectable()
export class ExpenseService {
    private expenses: Expense[] = [];

    create(expense: Expense) {
        this.expenses.push(expense);
        return expense;
    }

    findAll() {
        return this.expenses;
    }

    findOne(id: string) {
        return this.expenses.find((expense, index) => index.toString() === id);
    }

    update(id: string, expense: Expense) {
        const index = this.expenses.findIndex((exp, idx) => idx.toString() === id);
        if (index > -1) {
            this.expenses[index] = expense;
            return expense;
        }
        return null;
    }

    remove(id: string) {
        const index = this.expenses.findIndex((exp, idx) => idx.toString() === id);
        if (index > -1) {
            return this.expenses.splice(index, 1);
        }
        return null;
    }
}
