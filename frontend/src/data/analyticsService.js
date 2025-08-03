
export default {
    async getSpendByCategory(mockTx){
    const spendCategory = mockTx.reduce((acc, tx) => {
        if (!acc(tx.category)){
            acc[tx.category] = 0 
        }
        acc(tx.categroy) += tx.amount;
    }, 
    {});
    return spendCategory;
    },
    
}