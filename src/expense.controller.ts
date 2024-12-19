import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';

@Controller('expenses')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {}

    @Post()
    create(@Body() expense: Expense) {
        return this.expenseService.create(expense);
    }

    @Get()
    findAll() {
        return this.expenseService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.expenseService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() expense: Expense) {
        return this.expenseService.update(id, expense);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.expenseService.remove(id);
    }
}
