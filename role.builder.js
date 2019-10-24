var short = require('movement.Shortest');
var movetoOptions = {visualizePathStyle: {    
                stroke: '#ffffff',
                lineStyle: 'dashed',
                strokeWidth: .1,
                opacity: .3}}


var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var currentBuildSites=creep.room.find(FIND_CONSTRUCTION_SITES)
        var nearEastBuildSite =short.calculate(currentBuildSites,creep)
        try{
            if(creep.memory.working===false && creep.carry.energy < creep.carryCapacity ) {
                var sources = creep.room.find(FIND_SOURCES);
                var nearestSource=short.calculate(sources,creep);
                if(creep.harvest(nearestSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearestSource,movetoOptions)
                }
            }
            else if(nearEastBuildSite || creep.memory.working==true) {
                    creep.memory.working=true
                    if(creep.build(nearEastBuildSite) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(nearEastBuildSite,movetoOptions);
                    }
                    if(!creep.carry.energy||!nearEastBuildSite){
                        creep.memory.working=false
                    }
            }
        }catch(exception){
        console.log(exception)
    }
}

};

module.exports = roleBuilder;