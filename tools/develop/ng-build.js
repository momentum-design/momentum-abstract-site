const path = require('path');
const fs = require('fs');
const {getArgs} = require('../common/args');
const { exec } = require('child_process');

class MyBuilder {

    config;
    
    constructor() {
        const args = getArgs();
        this.config = Object.assign({
            dist: './dist',
            baseHref: 'file:///Users/yulhuang/github/momentum-design/momentum-abstract-site/dist/'
        }, args);
        if(args && typeof args.baseHref !== 'string' && typeof args.repo === 'string') {
            const _repo  = args.repo.split('/');
            if(_repo.length>1) {
                if(_repo[0].toLowerCase()) {
                    this.config.baseHref = `https://jsonic.net/${_repo[1]}/`.toLowerCase();
                } else {
                    this.config.baseHref = `https://${_repo[0]}.github.io/${_repo[1]}/`.toLowerCase();
                }
            }
        }
        this.config.distPath = path.resolve(__dirname, '../../',this.config.dist);
    }

    async ngBuild() {
        return new Promise((resolve, reject)=>{
            exec(`ng build momentum --output-path '${this.config.dist}' --configuration=production --base-href '${this.config.baseHref}'`, (err, stdout, stderr) => {
                const list = fs.readdirSync(this.config.distPath);
                list.forEach((fileName)=>{
                    const _folder = path.join(this.config.distPath, fileName);
                    const stat = fs.lstatSync(_folder);
                    if(stat.isDirectory() ) {
                        const fileIndex = path.join(_folder,'index.html');
                        const file404 = path.join(_folder,'404.html');
                        if(fs.existsSync(fileIndex)){
                            fs.copyFileSync(fileIndex, file404);
                        }
                    }
                });
                resolve(1);
            });
        });
    }

    async build() {
        await this.ngBuild();
    }

}

new MyBuilder().build();