function random12chars() {
    var result = '';
    var possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i = 0; i < 12; i++)
        result += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    return result;
}

module.exports = random12chars;