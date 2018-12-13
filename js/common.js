Object.prototype(Object, 'clone', {
    configurable : false,
    enumerable : false,
    value : function () {
        let _obj = {};
        for(var key in this){
            _obj[key] = this[key];
        }
        return _obj;
    }
})