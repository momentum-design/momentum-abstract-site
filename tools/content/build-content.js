const {getArgs} = require('../common/args');
const { execSync } = require('child_process');
const { my_path } = require('../../myconfig');
const fs = require('fs');
const path = require('path');
const write = require('write');
const { marked } = require('marked');
const hljs = require('highlight.js');

const renderer = {
    code(code, infostring, escaped) {
        return `\n<pre class='hljs'><code class='hljs'>${hljs.highlightAuto(code).value}</code></pre>\n`;
    },
    codespan(code) {
        return `<code class='hljs'>${hljs.highlightAuto(code).value}</code>`;
    }
};
  
marked.use({ renderer });

class BuildContent {

    /*
    {
        type = _nav | _components | nav-name
        name = componentName
     }
    zh: [{
        data:{}
        children:[

        ]
    }, {},{}]
    */
    regTitle = /^[\s\n\r\t]*<h1[^>]*>(.*?)<\/h1>/;
    regNameSort = /^([0-9]+)\./;
    regName = /\s|_/g;
    regPreCode = /<(pre|code)>(.|\n|\r\n\s)*<\/\1>/ig;
    source = my_path.data;
    target = my_path.assets_data;
    targetConfig = my_path.database_content;
    defaultLanguage = 'en-US';
    readData = {};
    outData = {};

    _info(name, parentArray) {
        const _matchSort = name.match(this.regNameSort);
        const _name = name.replace(this.regNameSort, '');
        const _id = _name.replace(this.regName,'-');
        return  {
            fullPath: parentArray.concat(_id).join('/'),
            id: _id,
            name: _name,
            sort: (_matchSort && _matchSort.length>1) ? +_matchSort[1] : -1
        }
    }

    _hasIndex(name) {
        return this.regNameSort.test(name);
    }

    scan() {
        const list = fs.readdirSync(this.source);
        list.filter((fileName)=>{
            const sourcePath = path.join(this.source, fileName);
            const stat = fs.lstatSync(sourcePath);
            return stat.isDirectory();
        }).forEach((lang)=>{
            this.readData[lang] = {};
            this._scan(path.join(this.source, lang),[], this.readData[lang]);
        });
    }

    _scan(rootPath, rootUrl, parent) {
        const list = fs.readdirSync(rootPath);
        list.forEach((fileName)=>{
            if(this._hasIndex(fileName)) {
                const filePath = path.join(rootPath, fileName);
                const stat = fs.lstatSync(filePath);
                let _data;
                if(stat.isDirectory() ) {
                    _data = this._info(fileName, rootUrl);
                    _data.isDirectory = true;
                    parent[_data.sort] = { $data: _data }; 
                    this._scan(filePath, rootUrl.concat(_data.id), parent[_data.sort]); 
                } else if(stat.isFile()) {
                    const ext = path.extname(fileName);
                    if(ext.toLowerCase()==='.md') {                       
                        const baseName = path.basename(fileName, ext);
                        _data = this._info(baseName, rootUrl);
                        Object.assign(_data, {
                            html: marked.parse(fs.readFileSync(filePath).toString())
                        });
                        parent[_data.sort] = { $data: _data };            
                    }
                }
            }
        });
    }

    _getPoint(obj, keys) {
        let p=obj;
        let hasNode = keys.every((k)=>{
            if(p[k]!==undefined) {
                p = p[k];
                return true;
            } else {
                return false;
            }
        });
        return hasNode ? p : false;
    }   

    _setPoint(obj, keys, value) {
        let p=obj;
        let last = keys.length-1;
        keys.forEach((k, index)=>{
            if(p[k]===undefined) {
                p[k] = {};
            }
            p = p[k];  
            if(last===index) {
                p.$data = Object.assign({}, value);
                delete p.$data.html;
            }
        });
    }   

    _file(keys, newKeys) {
        const _def = this._getPoint(this.readData[this.defaultLanguage], keys);
        Object.keys(this.readData).forEach((lang)=>{
            if(this.outData[lang]===undefined) {
                this.outData[lang] = {};
            }
            let _fileToSave={};
            let _lang = this._getPoint(this.readData[lang], keys);
            // if no file
            if(!_lang || !_lang.$data || typeof _lang.$data.id !== 'string') {
                _fileToSave = _def;
            } else {
                _lang.$data.fullPath = _def.$data.fullPath;
                _lang.$data.id = _def.$data.id;
                _fileToSave = _lang;
            }
            if(!_fileToSave.$data.isDirectory && _fileToSave.$data.html) {
                write.sync(path.join(this.target, lang ,`${newKeys.join('/')}.html`), _fileToSave.$data.html, { overwrite: true });
            }
            this._setPoint(this.outData[lang], newKeys, _fileToSave.$data);
        });
    }

    _node(node, keys, newKeys) {
        Object.keys(node).forEach((key)=>{
            if(key!=='$data') {
                let _keys = keys.concat(key);
                let _newKeys = newKeys.concat(node[key].$data.id);
                this._file(_keys, _newKeys);
                if(typeof node[key].$data.isDirectory) {
                    this._node(node[key], _keys, _newKeys);
                }
            }
        });
    }

    async generate() {
        execSync(`rm -rf ${this.target}`);
        this.scan();
        const _def = this.readData[this.defaultLanguage];
        //en-US
        if(_def) {
            this._node(_def,[],[]);
            write.sync(this.targetConfig, JSON.stringify(this.outData, undefined, '\t'), { overwrite: true });
        }
    }

    async build() {
        await this.generate();
    }
}

const buildContent = new BuildContent();
buildContent.build();