let keyValid = function (value) {
    if (typeof (value) == "undefined" || value == null){ console.log("1st"); return false ; }
    if (typeof (value) === "string" && value.trim().length == 0){ console.log("1st"); return false ; }    //  string 
    return true
}

keyValid(given)