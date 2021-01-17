module.exports = {
    getRandomIntInclusive: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    roll: function(qty, type) {
        let results = [];
        for(var i = 0; i < qty;  i++){
            results.push(this.getRandomIntInclusive(1, type));
        }
        
        return {
            "rollResults" : {
                "individualResults" : results,
                "sum" : results.reduce((a, b) => a + b)
            }
        }
    }
}

