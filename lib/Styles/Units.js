"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var phone = {
  gutter: {
    mini: 4,
    default: 8,
    more: 16
  }
};

var tablet = _extends({}, phone);

var desktop = _extends({}, tablet);

exports.default = {
  phone: phone,
  tablet: tablet,
  desktop: desktop
};