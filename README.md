Exercise 1: 

You are given a list of transactions representing purchases made by customers in an e-commerce platform. Each transaction is represented by an object containing the following information: (customerId, productId, quantity, pricePerUnit).  



Write a function to perform the following operations: 



 Implement a data transformation function that anonymizes customer IDs and product IDs, replacing them with randomly generated identifiers. 

  Calculate the total expenditure of each customer without revealing their original IDs. 

  Implement a function to find the customer(s) with the highest total expenditure without disclosing their original IDs. 

  Implement a function to find the customer(s) with the lowest total expenditure without disclosing their original IDs. 

Implement a function to find the products(s) with the highest quantity sold without disclosing their original IDs. 



Requirements: 

  The function should take an array of transactions as input. 

  Implement each operation as a separate function or method within the same class or module. 

  Ensure proper handling of edge cases, such as an empty input list or missing fields in transactions. 

  The output should provide the results of each operation without revealing the original customer IDs or product IDs. 

 

const transactions = [ 

  {customerId:'C111', productId:'P1', quantity:3, pricePerUnit:100}, 

  {customerId:'C2222', productId:'P2', quantity:2, pricePerUnit:50}, 

  {customerId:'C3333', productId:'P3', quantity:1, pricePerUnit:200}, 

  {customerId:'C4444', productId:'P2', quantity:5, pricePerUnit:50}, 

  {customerId: 'C111', productId:'P2', quantity:2, pricePerUnit:50} 

] 

sample output 

  Total expenditure of each anonymized customer: 

  ID_1: $550 

  Anonymized customer(s) with the highest total expenditure:  

  ID_1 

  most units sold: 

  ID_1 



 

Exercise 2: 

Create a function that accepts three arguments: "type", "id", and "score". Inside the function, will contain a hardcoded array of objects. 



Example: ScoreArray = [{"id": 1, "score": 1}, { "id": 2, "score": 2}]. 

"type" will always be required and consists of four possible values ("create", "read", "update", "delete") 
"id" will only be required when ("read", "update", "delete") type is passed. 
"score" will only be required when ("create", "update") type is passed. 
If "create" type is passed, then add a new object to the ScoreArray with the value of the "score" that was passed and return the full ScoreArray. The "id" field should always be the max "id" of the ScoreArray + 1. 

If "read" type is passed, then return the corresponding object that matches the "id" that was passed. 

If "update" is passed, then update the "score" value of the corresponding object that matches the "id" that was passed and return the full ScoreArray. 

If "delete" is passed, then delete the corresponding object that matches the "id" that was passed and return the full ScoreArray. 

Note: Do not worry about persisting the changes made to the ScoreArray. Feel free to operate with the same hardcoded ScoreArray for each individual request. 

Example 1 

Example ScoreArray: [{"id": 1, "score": 1}, { "id": 2, "score": 2}]. 

Example Input: ScoreFunction("create", null/None, 3) 

 

Example Output: [{"id": 1, "score": 1}, { "id": 2, "score": 2}, {"id": 3, "score": 3}] 



Example 2 

Example ScoreArray: [{"id": 1, "score": 1}, { "id": 2, "score": 2}]. 

Example Input: ScoreFunction("read", 2, null/None) 

Example Output: { "id": 2, "score": 2} 



Example 3 

Example ScoreArray: [{"id": 1, "score": 1}, { "id": 2, "score": 2}]. 

Example Input: ScoreFunction("update", "2", 3) 

Example Output: [{"id": 1, "score": 1}, { "id": 2, "score": 3] 



Example 4 

Example ScoreArray: [{"id": 1, "score": 1}, { "id": 2, "score": 2}]. 

Example Input: ScoreFunction("delete", 2, null/None) 

Example Output: [{"id": 1, "score": 1}] 