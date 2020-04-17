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
/**
 * convert data into semi-structured json object
 *
 * @param data - json to be mapped
 */
function mapping(data) {
    if (typeOf(data) == "OBJECT") {
        var keys = Object.keys(data);
        var output = {};
        for (var i = 0; i < keys.length; i++) {
            var d = data[keys[i]];
            if (typeOf(d) == "OBJECT") {
                output[keys[i]] = mapping(d);
            }
            else if (typeOf(d) == "ARRAY")
                output[keys[i]] = array(d);
            else
                output[keys[i]] = true;
        }
        return output;
    }
    else if (typeOf(data) == "ARRAY") {
        return array(data);
    }
    else
        return 0;
}
/**
 * handling array for semi-structured json object
 * @param data
 */
function array(data) {
    if (data.length > 0) {
        return [mapping(data[0])];
    }
    else
        return [];
}
/**
 * map json to restgraph string
 *
 * @param data
 * @return string - restgraph string
 */
function default_1(data) {
    var mappings = mapping(data);
    return JSON.stringify(mappings)
        .replace(/"/g, '')
        .replace(/:/g, '')
        .replace(/true/g, '');
}
exports.default = default_1;
