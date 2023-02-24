import { LightningElement, wire } from 'lwc';
import getExpenses from '@salesforce/apex/ExpenseController.getExpenses';

const COLUMNS = [
    { label: 'Category', fieldName: 'Category__c', type: 'text' },
    { label: 'Amount', fieldName: 'Amount__c', type: 'currency' },
    { label: 'Expense Date', fieldName: 'Expense_Date__c', type: 'date' },
    { label: 'Weekly Basis', fieldName: 'Weekly_basis__c', type: 'checkbox' },
    { label: 'Monthly Basis', fieldName: 'Monthly_basis__c', type: 'checkbox' }
];

export default class ExpenseList extends LightningElement {
    expenses;
    columns = COLUMNS;

    @wire(getExpenses)
    wiredExpenses({ error, data }) {
        if (data) {
            this.expenses = data;
        } else if (error) {
            console.error('Error retrieving expenses: ' + error);
        }
    }
}
