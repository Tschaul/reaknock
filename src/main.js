"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ko = require('knockout');
var React = require('react');
var ReactDOM = require('react-dom');
var Priority;
(function (Priority) {
    Priority[Priority["Low"] = 0] = "Low";
    Priority[Priority["Mid"] = 1] = "Mid";
    Priority[Priority["High"] = 2] = "High";
})(Priority || (Priority = {}));
var ItemViewModel = (function () {
    function ItemViewModel(data) {
        var _this = this;
        this.name = ko.observable();
        this.done = ko.observable();
        this.priority = ko.observable();
        this.toggle = function () {
            _this.done(!_this.done());
        };
        this.name(data.name);
        this.done(data.done);
        this.priority(data.priority);
    }
    return ItemViewModel;
}());
var ViewModel = (function () {
    function ViewModel(data) {
        var _this = this;
        this.title = ko.observable();
        this.todos = ko.observableArray();
        this.addTodo = function () {
            _this.todos.push(new ItemViewModel({
                name: "Test",
                done: false,
                priority: Priority.Low
            }));
        };
        this.title(data.name);
        this.todos.push(new ItemViewModel({
            name: "Kaffee",
            done: false,
            priority: Priority.Low,
        }));
        this.todos.push(new ItemViewModel({
            name: "Milch",
            done: true,
            priority: Priority.Mid,
        }));
        this.todos.push(new ItemViewModel({
            name: "Zucker",
            done: false,
            priority: Priority.High,
        }));
    }
    return ViewModel;
}());
var KnockoutView = (function (_super) {
    __extends(KnockoutView, _super);
    function KnockoutView(props) {
        var _this = this;
        _super.call(this, props);
        this.trigger = ko.observable();
        this.renderComputed = ko.computed(function () {
            _this.trigger();
            return _this.renderModel(_this.props.model);
        });
        this.renderComputed.subscribe(function () { return _this.forceUpdate(); });
    }
    KnockoutView.prototype.componentWillReceiveProps = function () {
        this.trigger.notifySubscribers();
    };
    KnockoutView.prototype.render = function () {
        return this.renderComputed();
    };
    return KnockoutView;
}(React.Component));
var View = (function (_super) {
    __extends(View, _super);
    function View() {
        _super.apply(this, arguments);
    }
    View.prototype.renderModel = function (model) {
        var items = model.todos().map(function (item, n) { return (React.createElement(ItemView, {model: item, key: n})); });
        return (React.createElement("div", null, React.createElement("h2", null, model.title()), React.createElement("ul", null, items), React.createElement("button", {onClick: model.addTodo}, "Add")));
    };
    return View;
}(KnockoutView));
var ItemView = (function (_super) {
    __extends(ItemView, _super);
    function ItemView() {
        _super.apply(this, arguments);
    }
    ItemView.prototype.renderModel = function (model) {
        if (model.done()) {
            return React.createElement("li", {onClick: model.toggle, style: { textDecoration: "line-through" }}, model.name());
        }
        else {
            return React.createElement("li", {onClick: model.toggle}, model.name());
        }
    };
    return ItemView;
}(KnockoutView));
var vm = new ViewModel({ name: "test" });
ReactDOM.render(React.createElement(View, {model: vm}), document.getElementById("view"));
//# sourceMappingURL=main.js.map