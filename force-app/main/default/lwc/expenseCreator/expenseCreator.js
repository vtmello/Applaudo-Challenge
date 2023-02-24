import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import insertExpense from '@salesforce/apex/ExpenseController.insertExpense';
import getPicklistValues from '@salesforce/apex/ExpenseController.getPicklistValues';
import getExpenses from '@salesforce/apex/ExpenseController.getExpenses';


export default class ExpenseForm extends LightningElement {
    @track expenseName;
    @track amount;
    @track expenseDate;
    @track category;
    @track monthlyBasis = false ;
    @track weeklyBasis = false;
    @track isChecked = false;
    @track picklistValues = [];

    @wire(getPicklistValues)
    wiredPicklistValues({ error, data }) {
      if (data) {
        this.picklistValues = data.map((value) => {
          return { label: value, value: value };
        });
      } else if (error) {
      console.log(error);
      }
    }
    

  handlePicklistChange(event) {
    this.selectedValue = event.detail.value;
  }

    handleExpenseNameChange(event) {
        this.expenseName = event.target.value;
    }

    handleAmountChange(event) {
        this.amount = event.target.value;
    }

    handleExpenseDateChange(event) {
        this.expenseDate = event.target.value;
    }

    handleCategoryChange(event) {
        this.category = event.target.value;
    }

    handleExpenseMonthlyChange(event) {
        this.monthlyBasis = event.target.checked;
    }

    handleExpenseWeeklyChange(event) {
        this.weeklyBasis = event.target.checked;
    }

    handleSubmit() {
        insertExpense({ name: this.expenseName, amount: this.amount, expenseDate: this.expenseDate, category: this.category, weeklyBasis: this.weeklyBasis, monthlyBasis: this.monthlyBasis })
            .then(result => {
                console.log('Expense created with record Id: ' + result);

                const evt = new ShowToastEvent({
                  title: 'Success',
                  message: 'Expense created with record Id: ' + result,
                  variant: 'success',
                  mode: 'dismissable'
                });
              this.dispatchEvent(evt);
                this.picklistValues = '';
                this.amount = '';
                this.expenseDate = '';
                this.category = '';
                this.isChecked = false;
            })
            .catch(error => {
              const evt = new ShowToastEvent({
                title: 'Error',
                message: 'Unfortunately, couldn´t be created the expense. Please, let the Administrador knows.',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
                console.error('Error creating expense: ' + error);
            });
    }
}
