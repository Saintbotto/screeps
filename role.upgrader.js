var short = require('movement.Shortest');
var movetoOptions = {visualizePathStyle: {    
                stroke: '#ff0000',
                lineStyle: 'dashed',
                strokeWidth: .5,
                opacity: .5}}
var roleUpgrader = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            var nearestSource=short.calculate(sources,creep);
            if(creep.harvest(nearestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearestSource,movetoOptions);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller,movetoOptions);
            }
        }
	}
};

module.exports = roleUpgrader;