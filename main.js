var roleHarvester = require('role.harvester');
var roleUpgrader  = require('role.upgrader');
var roleBuilder  = require('role.builder');
var spawnLogic  = require('spawn.logic');
var memoryInit = require('memory.init')

module.exports.loop = function () {
	// Your code goes here
    memoryInit.run();
     
    // Creep Memory Dump
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    if(!Game.spawns['Spawn1'].spawning){
        console.log('Running Spawns')
        spawnLogic.run();
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            try{
                roleBuilder.run(creep);
            }
            catch(exception){
                console.error(exception);
            }
		}
    }
}