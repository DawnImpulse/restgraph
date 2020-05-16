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

import restgraph from "./restgraph";

/**
 * used to check if data type is json or not
 *
 * @param data
 * @return {string}
 */
function typeOf(data) {
    const objectConstructor = {}.constructor;
    const arrayConstructor = [].constructor;
    const stringConstructor = 'test'.constructor;
    if (data && data.constructor === objectConstructor) {
        return "OBJECT";
    } else if (data && data.constructor === arrayConstructor) {
        return "ARRAY";
    } else if (data && data.constructor === stringConstructor) {
        return "STRING";
    } else {
        return "";
    }
}

/**
 * converting the restgraph string to json mapper
 * @param map
 */
function mapper(map) {
    map = map.replace(/{/g, '{"')
    map = map.replace(/}/g, '":true}')
    map = map.replace(/{"/g, '":{"')
    map = map.slice(2);
    map = map.replace(/,/g, '","')
    map = map.replace(/,/g, ':true,')
    map = map.replace(/}":true/g, '}')
    map = map.replace(/{"":true}/g, '{}')

    return JSON.parse(map);
}

/**
 * use to parse the data with map
 *
 * @param map
 * @param data
 */
function parser(map, data) {
    if (Object.keys(map).length > 0) {
        // it is an array
        if (typeOf(data) == "ARRAY") {
            const newData = [];
            // work on individual elements
            for (var i = 0; i < data.length; i++) {
                const el = data[i];
                newData.push(parser(map, data[i]))
            }
            return newData;
            // it is an object
        } else if (typeOf(data) == "OBJECT") {
            const newData = {};
            const keys = Object.keys(map);
            const dKeys = Object.keys(data);

            // for every key in map
            for (var i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = map[key];

                // if key does exist in data
                if (data[key]) {
                    // if map value is object
                    if (typeOf(value) == "OBJECT") {
                        // if data value is object
                        if (typeOf(data[key]) == "OBJECT")
                            newData[key] = parser(value, data[key])
                        // else if data value is an array
                        else if (typeOf(data[key]) == "ARRAY")
                            newData[key] = parser(value, data[key])
                        // else data value is of other type than expected
                        else
                            newData[key] = null
                        // if map value not object then copy the whole obj
                    } else
                        newData[key] = data[key]
                    // else key does exist in data
                } else {
                    if (data[key] === null)
                        newData[key] = null;
                    else
                        newData[key] = {}
                }
            }

            return newData;
        }
        // return whole data
    } else
        return data
}

/**
 * export the default function
 *
 * @param restGraph
 * @param data
 * @return object - mapped data
 */
export function mapData(restGraph: string, data: object): object {
    const map = mapper(restGraph);
    return parser(map, data)
}

/**
 * create restgraph map from a data
 * @param data
 */
export function createMap(data: object): string {
    return restgraph(data)
}

/**
 * verify the restgraph
 * @param map
 */
export function verifyMap(map: string): boolean {
    try {
        mapper(map);
        return true
    } catch (e) {
        return false
    }
}
