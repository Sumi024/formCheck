const _FUNCTION_MAP = {
    reg: (item) => {
        return !item['reg'].test(item.value);
    },
    length: (item) => {
        return item.value.length > item.length;
    }
    ,
    required: (item) =>{
        let required = item.required;
        if(required) {
            return item.value !== undefined && item.value !== '';
        } else {
            return true;
        }
    }
};

class ObjectCheck{
    /**
     * @param 格式为{
     *                  [name] : {
     *                                value : [value],
     *                                reg : [reg],
     *                                required : [boolean]
     *                           },
     *                  ...
     *              }
     */
    constructor(param){
        this.param= ObjectCheck.ObjectClone(param);
        let list = Object.keys(this.param);
        if(list.length > 0){
            list.map( (val) => {
                this.param[val].status = false;
            });
            this.bindEvent(this.param);
        }
        this.errParamList = [];
        this.paramCheckAll();
        return this;
    }

    bindEvent(param){
        let _this = this;
        for(let key in param){
            let el = document.querySelector(`input[name=${key}]`);
            el.addEventListener('change', (e) => {
                _this.paramCheck(e.target,e);
            });
            el.addEventListener('keyup', (e) => {
                _this.paramCheck(e.target,e);
            });
        }
    }

    /**
     * @param DOM元素对象
     * @param window.event对象
     */

    paramCheck(el,event) {
        this.param[el.name].value = el.value;
        for(let key in this.param[el.name]){
            if(key in _FUNCTION_MAP){
                if(!_FUNCTION_MAP[key](this.param[el.name])){
                    console.log(`Err: check param ${key} faile!`);
                    this.param[el.name].callback({
                            reason : key,
                        }
                    );
                    return this.param[el.name].status = false;
                }
            }
        }
        return this.param[el.name].status = true;
    }

    paramCheckAll() {
        this.errParamList = [];
        for (let key in this.param) {
            if (this.param[key].required && !this.param[key].status) {
                this.errParamList.push(key);
            }
        }
        return this.errParamList.length === 0;
    }


    static ObjectClone(param){
        let obj = {};
        for(let key in param){
            if(Object.keys(param[key]).length > 0){
                obj[key] = ObjectCheck.ObjectClone(param[key]);
            } else {
                obj[key] = param[key];
            }
        }
        return obj;
    }
}

window.ObjectCheck = ObjectCheck;