

var shortestMovement =  {
    calculate: function(arrayOfLocations,curr){
        var shortestDistance=99999999
        var returnItem=null
        for(var i in arrayOfLocations){
            var path = curr.pos.findPathTo(arrayOfLocations[i]).length
            //console.log(`Atempt at Finding Distnace ${arrayOfLocations[i]['id']} ${path}`)
            if(path<shortestDistance){
                shortestDistance=path
                returnItem=arrayOfLocations[i]
            }
        }
        //console.log(`${curr} ${returnItem}`)
        return returnItem
    }
    
}
module.exports = shortestMovement;