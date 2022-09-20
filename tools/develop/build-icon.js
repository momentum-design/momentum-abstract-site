const { MomentumAbstractType, mfs, mcommon } = require('momentum-constructor-common');
const path = require('path');
const { my_path } = require('../../myconfig');
const targetPath = path.resolve(my_path.assets_momentum, 'icon');

const buildIcon = async ()=> {
    mfs.clean(targetPath);
    mfs.save(targetPath, MomentumAbstractType.icon, {
        whitelist: mcommon.getRegFromNames(['language_bold.svg'])
    });
};

exports.buildIcon = buildIcon;