(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _FUNCTION_MAP = {
    reg: function reg(item) {
        return item['reg'].test(item.value);
    },
    length: function length(item) {
        return item.value.length > item.length;
    },

    required: function required(item) {
        var required = item.required;
        if (required) {
            return item.value !== undefined && item.value !== '';
        } else {
            return true;
        }
    }
};

var ObjectCheck = function () {
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
    function ObjectCheck(param) {
        var _this2 = this;

        _classCallCheck(this, ObjectCheck);

        this.param = ObjectCheck.ObjectClone(param);
        var list = Object.keys(this.param);
        if (list.length > 0) {
            list.map(function (val) {
                _this2.param[val].status = false;
            });
            this.bindEvent(this.param);
        }
        this.errParamList = [];
        this.paramCheckAll();
        return this;
    }

    _createClass(ObjectCheck, [{
        key: 'bindEvent',
        value: function bindEvent(param) {
            var _this = this;
            for (var key in param) {
                var el = document.querySelector('input[name=' + key + ']');
                el.addEventListener('change', function (e) {
                    _this.paramCheck(e.target, e);
                });
                el.addEventListener('keyup', function (e) {
                    _this.paramCheck(e.target, e);
                });
            }
        }

        /**
         * @param DOM元素对象
         * @param window.event对象
         */

    }, {
        key: 'paramCheck',
        value: function paramCheck(el, event) {
            this.param[el.name].value = el.value;
            for (var key in this.param[el.name]) {
                if (key in _FUNCTION_MAP) {
                    if (!_FUNCTION_MAP[key](this.param[el.name])) {
                        console.log('Err: check param ' + key + ' faile!');
                        return this.param[el.name].status = false;
                    }
                }
            }
            return this.param[el.name].status = true;
        }
    }, {
        key: 'paramCheckAll',
        value: function paramCheckAll() {
            this.errParamList = [];
            for (var key in this.param) {
                if (this.param[key].required && !this.param[key].status) {
                    this.errParamList.push(key);
                }
            }
            return this.errParamList.length === 0;
        }
    }], [{
        key: 'ObjectClone',
        value: function ObjectClone(param) {
            var obj = {};
            for (var key in param) {
                if (Object.keys(param[key]).length > 0) {
                    obj[key] = ObjectCheck.ObjectClone(param[key]);
                } else {
                    obj[key] = param[key];
                }
            }
            return obj;
        }
    }]);

    return ObjectCheck;
}();

window.ObjectCheck = ObjectCheck;

},{}]},{},[1]);
