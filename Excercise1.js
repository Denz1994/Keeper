const validateTransaction = (transaction)=>{
    const requiredFields = ["customerId",  "productId", "quantity", "pricePerUnit"];
    
    for(const requiredField of requiredFields){
        if (!transaction.hasOwnProperty(requiredField)){
            throw new Error(`${requiredField} not found`);
        }
        // Todo: Can do more type checking on the object values not just property existence
    }
}


const processTransactions = (transactionArray)=>{
    if (!Array.isArray(transactionArray)){
        throw new TypeError("TransactionArray is not of type Array."); 
    }
    if (transactionArray.length === 0){
        console.warn("Empty transaction array.");
    }
      
    for(const transaction of transactionArray){
        validateTransaction(transaction)
    }

}

const main = ()=>{
    // Todo: transaction builder
    const transactions = [ 

        {customerId:'C111', productId:'P1', quantity:3, pricePerUnit:100}, 
      
        {customerId:'C2222', productId:'P2', quantity:2, pricePerUnit:50}, 
      
        {customerId:'C3333', productId:'P3', quantity:1, pricePerUnit:200}, 
      
        {customerId:'C4444', productId:'P2', quantity:5, pricePerUnit:50}, 
      
        {customerId: 'C111', productId:'P2', quantity:2, pricePerUnit:50} 
      
      ]
      // Used for testing
      const brokenTransactions = [
            { productId:'P1', quantity:3, pricePerUnit:100}, 
          
            {customerId:'C2222', quantity:2, pricePerUnit:50}, 
          
            {customerId:'C3333', productId:'P3',  pricePerUnit:200}, 
          
            {customerId:'C4444', productId:'P2', quantity:5}, 
          
            {customerId: 'C111', productId:'P2', quantity:2, pricePerUnit:50} 
          
      ] 
      
      processTransactions(transactions   )
}

main();