"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*

Copyright (C) Saksham - All Rights Reserved
Unauthorized copying/modifying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Saksham <khrn.saksham002@gmail.com>, 17 April 2020

------------------------

@info - converting data to rest graph

@author Saksham
@note Last Branch Update - master
     
@note Created on 2020-04-17 by Saksham
@note Updates :

*/
/**
 * Used to check if data type is json or not
 * @param data
 * @return {string}
 */
var typeOf = function (data) {
    var objectConstructor = {}.constructor;
    var arrayConstructor = [].constructor;
    var stringConstructor = 'test'.constructor;
    if (data && data.constructor === objectConstructor) {
        return "OBJECT";
    }
    else if (data && data.constructor === arrayConstructor) {
        return "ARRAY";
    }
    else if (data && data.constructor === stringConstructor) {
        return "STRING";
    }
    else {
        return "";
    }
};
function mapping(data) {
    if (typeOf(data) == "OBJECT") {
        var keys = Object.keys(data);
        var output = "{";
        for (var i = 0; i < keys.length; i++) {
            var d = data[keys[i]];
            if (typeOf(d) == "OBJECT" || typeOf(d) == "ARRAY")
                output += "" + keys[i] + mapping(d);
            else
                output += keys[i] + ",";
        }
        return output + "},";
    }
    else if (typeOf(data) == "ARRAY") {
        var output = "{";
        if (data.size > 0)
            output += "" + mapping(data[0]);
        else
            return output + "},";
    }
    else
        return "{},";
}
/**
 * map json to restgraph string
 *
 * @param data
 * @return string - restgraph string
 */
function default_1(data) {
    var mappings = mapping(data);
    mappings = mappings
        .replace(/,}/g, '}');
    return mappings.substring(0, mappings.length - 1);
}
exports.default = default_1;
