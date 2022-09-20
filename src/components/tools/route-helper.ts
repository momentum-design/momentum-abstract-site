const regModule = /(^|[-_])\w/ig;
const regModuleRemove = /[-_]/ig;
const _rootPath =   '$root';
const _rootStrs = ['', '/',_rootPath];
const _regShortUrlStart = /^\//;
const _regShortUrlEnd = /\/$/;
export const RouteHelper = {
    dataKey: '$data',
    _moduleName(id:string):string {
        return id.replace(regModule,(word)=>{
            return  word.toUpperCase();
        }).replace(regModuleRemove, '');
    },
    module(id:string):string{
        return `${this._moduleName(id)}Module`;
    },
    import(id:string):string {
        return `./${id}/${id}.module`;
    },
    formatShortUrl(url:string):string {
        return url.split(`?`)[0].replace(_regShortUrlStart,'').replace(_regShortUrlEnd,'');
    },
    getSteps(url:string):string[] {
        return this.formatShortUrl(url).split('/');
    },
    data(routes:any[], parent:string) {
        routes.forEach((item, index)=>{
            if(item.data) {
                Object.assign(item.data, {
                    sort: typeof item.data.sort === 'number' ? item.data.sort : 100+index,
                    parent: parent,
                    path: item.path,
                    id: item.path,
                    fullPath: parent===_rootPath ? item.path : `${parent}/${item.path}`
                })
            }
        });
    },
    _relativePath(fullPath:string, root:string) {
        if(_rootStrs.indexOf(root)!==-1) {
            return fullPath;
        }
        return fullPath.replace(new RegExp(`^${root}/`),'');
    },
    _isMapDataNode(node:any) {
        return typeof node['$id'] === 'string';
    },
    addMapToRoute(routes:any[], mapNode:any, root:string, template:any) {
        const _data = mapNode[this.dataKey];
        if(_data && !_data.isDirectory) {
            // add route
            const _route = Object.assign({}, template);
            if(_route.path===undefined) {
                _route.path = this._relativePath(_data.fullPath, root);
            }
            _route.data = Object.assign({
                parent: root
            },_data );
            routes.push(_route);
        } else {
            Object.keys(mapNode).forEach((key:any)=>{
                if(key!==this.dataKey) {
                    this.addMapToRoute(routes, mapNode[key], root, template);
                }
            });
        }
    }
};