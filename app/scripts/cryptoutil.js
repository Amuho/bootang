

'use strict';

var CryptoUtil = (function () {
    "use strict";
    var CryptoUtil = function () {
        if (!(this instanceof CryptoUtil)) {
            return new CryptoUtil();
        }
        this.charsize = 8;
        return this;
    };
    CryptoUtil.MAX_PRECISION = (1 / 3).toString().length - 2;
    CryptoUtil.MAX_VALUE = Math.pow(2, 53);
    CryptoUtil.MIN_VALUE = -Math.pow(2, 53);
    CryptoUtil.charsize = 8;
    
    CryptoUtil.regex = {
        divSignCheck: /(\d|Infinity)\s*\//,
        divSignSplit: /\//,
        cleanFormat: /^\d+\.\d+$/,
        mixedNumbers: /(\S+)\s+(\S[\w\W]*)/,
        repeatingDecimals: /[^\.]+\.\d*(\d{2,})+(?:\1)$/,
        repeatingNumbers: /^(\d+)(?:\1)$/
    };
    CryptoUtil.VERSION = "0.4.1";

    CryptoUtil.isNumeric = function (obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj);
    };
    
    CryptoUtil.str2binb = function (str) {
        var bin = [];
        var charsize = CryptoUtil.charsize;
//        var charsize = this.charsize;
        var mask = (1 << charsize) - 1;
        var len = str.length * charsize;
        for (var i = 0; i < len; i += charsize) {
            bin[i >> 5] |= (str.charCodeAt(i / charsize) & mask) << (32 - charsize - (i % 32));
        }
         console.log('*** CryptoUtil   test length : ' + bin.length + ' test len: ' + len );
        return bin;
    };
    
    CryptoUtil.binb2hex = function (binarray) {
        var hex_tab = "0123456789abcdef";
        var str = "";
        var length = binarray.length * 4;
        var srcByte;

        for (var i = 0; i < length; i += 1) {
            srcByte = binarray[i >> 2] >> ((3 - (i % 4)) * 8);
            str += hex_tab.charAt((srcByte >> 4) & 0xF) + hex_tab.charAt(srcByte & 0xF);
        }

        return str;
    }

    
    

    CryptoUtil.getValueIfDefined = function (backup, value) {
        return typeof value !== "undefined" && value !== null ? value : backup;
    };

    CryptoUtil.gcd = function (a, b) {
        if (arguments.length < 2) {
            return a;
        }
        var c;
        a = +a;
        b = +b;
        // Same as isNaN() but faster
        if (a !== a || b !== b) {
            return NaN;
        }
        //Same as !isFinite() but faster
        if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
            return Infinity;
        }
        // Checks if a or b are decimals
        if ((a % 1 !== 0) || (b % 1 !== 0)) {
            throw new Error("Can only operate on integers");
        }
        while (b) {
            c = a % b;
            a = b;
            b = c;
        }
        return (0 < a) ? a : -a;
    };

    CryptoUtil.getNumeratorWithSign = function (top, bottom) {
        var sign = (+top * (+bottom || 1)) < 0 ? -1 : 1;
        return Math.abs(+top) * sign;
    };
    CryptoUtil.guessType = function (obj) {
        var type = "NaN";
        if (obj instanceof CryptoUtil) {
            type = "CryptoUtil";
        } else if (!isNaN(obj)) {
            type = "number";
            if (-1 < (+obj).toString().indexOf("e")) {
                type = "e";
            } else if (obj % 1) {
                type = "decimal";
            }
        } else if (CryptoUtil.regex.divSignCheck.test(obj)) {
            if (/\d\s+[+\-]?\d/.test(obj)) {
                type = "mixed";
            } else {
                type = "fraction";
            }
        }
        return type;
    };
    CryptoUtil.parseToArray = function (obj) {
        var parts = [],
                sign,
                index,
                arr = [],
                top;
        switch (CryptoUtil.guessType(obj)) {
            case "mixed":
                parts = obj.match(CryptoUtil.regex.mixedNumbers);
                arr = CryptoUtil.parseToArray(parts[2]);
                sign = (+parts[1] < 0 || +arr[0] < 0) ? -1 : 1;
                arr[0] = sign * (Math.abs(arr[0]) + Math.abs(parts[1] * arr[1]));
                break;
            case "fraction":
                parts = obj.split(CryptoUtil.regex.divSignSplit);
                arr[0] = CryptoUtil.getNumeratorWithSign(parts[0], parts[1]);
                arr[1] = Math.abs(+parts[1]);
                break;
            case "decimal":
                parts = (+obj).toString().split(".");
                arr[1] = Math.pow(10, parts[1].length);
                arr[0] = Math.abs(parts[0]) * arr[1] + (+parts[1]);
                arr[0] = (-1 < (parts[0]).indexOf("-")) ? -arr[0] : arr[0];
                break;
            case "number":
                arr = [+obj, 1];
                break;
            case "e":
                parts = (+obj).toString().split(/e/i);
                top = CryptoUtil.parseToArray(parts[0]);
                index = (Math.abs(+obj) < 1) ? [0, 1] : [1, 0];
                arr[index[0]] = top[index[0]];
                arr[index[1]] = Number(top[index[1]] + "e" + Math.abs(+parts[1]));
                break;
            case "CryptoUtil":
                arr = [obj._n, obj._d];
                break;
            default:
                arr = [NaN, 1];
        }
        return arr;
    };
    CryptoUtil.parse = function (obj, obj2) {
        var arr = CryptoUtil.parseToArray(obj),
                arr2;
        if (arr.length && obj2 !== undefined && obj2 !== null) {
            arr2 = CryptoUtil.parseToArray(obj2);
            arr[0] *= arr2[1];
            arr[1] *= arr2[0];
        }
        return new CryptoUtil(arr[0], arr[1]);
    };
    CryptoUtil.simplify = function (obj, obj2) {
        obj = CryptoUtil.parse(obj, obj2);
        var top = obj._n,
                bottom = top || !obj._d ? obj._d : 1,
                arr = CryptoUtil.getRepeatProps(top / bottom),
                factor;
        if (arr.length) {
            top = Number(arr.join('')) - Number(arr[0] + String(arr[1]));
            bottom = Math.pow(10, arr[1].length) * (Math.pow(10, arr[2].length) - 1);
        }
        factor = CryptoUtil.gcd(top, bottom);
        return [top / factor, bottom / factor];
    };
    CryptoUtil.getRepeatProps = function (val) {
        val = String(val || "");
        var arr = [],
                match = CryptoUtil.regex.repeatingDecimals.exec(val),
                RE2_RE1AtEnd,
                RE3_RepeatingNums = CryptoUtil.regex.repeatingNumbers;
        if (!match) {
            val = val.replace(/\d$/, "");
            match = CryptoUtil.regex.repeatingDecimals.exec(val);
        }
        if (match && 1 < match.length && /\.\d{10}/.test(match[0])) {
            match[1] = RE3_RepeatingNums.test(match[1]) ? RE3_RepeatingNums.exec(match[1])[1] : match[1];
            RE2_RE1AtEnd = new RegExp("(" + match[1] + ")+$");
            arr = val.split(/\./).concat(match[1]);
            arr[1] = arr[1].replace(RE2_RE1AtEnd, "");
        }
        return arr;
    };
    CryptoUtil.getPrimeFactors = function (num) {
        num = Math.floor(num);
        var root,
                factors = [],
                x,
                sqrt = Math.sqrt,
                doLoop = 1 < num && isFinite(num);
        while (doLoop) {
            root = sqrt(num);
            x = 2;
            if (num % x) {
                x = 3;
                while ((num % x) && ((x += 2) < root)) {
                }
            }
            x = (root < x) ? num : x;
            factors.push(x);
            doLoop = (x !== num);
            num /= x;
        }
        return factors;
    };
    CryptoUtil.getCleanENotation = function (num) {
        num = (+num || 0).toString();
        if (/\.\d+(0|9){8,}\d?e/.test(num)) {
            var i = num.match(/(?:\d+\.)(\d+)(?:e[\w\W]*)/)[1].replace(/(0|9)+\d$/, '').length + 1;
            num = (+num).toPrecision(i).toString();
        }
        return num;
    };
    CryptoUtil.simplifyENotation = function (top, bottom) {
        var val = top / bottom,
                re = /[eE]/;
        if (!isNaN(val) && re.test(top) && re.test(bottom)) {
            var arr = (top).toString().split("e"),
                    arr2 = (bottom).toString().split("e");
            if (Number(arr2[1]) < Number(arr[1])) {
                arr[1] = Number(arr[1]) + (-1 * arr2[1]);
                arr2[1] = 0;
            } else {
                arr2[1] = Number(arr2[1]) + (-1 * arr[1]);
                arr[1] = 0;
            }
            top = Number(arr.join("e"));
            bottom = Number(arr2.join("e"));
        }
        return [top, bottom];
    };
    CryptoUtil.getCombinedCryptoUtil = function (obj, obj2) {
        if (!(obj instanceof CryptoUtil) || obj2 !== undefined) {
            obj = CryptoUtil.parse(obj, obj2);
        }
        return obj;
    };
    CryptoUtil.random = function () {
        var value = (Math.random()).toFixed(Math.floor(Math.random() * 16));
        return CryptoUtil.parse(value).simplify();
    };
    CryptoUtil.getStandardCryptoUtilArray = function (a, b, alwaysReduce) {
        if (typeof b === "undefined") {
            b = 1;
            if (typeof a === "undefined") {
                a = 0;
            }
        }
        var denominator = +Math.abs(b);
        var numerator = CryptoUtil.getNumeratorWithSign(a, (b || 1));
        var arr = [numerator, denominator];
        if (arr[1] && alwaysReduce) {
            arr = CryptoUtil.simplify(arr[0], arr[1]);
        }
        return arr;
    };
    CryptoUtil.prototype = {
        constructor: CryptoUtil,
        numerator: function (val) {
            if (typeof val !== "undefined") {
                this._n = CryptoUtil.parse(val).valueOf();
            }
            return this._n;
        },
        denominator: function (val) {
            if (typeof val !== "undefined") {
                this._d = CryptoUtil.parse(val).valueOf();
                this.correctCryptoUtil();
            }
            return this._d;
        },
        correctCryptoUtil: function () {
            var arr = CryptoUtil.getStandardCryptoUtilArray(this._n, this._d, this.alwaysReduce);
            this._n = arr[0];
            this._d = arr[1];
            return this;
        },
        toArray: function () {
            return [this._n, this._d];
        },
        valueOf: function () {
            var arr = CryptoUtil.simplifyENotation(this._n, this._d);
            return arr[0] / arr[1];
        },
        toLocaleString: function () {
            var val = this.valueOf(),
                    x,
                    str;
            if (isNaN(val)) {
                str = "NaN";
            } else if (val % 1 === 0 || this._d === 1 || !isFinite(val % 1)) {
                str = String(val);
            } else if (1 < Math.abs(val)) {
                x = parseInt(val, 10);
                str = x + " " + Math.abs(this._n % this._d) + String(this.divSign) + this._d;
            } else {
                str = this._n + String(this.divSign) + this._d;
            }
            return str;
        },
        toString: function () {
            return String(this._n + this.divSign + this._d);
        },
        clone: function (top, bottom, alwaysReduce) {
            var func = CryptoUtil.getValueIfDefined;
            top = func(this._n, top);
            bottom = func(this._d, bottom);
            alwaysReduce = func(this.alwaysReduce, alwaysReduce);
            return new CryptoUtil(top, bottom, alwaysReduce);
        },
        isNaN: function () {
            return !CryptoUtil.isNumeric(this.valueOf());
        },
        simplify: function () {
            var arr = CryptoUtil.simplify(this._n, this._d);
            return this.clone(arr[0], arr[1]);
        },
        add: function (obj, obj2) {
            obj = CryptoUtil.getCombinedCryptoUtil(obj, obj2);
            var x,
                    top,
                    bottom;
            if (this._d === obj._d) {
                top = this._n + obj._n;
                bottom = this._d;
            } else {
                x = CryptoUtil.gcd(this._d, obj._d);
                top = ((this._n * obj._d) + (this._d * obj._n)) / x;
                bottom = (this._d * obj._d) / x;
            }
            return this.clone(top, bottom);
        },
        divide: function (obj, obj2) {
            obj = CryptoUtil.getCombinedCryptoUtil(obj, obj2);
            return this.clone(this._n * obj._d, this._d * obj._n);
        },
        equals: function (obj) {
            var val = (CryptoUtil.isNumeric(obj) || obj instanceof CryptoUtil) ? obj.valueOf() : CryptoUtil.parse(obj).valueOf();
            return (this._n / this._d) === +val;
        },
        deepEquals: function (obj) {
            return (obj instanceof CryptoUtil) && (this._n === obj._n) &&
                    (this._d === obj._d) && (this.divSign === obj.divSign) &&
                    (this.alwaysReduce === obj.alwaysReduce);
        },
        multiply: function (obj, obj2) {
            obj = CryptoUtil.getCombinedCryptoUtil(obj, obj2);
            return this.clone(this._n * obj._n, this._d * obj._d);
        },
        subtract: function (obj, obj2) {
            obj = CryptoUtil.getCombinedCryptoUtil(obj, obj2);
            var x,
                    top,
                    bottom;
            if (this._d === obj._d) {
                top = this._n - obj._n;
                bottom = this._d;
            } else {
                x = CryptoUtil.gcd(this._d, obj._d);
                top = ((this._n * obj._d) - (this._d * obj._n)) / x;
                bottom = (this._d * obj._d) / x;
            }
            return this.clone(top, bottom);
        },
        descale: function (obj, obj2) {
            var factor = CryptoUtil.getCombinedCryptoUtil(obj, obj2);
            return this.clone(this._n / factor, this._d / factor);
        },
        pow: function (obj, obj2) {
            var power = CryptoUtil.getCombinedCryptoUtil(obj, obj2);
            return this.clone(Math.pow(this._n, +power), Math.pow(this._d, +power));
        },
        scale: function (obj, obj2) {
            var factor = CryptoUtil.getCombinedCryptoUtil(obj, obj2);
            return this.clone(this._n * +factor, this._d * +factor);
        },
        cleanFormat: function () {
            var re = CryptoUtil.regex.cleanFormat,
                    obj;
            if (re.test(this._n) || re.test(this._d)) {
                return CryptoUtil.parse(this._n, this._d);
            }
            obj = this.clone();
            obj._n = CryptoUtil.getCleanENotation(obj._n);
            obj._d = CryptoUtil.getCleanENotation(obj._d);
            return obj;
        },
        abs: function () {
            return this.clone(Math.abs(this._n));
        },
        mod: function () {
            return this.clone(this._n % this._d, 1);
        },
        negate: function () {
            return this.clone(-this._n);
        },
        isProper: function () {
            return Math.abs(this._n) < this._d;
        },
        findX: function (str) {
            var arr = String(str).split("/");
            if (arr.length !== 2 || (!isNaN(arr[0]) && !isNaN(arr[1]))) {
                return null;
            }
            return (isNaN(arr[0]) ? new CryptoUtil(arr[1]).multiply(this) : new CryptoUtil(arr[0]).divide(this));
        },
        reciprocal: function () {
            return this.clone(this._d, this._n);
        },
        toQuantityOf: function () {
            var val = this.valueOf(),
                    x,
                    diff,
                    i,
                    prevDiff = Infinity,
                    len = arguments.length;
            for (i = 0; i < len; i += 1) {
                diff = Math.abs((Math.round(val * arguments[i]) / arguments[i]) - val);
                if (diff < prevDiff) {
                    x = arguments[i];
                    prevDiff = diff;
                }
            }
            return this.clone(Math.round(val * x), x);
        },
        floor: function () {
            return this.clone(Math.floor(this.valueOf()), 1);
        },
        ceil: function () {
            return this.clone(Math.ceil(this.valueOf()), 1);
        },
        makeProper: function () {
            return this.clone(this._n % this._d, this._d);
        }
    };
    return CryptoUtil;
}
());
// Adds npm support
if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = CryptoUtil;
    }
    exports.CryptoUtil = CryptoUtil;
} else {
    this.CryptoUtil = CryptoUtil;
}




