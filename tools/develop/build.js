const { buildColor } = require('./build-color');
const { buildIcon } = require('./build-icon');

const _build =  async ()=> {
    await buildColor();
    await buildIcon();
}

_build();