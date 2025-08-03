const mockTx = [
  {
    transaction_id: 1,
    date: 1750377600000,
    description: "Food @ Eataly",
    category: "Restaurant + Take Outs",
    account: "Checking-USBANK",
    amount: -90.56,
    type: "Expense",
  },
  {
    transaction_id: 2,
    date: 1750377600000,
    description: "Snacks",
    category: "Restaurant + Take Outs",
    account: "Checking-USBANK",
    amount: -4.36,
    type: "Expense",
  },
  {
    transaction_id: 3,
    date: 1750377600000,
    description: "AT&T",
    category: "Utilities",
    account: "Checking-USBANK",
    amount: -31.59,
    type: "Expense",
  },
  {
    transaction_id: 4,
    date: 1750636800000,
    description: "UPS",
    category: "Miscellaneous",
    account: "Checking-USBANK",
    amount: -15.0,
    type: "Expense",
  },
  {
    transaction_id: 5,
    date: 1750636800000,
    description: "Walmart Shopping",
    category: "Food",
    account: "Checking-USBANK",
    amount: -156.38,
    type: "Expense",
  },
  {
    transaction_id: 6,
    date: 1750636800000,
    description: "Uber",
    category: "Transportation",
    account: "Checking-USBANK",
    amount: -33.12,
    type: "Expense",
  },
  {
    transaction_id: 7,
    date: 1750636800000,
    description: "Outing @Tipsy Putt Rib",
    category: "Entertainment",
    account: "Checking-USBANK",
    amount: -100.99,
    type: "Expense",
  },
  {
    transaction_id: 8,
    date: 1750636800000,
    description: "OpenAI",
    category: "Education",
    account: "Checking-USBANK",
    amount: -20.0,
    type: "Expense",
  },
  {
    transaction_id: 10,
    date: 1750032000000,
    description: "Zelle Transfer to Marie",
    category: "Miscellaneous",
    account: "Savings-USBANK",
    amount: -300.0,
    type: "Expense",
  },
  {
    transaction_id: 11,
    date: 1750032000000,
    description: "HSA-Marcus",
    category: "Transfer",
    account: "Savings-USBANK",
    amount: 900.0,
    type: "Income",
  },
  {
    transaction_id: 12,
    date: 1749686400000,
    description: "Zelle Transfer Uncle Di",
    category: "Miscellaneous",
    account: "Savings-USBANK",
    amount: -130.0,
    type: "Expense",
  },
  {
    transaction_id: 13,
    date: 1749686400000,
    description: "Credit-USBANK",
    category: "Transfer",
    account: "Savings-USBANK",
    amount: -334.71,
    type: "Expense",
  },
];

let budgets = [
  {
    budget_id: 1,
    category: "Education ",
    budget: 50.0,
  },
  {
    budget_id: 2,
    category: "Rent",
    budget: 1900.0,
  },
  {
    budget_id: 3,
    category: "Utilities",
    budget: 315.0,
  },
  {
    budget_id: 4,
    category: "Subscription Service",
    budget: 53.85,
  },
  {
    budget_id: 5,
    category: "Transportation",
    budget: 570.0,
  },

  {
    budget_id: 6,
    category: "Entertainment",
    budget: 100.0,
  },
  {
    budget_id: 7,
    category: "Shopping",
    budget: 150.0,
  },
  {
    budget_id: 8,
    category: "Household",
    budget: 100.0,
  },
  {
    budget_id: 9,
    category: "Food",
    budget: 200.0,
  },
  {
    budget_id: 10,
    category: "Restaurant + Take Outs",
    budget: 150.0,
  },
  {
    budget_id: 11,
    category: "Student Loan",
    budget: 900.0,
  },
  {
    budget_id: 12,
    category: "Education Fund",
    budget: 200.0,
  },
];

const category = [
  "Education",
  "Rent",
  "Utilities",
  "Subscription Service",
  "Transportation",
  "Vacation",
  "Entertainment",
  "Shopping",
  "Household",
  "Food",
  "Restaurant + Take Outs",
];

let account = [
  {
    acct_id: 1,
    acct_name: "Checking-USBANK",
    institution: "USBANK",
    type: "Checking",
    balance: 2283.1,
  },
  {
    acct_id: 2,
    acct_name: "Savings-USBANK",
    institution: "USBANK",
    type: "Savings",
    balance: 501.62,
  },
  {
    acct_id: 3,
    acct_name: "Credit-USBANK",
    institution: "USBANK",
    type: "Credit",
    balance: -687.69,
  },
];

