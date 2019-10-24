var short = require('movement.Shortest');
var movetoOptions = {visualizePathStyle: {    
                stroke: '#ffffff',
                lineStyle: 'dashed',
                strokeWidth: .1,
                opacity: .3}}


var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
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
        }
        else if (creep.carry.energy=== creep.carryCapacity && Game.spawns['Spawn1'].energy === Game.spawns['Spawn1'].energyCapacity){
            //console.log(`${creep.name} Spawner is Full`)
            var flags= creep.room.find(FIND_FLAGS);
            creep.moveTo(flags[0],movetoOptions);


        }
	}
};

module.exports = roleHarvester;