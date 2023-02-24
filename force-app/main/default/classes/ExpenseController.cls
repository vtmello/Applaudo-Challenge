public with sharing class ExpenseController {
    @AuraEnabled
    public static String insertExpense(Decimal amount, Date expenseDate, String category, Boolean weeklyBasis, Boolean monthlyBasis) {
        Expense__c expense = new Expense__c(Amount__c = amount, Expense_Date__c = expenseDate, Category__c = category, Weekly_basis__c = weeklyBasis, Monthly_basis__c = monthlyBasis);
        insert expense;
        return expense.Id;
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getPicklistValues() {
        List<String> values = new List<String>();
        Schema.DescribeFieldResult fieldResult = Expense__c.Category__c.getDescribe();
        List<Schema.PicklistEntry> picklistValues = fieldResult.getPicklistValues();
        for(Schema.PicklistEntry entry : picklistValues) {
            values.add(entry.getValue());
        }
        return values;
    }


    @AuraEnabled(cacheable=true)
    public static List<Expense__c> getExpenses() {
        return [SELECT Id, Name, Amount__c, Expense_Date__c, Category__c, Monthly_basis__c, Weekly_basis__c FROM Expense__c ORDER BY Expense_Date__c];
    }
        
}