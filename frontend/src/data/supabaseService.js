export default {
  async getTransactionsByAccount(accountName) {
    try {
      const resp = await fetch(
        "http://localhost:3000/transactions/user/${accountName}",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ← include httpOnly cookie
        }
      );
      if (!resp.ok) {
        console.error("Unable to fetch transactions");
      } else {
        const data = await resp.json();
        return data;
      }
    } catch (error) {
      console.error("Unable to fetch transactions", error.message);
    }
  },

  async getTransactionsByMonth() {
    try {
      const resp = await fetch(
        "http://localhostt:3000/transactions/user/monthly",
        {
          method: "GET",
          headers: { "Content-Type": "application'json" },
          credentials: "include",
        }
      );
      if (!resp.ok) {
        console.error("Unable to fetch monthly transactions");
      } else {
        const data = await resp.json();
        return data;
      }
    } catch (error) {
      console.error("Unable to fetch transactions", error.message);
    }
  },

  async addTransaction(tx) {},

  async getSpendByCategory() {
    try {
      const resp = await fetch(
        "http://localhostt:3000/transactions/user/spend",
        {
          method: "GET",
          headers: { "Content-Type": "application'json" },
          credentials: "include",
        }
      );
      if (!resp.ok) {
        console.error("Unable to fetch this month's expenses");
      } else {
        const data = await resp.json();
        return data;
      }
    } catch (error) {
      console.error("Unable to fetch this month's expenses", error.message);
    }
  },
  async deleteTransaction() {},
};
