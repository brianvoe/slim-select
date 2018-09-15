(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "custom-event-polyfill", "./index"], factory);
    }
})(function (require, exports) {
    "use strict";
    require("custom-event-polyfill"); // Needed for IE to use custom events
    const index_1 = require("./index");
    return index_1.default;
});
