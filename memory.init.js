var memorySetup={


    run:function(){
        if (!Memory.generations){
            Memory.generations={}
            Memory.generations.harvesters=0
            Memory.generations.builders=0
            Memory.generations.upgraders=0
            Memory.generations.defenders=0
        }
    }
}
module.exports = memorySetup