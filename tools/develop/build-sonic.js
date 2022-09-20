const { MomentumAbstractType, mfs, mcommon } = require('momentum-constructor-common');
const path = require('path');
const write = require('write');
const { my_path } = require('../../myconfig');
const targetPath = path.resolve(my_path.assets_momentum, 'sonic');

const buildSonic = async ()=> {
    mfs.clean(targetPath);
    let files = mfs.list(MomentumAbstractType.sonic);
    let _data = {};
    files.forEach((name)=>{
        const _arr = name.split('/');
        if(_arr.length>1) {
            const _type = _arr[0];
            const _name = _arr[1];
            if(_data[_type]===undefined) {
                _data[_type] = {};
            }
            _data[_type][path.basename(_name, path.extname(_name))]=_name;
        }
    });
    write.sync(path.join(my_path.database, 'sonic.json'), JSON.stringify(_data, null, '\t'), { overwrite: true });
    mfs.save(targetPath, MomentumAbstractType.sonic);
};

exports.buildSonic = buildSonic;