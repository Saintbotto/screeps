var listofRolls=['harvester','upgrader','builder']


var spawnLogic ={
    run: function(){
        var simpleHarvester= Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE,CARRY],'Harvester'+Memory.generations.harvesters, {memory:{role:'harvester', working: false}})
        var simpleUpgrader= Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE,CARRY],'Upgrader'+Memory.generations.upgraders, {memory:{role:'upgrader', working: false}})
        var simpleBuilder= Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE,CARRY],'Builder'+Memory.generations.builders, {memory:{role:'builder', working: false}})

        var listofHarvesters=[]
        var listofBuilders=[]
        var listofUpgraders=[]
        for(name in Game.creeps){
            var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester'){
            listofHarvesters.push(creep)
        }
        else if (creep.memory.role =='builder'){
            listofBuilders.push(creep)
        }
        else if (creep.memory.role == 'upgrader'){
            listofUpgraders.push(creep)
        }
    }
    console.log(`${listofHarvesters.length} ${listofBuilders.length} ${listofUpgraders.length}`)
        if(listofHarvesters.length<3){
            console.log('Suggesting a Harvester')
            Memory.generations.harvesters+=1
            return simpleHarvester
            
        }else if(listofUpgraders.length<3){
            console.log('Suggesting an Upgrader')
            Memory.generations.upgraders+=1
            return simpleUpgrader
            
        }else if(listofBuilders.length<3){
            console.log('Sugesting a Builder')
            Memory.generations.builders+=1
            return simpleBuilder
            
        }
}
}

module.exports = spawnLogic;