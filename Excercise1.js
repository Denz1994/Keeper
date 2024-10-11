const isNullish = (value)=>{
    return value === '' || null || undefined;
}

const validateTransaction = (transaction)=>{
    const requiredFields = ["customerId",  "productId", "quantity", "pricePerUnit"];
    
    for(const requiredField of requiredFields){
        if (!transaction.hasOwnProperty(requiredField)){
            throw new Error(`${requiredField} not found.`);
        }
        if (isNullish(transaction[requiredField]) ){
            throw new Error(`${requiredField} is nullish.`)
        }
        // Todo: Can do more type checking on the object values not just property existence
    }
}

const getCustomerExpenditureReport = (transactions) => {
    // {customerID: totalExpenditure}
    let expenditureReport = {};

    for(transaction of transactions){
        let expenditure = transaction.pricePerUnit * transaction.quantity;
        if (transaction.customerId in expenditureReport){
            expenditureReport[transaction.customerId] += expenditure;
        } else{
            expenditureReport[transaction.customerId] = expenditure;
        }
    }
    return expenditureReport;
}


const processTransactions = (transactionArray)=>{
    if (!Array.isArray(transactionArray)){
        throw new TypeError("TransactionArray is not of type Array."); 
    }
    if (transactionArray.length === 0){
        console.warn("Empty transaction array.");
    }
      
    // Operation 1
    for(let transaction of transactionArray){
        validateTransaction(transaction);
        transaction = anonymizeTransaction(transaction);
    }
    
    // Operation 2
    const customerExpenditureReport = getCustomerExpenditureReport(transactionArray);
    console.info('\nCUSTOMER EXPENDITURE REPORT\n');
    // Todo: Format column headers? ids and value
    console.table(customerExpenditureReport)
}
// Todo: Use UUIDs? Salting hash function? 
const buildMask = (originalId)=>{
    let maskedId = ''
    for (const character of originalId){
        maskedId += Math.floor((Math.random()*100)).toString()
    }
    return maskedId;
}

const anonymizeTransaction = (transaction)=>{
    const anonymizedCustomerId = buildMask(transaction.customerId);
    const anonymizedProductId = buildMask(transaction.productId);
    transaction.customerId = anonymizedCustomerId;
    transaction.productId = anonymizedProductId;
    return transaction;
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
      processTransactions(transactions)
}

main();