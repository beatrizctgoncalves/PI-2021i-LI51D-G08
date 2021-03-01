
module.exports = function(obj) {
    let counter = obj
    
    function sum(obj) {
      counter += obj
      sum.count = function() {
        return counter
      }
      return sum
    }
    return sum
}