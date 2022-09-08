const {getArgs} = require('../common/args');
const { exec } = require('child_process');
const args = getArgs();

const _generate = ()=> {
    let commands = [
        `cd src/components`,
        `mkdir ${args.name}`,
        `ng generate module ${args.name}`,
        `ng generate c ${args.name} --module=${args.name} --export=true --prefix=mds --skip-tests --style=scss`
    ]
    return new Promise((resolve, reject)=>{
        exec(commands.join(' && '), (err, stdout, stderr) => {
            resolve(1);
        });
    });
}

const generate =  async ()=> {
    await _generate();
}

generate();