const monthly_transactions = [
  {
    month: "2025-01",
    amount: 7199,
  },
  {
    month: "2025-02",
    amount: 8129,
  },
  {
    month: "2025-03",
    amount: 4800,
  },
  {
    month: "2025-04",
    amount: 5436,
  },
  {
    month: "2025-05",
    amount: 6695,
  },
  {
    month: "2025-06",
    amount: 3704,
  },
];
const budget_limit = [
  {
    category: "Education",
    spent: 125,
    limit: 50,
    // remaining: -75,
  },

  {
    category: "Rent",
    spent: 1906,
    limit: 1895,
    // remaining: -11,
  },
  {
    category: "Subscription Service",
    spent: 53.85,
    limit: 60,
    // remaining: -6.15,
  },
  {
    category: "Transportation",
    spent: 570,
    limit: 550,
    // remaining: -20,
  },
  {
    category: "Food",
    spent: 400,
    limit: 200,
    // remaining: -200,
  },
  {
    category: "Restaurant + Take Outs",
    spent: 195,
    limit: 150,
    // remaining: -45,
  },
  {
    category: "Student Loan",
    spent: 750,
    limit: 900,
    // remaining: 150,
  },
  {
    category: "Education Fund",
    spent: 0,
    limit: 200,
    // remaining: 200,
  },
];

export default {
  async getTransaction() {
    return mockTx;
  },
  async getTransactionsByAccount(accountName) {
    return mockTx.filter((tx) => tx.account === accountName);
  },
  async getTransactionsByMonth() {
    return monthly_transactions;
  },
  async addTransaction(tx) {
    mockTx.push({ transaction_id: 9, date: Date.now(), ...tx });
    console.log(mockTx);
  },
  async getSpendByCategory() {
    const filteredTx = mockTx.filter((tx) => tx.type === "Expense");
    const spendCategory = filteredTx.reduce((acc, tx) => {
      const { category, account, amount, ...rest } = tx;
      if (!acc[account]) {
        acc[account] = {};
      }
      if (!acc[account][category]) {
        acc[account][category] = 0;
      }
      acc[account][category] += -1 * Number(amount);
      return acc;
    }, {});
    // console.log(spendCategory);
    return spendCategory;
  },
  async deleteTransaction(tx_id) {
    mockTx.filter((tx) => tx.transaction_id !== tx_id);
    console.log(mockTx);
    return mockTx;
  },
  async getAccounts() {
    // console.log(account);
    return account;
  },
  async getAccountName() {
    return ["Savings-USBANK", "Checking-USBANK", "Credit-USBANK"];
  },
  async getAccountById(id) {
    // console.log(account);
    return account.filter((acct) => acct.acct_id == id);
  },
  async addAccount(acct) {
    account.push({ acct_id: 4, ...acct });
    console.log(account);
  },
  async updateAccount(newAcct) {
    return account.forEach((acct) => {
      if (acct.acct_id === newAcct.acct_id) {
        (acct.acct_name = newAcct.acct_name), (acct.balance = newAcct.balance);
      }
    });
  },
  async deleteAccount(acct_id) {
    const newAccount = account.filter((acct) => acct.acct_id != acct_id);
    account = newAccount;
    return account;
  },
  async getSpendByCategoryAndBudget() {
    return budget_limit;
  },
  async getBudgets() {
    return budgets;
  },
  async getBudgetProgress() {
    return budget_limit;
  },
  async getBudgetById(budget_id) {
    return budgets.filter((budget) => budget_id == budget.budget_id);
  },
  async deleteBudget(budget_id) {
    const newBudgets = budgets.filter(
      (budget) => budget.budget_id !== budget_id
    );
    budgets = newBudgets;
    console.log(budgets);
    return budgets;
  },
  async addBudget(budget) {
    budgets.push({ budget_id: 13, ...budget });
  },
  async updateBudget(newBudget) {
    const idx = budgets.findIndex((b) => b.budget_id === newBudget.budget_id);
    if (idx === -1) {
      throw new Error(`Budget with id ${newBudget.budget_id} not found`);
    }
    // replace that index with a new object (immutable approach)
    budgets[idx] = {
      ...budgets[idx],
      category: newBudget.category,
      budget: newBudget.budget,
    };

    // return the updated array
    return budgets;
  },

  async getCategory() {
    return category;
  },
};
