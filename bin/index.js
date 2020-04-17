"use strict";
/*

Copyright (C) Saksham - All Rights Reserved
Unauthorized copying/modifying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Saksham <khrn.saksham002@gmail.com>, 17 April 2020

------------------------

@info - limiting the dataset

@author Saksham
@note Last Branch Update - master
     
@note Created on 2020-04-17 by Saksham
@note Updates :

*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * used to check if data type is json or not
 *
 * @param data
 * @return {string}
 */
function typeOf(data) {
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
}
;
/**
 * converting the restgraph string to json mapper
 * @param mapping
 */
function mapper(mapping) {
    var map = mapping.replace(/{/g, ":{");
    map = map.replace(/\[:{/, "[{");
    map = map.slice(1);
    map = map.replace(/\[/g, ':[');
    map = map.replace(/,/g, ':true,');
    map = map.replace(/}/g, ':true}');
    map = map.replace(/}:true,/g, '},');
    map = map.replace(/]:true,/g, '],');
    map = map.replace(/]:true/g, ']');
    map = map.replace(/}:true/g, '}');
    map = map.replace(/{/g, '{"');
    map = map.replace(/,/g, ',"');
    map = map.replace(/:/g, '":');
    map = map.replace(/}/g, '"}');
    map = map.replace(/"}]/g, '}]');
    map = map.replace(/"}}/g, '}}');
    map = map.replace(/"}/g, '}');
    map = map.replace(/true"/g, 'true');
    return JSON.parse(map);
}
/**
 * use to parse the data with map
 *
 * @param map
 * @param data
 */
function parse(map, data) {
    if (typeOf(map) == "ARRAY") {
        var newData = [];
        for (var i = 0; i < data.length; i++) {
            if (map.length == 0) {
                newData.push(data[i]);
            }
            else {
                newData.push(parse(map[0], data[i]));
            }
        }
        return newData;
    }
    else {
        var newData = {};
        var keys = Object.keys(map);
        var dKeys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = map[key];
            if (data[key] != undefined) {
                if (typeOf(value) == "OBJECT") {
                    if (typeOf(data[key]) == "OBJECT")
                        newData[key] = parse(value, data[key]);
                    else
                        newData[key] = null;
                }
                else if (typeOf(value) == "ARRAY") {
                    if (typeOf(data[key]) == "ARRAY")
                        newData[key] = parse(value, data[key]);
                    else
                        newData[key] = null;
                }
                else
                    newData[key] = data[key];
            }
            else
                newData[key] = null;
        }
        return newData;
    }
}
/**
 * export the default function
 *
 * @param restGraph
 * @param data
 * @return object - mapped data
 */
function default_1(restGraph, data) {
    var map = mapper(restGraph);
    return parse(map, data);
}
exports.default = default_1;
