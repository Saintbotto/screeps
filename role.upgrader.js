var short = require('movement.Shortest');
var movetoOptions = {reusePath: 50,visualizePathStyle: {    
                stroke: '#ff0000',
                lineStyle: 'dashed',
                strokeWidth: .1,
                opacity: .3}}
var roleUpgrader = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        console.log(creep.memory.working)
	    if(creep.carry.energy <creep.carryCapacity && creep.memory.working==false) {
            var sources = creep.room.find(FIND_SOURCES);
            var nearestSource=short.calculate(sources,creep);
            if(creep.harvest(nearestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearestSource,movetoOptions);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller,movetoOptions);
            }else{
                creep.memory.working=true
                creep.upgradeController(creep.room.controller)
                creep.memory.working = creep.carry.energy==0?false:true
            }
        }
	}
};

module.exports = roleUpgrader;