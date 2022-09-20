const { buildColor } = require('./build-color');
const { buildIcon } = require('./build-icon');
const { buildFont } = require('./build-font');
const { buildSonic } = require('./build-sonic');

const _build =  async ()=> {
    await buildColor();
    await buildIcon();
    await buildFont();
    await buildSonic();
}

_build();