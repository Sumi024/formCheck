"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var ObjectCheck = /** @class */ (function () {
    function ObjectCheck(config) {
        this._FUNCTION_MAP = {
            reg: function (item) {
                if (item['reg'].test(item.value)) {
                    return false;
                }
                else {
                    return true;
                }
            },
            length: function (item) {
                if (item.value.length > item.length) {
                    return false;
                }
                else {
                    return true;
                }
            },
            required: function (item) {
                var required = item.required;
                if (required) {
                    if (item.value != undefined || item.value != '') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return true;
                }
            }
        };
        this.config = ObjectCheck.ObjectClone(config);
        return this;
    }
    ObjectCheck.ObjectClone = function (param) {
        var obj = {};
        for (var key in param) {
            obj[key] = param[key];
        }
        return obj;
    };
    return ObjectCheck;
}());
exports.default = ObjectCheck;
