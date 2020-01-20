module.exports =  function parseArrayAsString(arrayAsString) {
    
    return arrayAsString.split(',').map(tec=> tec.trim());
}