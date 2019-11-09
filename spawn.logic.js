var listofRolls=['harvester','upgrader','builder']
var enemies = Game.spawns["Spawn1"].room.find(FIND_HOSTILE_CREEPS)
var construction = Game.spawns["Spawn1"].room.find(FIND_MY_CONSTRUCTION_SITES)


var spawnLogic ={
    run: function(){
      

        var listofHarvesters=[]
        var listofBuilders=[]
        var listofUpgraders=[]
        var listofDefenders=[]
        var creepBody=[]
        var creepName=''
        var creepMemory={memory:{working:false,role:'undefined',subClass:'undefined'}}
        //console.log(creepMemory)
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
        else if (creep.memory.role == 'defender'){
            listofDefenders.push(creep)
        }
    }
    console.log(`${listofHarvesters.length} ${listofBuilders.length} ${listofUpgraders.length} ${listofDefenders.length}`)
        
        if(listofHarvesters.length<3){
            console.log('Suggesting a Harvester')
            creepBody=[WORK,WORK,MOVE,CARRY]
            creepName='Harvester'
            creepMemory.memory.role=creepName.toLowerCase()
        }else if(listofBuilders.length<3 && construction.length>0){
            console.log('Sugesting a Builder')
            creepBody=[WORK,WORK,MOVE,CARRY]
            creepName='Builder'
            creepMemory.memory.role=creepName.toLowerCase()
            //creepMemory.push({memory:{role:'builder', working: false}})
        }else if(listofUpgraders.length<3){
            console.log('Suggesting an Upgrader')
            creepBody=[WORK,WORK,MOVE,CARRY]
            creepName='Upgrader'
            creepMemory.memory.role=creepName.toLowerCase()
    
        }else if(listofDefenders.length<2){
            console.log('Sugesting a Defender')
            creepBody=[ATTACK,ATTACK,MOVE]
            creepName='Defender'
            creepMemory.memory.role=creepName.toLowerCase()
        }
        try{
            console.log('Can I spawn?: ' + Game.spawns['Spawn1'].spawnCreep(creepBody,creepName+Memory.generations[creepName.toLowerCase()+'s']+1,creepMemory.dryRun=true)==0)
            creepMemory.dryRun=false
            console.log('attempting spawn')
            if(Game.spawns['Spawn1'].spawnCreep(creepBody,creepName+Memory.generations[creepName.toLowerCase()+'s']+1,creepMemory)===0){
                console.log('spawn Sucess')
                console.log(`Spawning ${creepName} ${creepBody} ${creepMemory.memory.role} ${creepMemory.memory.working} ${creepName} ${Memory.generations[creepName.toLowerCase()+'s']}`)
                Memory.generations[creepName.toLowerCase()+'s']++
            }
        
        }catch(Exception){
            console.log(Exception)
        }
        
}
}

module.exports = spawnLogic;