"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ko = require('knockout');
var React = require('react');
var ReactDOM = require('react-dom');
var ViewModel = (function () {
    function ViewModel(data) {
        this.name = ko.observable();
        this.name(data.name);
    }
    return ViewModel;
}());
var View = (function (_super) {
    __extends(View, _super);
    function View(props) {
        var _this = this;
        _super.call(this, props);
        this.fuzzName = function () {
            _this.props.model.name(_this.props.model.name() + "fuzz");
        };
        this.computedRender = ko.computed(function () {
            return (React.createElement("div", null, React.createElement("span", null, _this.props.model.name()), React.createElement("button", {onClick: _this.fuzzName}, "fuzz")));
        }, this);
        this.computedRender.subscribe(function () { return _this.forceUpdate(); });
    }
    View.prototype.render = function () {
        return this.computedRender();
    };
    return View;
}(React.Component));
var vm = new ViewModel({ name: "test" });
ReactDOM.render(React.createElement(View, {model: vm}), document.getElementById("view"));
//# sourceMappingURL=main.js.map