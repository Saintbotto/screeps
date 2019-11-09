var short = require('movement.Shortest');
var movetoOptions = {reusePath: 50,visualizePathStyle: {    
                stroke: '#ffffff',
                lineStyle: 'dashed',
                strokeWidth: .1,
                opacity: .3}}


var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var hungryStructures=[]
        var hungryStructures=creep.room.find(FIND_MY_STRUCTURES).filter(e =>e.energy<e.energyCapacity);
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var nearestSource=short.calculate(sources,creep);
            if(creep.harvest(nearestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearestSource,movetoOptions)
            }
        }
        else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1'],movetoOptions);
            }
        }else if (hungryStructures.length>0){
            //console.log(hungryStructures)
            var nearestHungry=short.calculate(hungryStructures,creep)
            if(creep.transfer(nearestHungry, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearestHungry,movetoOptions);
            }
        }else if (hungryStructures.length==0 && creep.carry.energy === creep.carryCapacity){
            //console.log(`${creep.name} Spawner is Full`)
            var flags= creep.room.find(FIND_FLAGS);
            creep.moveTo(flags[0],movetoOptions);

        }
	}
};

module.exports = roleHarvester;