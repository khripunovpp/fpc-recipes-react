export const isEmpty = val => {
    return val.length ? false : true;
}

export const errorsLabel = {
    required: "This is required field",
    oneRequired: "You must select at least one item",
    empty: "The field shoudn't be empty"
}