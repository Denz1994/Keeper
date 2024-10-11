/**
 * 
 Question: Why is id parameter necessary for creates if we always set the id to max + 1.
 */

const isNullish = (value)=>{
    return value === null || value === undefined;
}

const scoreMutation = (type, id, score) => {
    const scoreArray = [{"id": 1, "score": 1}, { "id": 2, "score": 2}]

    // Validation of parameters
    const allowedTypes = new Set(["create", "read", "update", "delete"]);
    if (isNullish(type)){
        throw Error("Type parameter is nullish");
    }
    if (!allowedTypes.has(type)){
        throw Error(`Type parameter must be either "create", "read", "update", "delete"`);
    }
    if (type !== "create" && isNullish(id)){
        throw Error("Id parameter is required");
    }
    if ((type === "create" || type === "update") && isNullish(score)){
        throw Error("Score parameter is required");
    }

    // CRUD Operations


    // CREATE:
    if (type === "create"){
        let maxId = 0;
        for (scoreObject of scoreArray){
            if(scoreObject.id === id){
                throw Error(`Duplicate score id found: ${id}`);
            }
            maxId = Math.max(maxId, scoreObject.id)
        }
        scoreArray.push({"id":maxId + 1, "score": score});
        console.table(scoreArray);
    }
    // READ:
    else if (type === "read"){
        for (scoreObject of scoreArray){
            if(scoreObject.id === id){
                return scoreObject;
            }
        }
        console.warn(`No entry found for id: ${id}`);
        return null;
    }
    // UPDATE:
    else if (type === "update"){
        for (scoreObject of scoreArray){
            if(scoreObject.id === id){
                scoreObject.score = score;
                console.table(scoreArray);
                return;
            }
        }
        console.warn(`No entry found for id: ${id}`);
        
    }
    // DELETE:
    else if (type === "delete"){
        for (let i = 0; i < scoreArray.length; i++){
            if(scoreArray[i].id === id){
                scoreArray.splice(i,1);
                return scoreArray;
            }
        }
        console.warn(`No entry found for id: ${id}`);
        return null;
    }
}

main = ()=>{
   console.log("\nCREATE\n")
   scoreMutation('create', null, 3);
   
   console.log("\nREAD\n")
   console.log(scoreMutation('read', 2, null));

   console.log("\nUPDATE\n")
   scoreMutation('update', 2, 3);
   
   console.log("\nDELETE\n")
   console.table(scoreMutation('delete', 2, null));
}

main();