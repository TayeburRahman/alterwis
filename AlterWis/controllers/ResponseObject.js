exports.successResponseObject = (data, message) => {
    return {
        data,
        messages:  [
            {
                "type":1,
                "title":"Success",
                "message": message
            }
        ] ,
        hasErrors: false,
        isValid: true
    }
}

exports.errorResponseObject = (data, message) => {
    return {
        data,
        messages: [
            {
                "type":0,
                "title":"Error",
                "message": message
            }
        ] ,
        hasErrors: true,
        isValid: false
    }
}