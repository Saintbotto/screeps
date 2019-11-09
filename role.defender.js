var short = require('movement.Shortest');
var movetoOptions = {visualizePathStyle: {    
                stroke: '#ffffff',
                lineStyle: 'dashed',
                strokeWidth: .1,
                opacity: .3}}


var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS)
        if(creep.attack(enemies[0])==ERR_NOT_IN_RANGE){
            creep.moveTo(enemies[0],movetoOptions)
        }else if (enemies =='') {
            //console.log('success')
            creep.moveTo(Game.flags["Defender Parking"],movetoOptions)
        }
    }
};

module.exports = roleDefender