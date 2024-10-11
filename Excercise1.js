/*

Notes:
- Reports are reused to calculate min and max values
- Anonymization function is rudimentary and shouldn't be used in production
- Todos added as personal notes and places for improvement

Tools used:
- Development: javascript, vscode, vscode debugger, and terminal
- References: MDN Docs
 
 */

const isNullish = (value)=>{
    return value === '' || value === null || value === undefined;
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
        if (transaction.anonymizedCustomerId in expenditureReport){
            expenditureReport[transaction.anonymizedCustomerId] += expenditure;
        } else{
            expenditureReport[transaction.anonymizedCustomerId] = expenditure;
        }
    }
    return expenditureReport;
}
const getProductExpenditureReport = (transactions) => {
    // {customerID: totalExpenditure}
    let expenditureReport = {};

    for(transaction of transactions){
        
        if (transaction.anonymizedProductId in expenditureReport){
            expenditureReport[transaction.anonymizedProductId] += transaction.quantity;
        } else{
            expenditureReport[transaction.anonymizedProductId] = transaction.quantity;
        }
    }
    return expenditureReport;
}

const getHighestTotalExpenditure = (customerReport) => {
    let maxExpenditure = 0;
    let customerIds = [];

    for (const [id, expenditure] of Object.entries(customerReport)){
        if (expenditure > maxExpenditure){
            customerIds = [id];
            maxExpenditure = expenditure;
        }
        else if (expenditure === maxExpenditure){
            customerIds.push(id);
        }
    }
    
    return { "Customer Ids": customerIds, "Max Expenditure": maxExpenditure };
}

const getLowestTotalExpenditure = (customerReport) => {
    let minExpenditure = Infinity;
    let customerIds = [];

    for (const [id, expenditure] of Object.entries(customerReport)){
        if (expenditure < minExpenditure){
            customerIds = [id];
            minExpenditure = expenditure;
        }
        else if (expenditure === minExpenditure){
            customerIds.push(id);
        }
    }
    minExpenditure = minExpenditure === Infinity ? 0 : minExpenditure;
    return { "Customer Ids": customerIds, "Lowest Expenditure": minExpenditure };
}

const getHighestProductQuantitySold = (productReport) =>{
    let maxUnitsSold = 0;
    let productIds = [];

    for (const [id, unitsSold] of Object.entries(productReport)){
        if (unitsSold > maxUnitsSold){
            productIds = [id];
            maxUnitsSold = unitsSold;
        }
        else if (unitsSold === maxUnitsSold){
            productIds.push(id);
        }
    }
    
    return { "Product Ids": productIds, "Max Units Sold": maxUnitsSold };
}

const processTransactions = (transactionArray)=>{
    if (!Array.isArray(transactionArray)){
        throw new TypeError("TransactionArray is not of type Array."); 
    }
    if (transactionArray.length === 0){
        console.warn("Empty transaction array.");
    }
      
    // Operation 1
    // {customerId:anonymizedId} -> Used to store duplicate customer transactions. We need a way to track customerIds to avoid anonymizing the same customerId.
    const anonymizedCustomerIds = {};
    const anonymizedProductIds = {};
    for(let transaction of transactionArray){
        validateTransaction(transaction);
        // This works because we handle null values in anonymizeTransaction. So if the anonymized*Id value doesn't exist in our objects, then we generate one in the function. 
        transaction = anonymizeTransaction(anonymizedCustomerIds[transaction.customerId], anonymizedProductIds[transaction.productId], transaction);
        anonymizedCustomerIds[transaction.customerId] =transaction.anonymizedCustomerId;
        anonymizedProductIds[transaction.productId] = transaction.anonymizedProductId;
    }
    
    // Operation 2
    const customerExpenditureReport = getCustomerExpenditureReport(transactionArray);
    console.info('\nCUSTOMER EXPENDITURE REPORT\n');
    console.table(customerExpenditureReport)
    console.info('\n==========================================================\n');


    // Operation 3
    const highestTotalExpenditure = getHighestTotalExpenditure(customerExpenditureReport);
    console.info('\nHIGHEST TOTAL EXPENDITURE\n');
    console.table(highestTotalExpenditure);
    console.info('\n==========================================================\n');


    // Operation 4
    const lowestTotalExpenditure = getLowestTotalExpenditure(customerExpenditureReport);
    console.info('\nLOWEST TOTAL EXPENDITURE\n');
    console.table(lowestTotalExpenditure);
    console.info('\n==========================================================\n');

    // Operation 5
    const productExpenditureReport = getProductExpenditureReport(transactionArray);
    console.info('\nPRODUCT EXPENDITURE REPORT\n');
    console.table(productExpenditureReport);

    const highestProductQuantitySold = getHighestProductQuantitySold(productExpenditureReport);
    console.info('\nHIGHEST PRODUCT QUANTITY SOLD\n');
    console.table(highestProductQuantitySold);
    console.info('\n==========================================================\n');

}
// Todo: Use UUIDs? Salting hash function? 
const buildMask = (originalId)=>{
    let maskedId = ''
    for (const character of originalId){
        maskedId += Math.floor((Math.random()*100)).toString()
    }
    return maskedId;
}

// TODO: Function signature can get out of hand quickly. Spread operator or object comparator?
const anonymizeTransaction = (previouslyAnonymizedCustomerId, previouslyAnonymizedProductId, transaction)=>{
    // We escape building a mask for our ids if one already exists.
    const anonymizedCustomerId = previouslyAnonymizedCustomerId || buildMask(transaction.customerId);
    const anonymizedProductId =  previouslyAnonymizedProductId || buildMask(transaction.productId);
    transaction.anonymizedCustomerId = anonymizedCustomerId;
    transaction.anonymizedProductId = anonymizedProductId;
    return transaction;
}
const main = ()=>{
    // Todo: transaction builder
    const transactions = [ 
        {customerId:'C111', productId:'P1', quantity:3, pricePerUnit:100}, 
        
        {customerId:'C2222', productId:'P2', quantity:2, pricePerUnit:50}, 
        
        {customerId:'C3333', productId:'P3', quantity:1, pricePerUnit:200}, 
        
        {customerId:'C4444', productId:'P2', quantity:5, pricePerUnit:50}, 
        
        {customerId: 'C111', productId:'P2', quantity:2, pricePerUnit:50},
        
        {customerId:'C5555', productId:'P6', quantity:8, pricePerUnit:50}, 
        
        {customerId:'C5555', productId:'P7', quantity:9, pricePerUnit:50}, 


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