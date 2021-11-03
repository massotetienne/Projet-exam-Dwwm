module.exports = {

    stripTags: function (input) {
        temp=input
        tempEmpty=""
        if (temp===undefined){
            return tempEmpty
        }else{
            return temp.replace(/<(?:.|\n)*?>/gm, '');
        } 
    },
    limit: function (arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    },   
    last: function (value, n) {
        temp=value
        tempEmpty=""
        if (temp===undefined){
            return tempEmpty
        }else{
            return temp.slice(-Math.abs(n))
        }
        
    }, 
    limitChar: function (text, nb) {
        str = text
        return str.substring(0, nb) 
    },
    limitCharacter : function (text ,nb){
        str = text 
        return str.substring(0, nb) + "..."
    }
}