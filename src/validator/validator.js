const isValidField = function (value){
    if ( typeof value === 'undefined'  || value === null) return false;
    if ( typeof value === 'string' && value.trim().length === 0 ) return false;
    return true
}

const isValidRequestBody = function (requestBody){
    return Object.keys(requestBody).length > 0
}

const isValidURL = function (link){
    let URLRegex = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([A-Za-z0-9]+\.)(jpg|jpeg|png)$/
    return (URLRegex.test(link))
}

const isValidMobile = function (mobile){
    return (/^[6-9]{1}[0-9]{9}$/.test(mobile))
}

const isValidEmail = function (email){
    return (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
}

const isValidPassword = function (password){
    return (/[a-z A-Z 0-9]{4,16}$/.test(password))
}

const isValidObjectId = function (MongoId){
    return (/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(MongoId))
}

const isValidName = function (name){
    return (/^[a-z A-Z ]{2,70}$/.test(name))
}

module.exports= {isValidField,isValidRequestBody,isValidURL,isValidMobile, isValidEmail, isValidPassword, isValidObjectId, isValidName  }


// regexp

