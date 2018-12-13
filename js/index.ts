interface _CONFIG {
    reg: object,
    length: number,
    required: boolean
};

class ObjectCheck{
    config : object;
    _FUNCTION_MAP:any = {
        reg: (item:any) => {
            if(item['reg'].test(item.value)){
                return false;
            } else {
                return true;
            }
        },
        length: (item:any) => {
            if(item.value.length > item.length){
                return false;
            } else {
                return true;
            }
        },
        required: (item:any) =>{
            let required: boolean = item.required;
            if(required){
                if(item.value != undefined || item.value != ''){
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
    };
    constructor(config:object){
        this.config= ObjectCheck.ObjectClone(config);
        return this
    }

    static ObjectClone(param:any){
        let obj:any = {};
        for(let key in param){
            obj[key] = param[key];
        }
        return obj;
    }
}

export default ObjectCheck;