export function filterTransactionsByAcctName(Tx, selectedAccount) {
  if (!Tx || !selectedAccount)
    return {
      Education: 0,
      Rent: 0,
      Utilities: 0,
    };
  console.log(Tx[selectedAccount]);
  return Tx[selectedAccount];
}
