export const ColorHelper = {
    css_rgba(rgba:any) {
        return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
    },
    _rgba(colors:any[]) {
        return colors.map((c:any)=> { return `${c.rgba.r},${c.rgba.g},${c.rgba.b},${c.rgba.a}`}).join(' ');
    },
    _hex(colors:any[]) {
        return colors.map((c:any)=> { return c.hex}).join(' ');
    },
    css_linear(colors:any[]) {
        let _colors = colors.map((c)=>{
            return this.css_rgba(c.rgba);
        });
        return `linear-gradient(to right, ${_colors.join(',')})`;
    },
    htmlData(source:any) {
        return Object.keys(source).map((key)=>{
            const _obj = source[key];
            return {
              name: key,
              tokens: Object.keys(_obj).map((token)=>{
                const _item = _obj[token];
                if(_item.colors) {
                    let _colors = Object.values(_item.colors).slice(0,2);
                    return {
                        token: token,
                        hex: this._hex(_colors),
                        rgba: this._rgba(_colors),
                        css: this.css_linear(_colors)
                      }
                } else {
                    return {
                        token: token,
                        hex: this._hex([_item]),
                        rgba: this._rgba([_item]),
                        css: this.css_rgba(_item.rgba)
                    }
                }
              })
            }
          });
    }
};