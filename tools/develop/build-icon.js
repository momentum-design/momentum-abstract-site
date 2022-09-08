const { MomentumAbstractType, mfs, mcommon } = require('momentum-constructor-common');
const path = require('path');
const targetPath = path.resolve(__dirname,'../../src/assets/icon/');

const buildIcon = async ()=> {
    mfs.clean(targetPath);
    mfs.save(targetPath, MomentumAbstractType.icon, {
        whitelist: mcommon.getRegFromNames(['language_bold.svg'])
    });
};

exports.buildIcon = buildIcon;