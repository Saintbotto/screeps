var short = require('movement.Shortest');
var movetoOptions = {reusePath: 50,visualizePathStyle: {    
                stroke: '#ffffff',
                lineStyle: 'dashed',
                strokeWidth: .1,
                opacity: .3}}


var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        var currentBuildSites=creep.room.find(FIND_CONSTRUCTION_SITES)
        var damagedStructures=creep.room.find(FIND_MY_STRUCTURES).filter(structure => structure.hits<structure.hitsMax).sort((a,b)=>creep.pos.findPathTo(a)-creep.pos.findPathTo(b))
        var heavilyDamagedStructures=damagedStructures.filter(structure => (structure.hits<structure.hitsMax*.2 && structure.structureType==='road'))
                                                                    
        var nearEastBuildSite =short.calculate(currentBuildSites,creep)
        console.log(nearEastBuildSite)
        try{
            if(creep.memory.working===false && creep.carry.energy < creep.carryCapacity ) {
            console.log(`${creep.name} extract resources`)
                var sources = creep.room.find(FIND_SOURCES);
                var nearestSource=short.calculate(sources,creep);
                if(creep.harvest(nearestSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearestSource,movetoOptions)
                }
            }
            else if(heavilyDamagedStructures.length>0){
                console.log(`${creep.name} Repair Heavy Damage`)
                creep.memory.working=true
                var nearestRepair= short.calculate(heavilyDamagedStructures,creep)
                if(creep.repair(nearestRepair) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(nearestRepair,movetoOptions);
                    }
                    if(creep.carry.energy===0||heavilyDamagedStructures.length===0){
                        creep.memory.working=false
                    }
                
            }
            else if(nearEastBuildSite ) {
                console.log(`${creep.name} Building`)
                    creep.memory.working=true
                    if(creep.build(nearEastBuildSite) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(nearEastBuildSite,movetoOptions);
                    }
                    if(creep.carry.energy===0||!nearEastBuildSite){
                        creep.memory.working=false
                    }
            }else if (!nearEastBuildSite && damagedStructures){
                console.log(`${creep.name} Parking`)
                var nearestRepair= short.calculate(damagedStructures,creep)
                if(creep.repair(nearestRepair) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(nearestRepair,movetoOptions);
                    }
                
            }
            else if (!nearEastBuildSite){
                console.log(`${creep.name} Something Else?`)
                creep.moveTo(Game.flags["Builder Parking"],movetoOptions)
            }else{
                console.log(`${creep.name} Shits Broken`)
            }
        }catch(exception){
            console.log('wtf')
            console.log(exception)
    }
}

};

module.exports = roleBuilder;