

module.exports = (fieldName, message = "Field required", required = true) => {
    return {
        fieldName, 
        message,
        required
    }
}