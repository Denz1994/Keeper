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
    if (type === "create" || type === "update" && isNullish(score)){
        throw Error("Score parameter is required");
    }

    // CRUD Operations

    // CREATE:
    // if (type === "create")

}

main = ()=>{
    scoreMutation('read', null, 3)
}

main();