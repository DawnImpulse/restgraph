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
};

/**
 * converting the restgraph string to json mapper
 * @param mapping
 */
function mapper(mapping) {
    let map = mapping.replace(/{/g, ":{");
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

        const newData = [];
        for (let i = 0; i < data.length; i++) {
            if (map.length == 0) {
                newData.push(data[i])
            } else {
                newData.push(parse(map[0], data[i]))
            }
        }
        return newData;

    } else {
        const newData = {};
        const keys = Object.keys(map);
        const dKeys = Object.keys(data);

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = map[key];

            if (data[key] != undefined) {
                if (typeOf(value) == "OBJECT") {
                    if (typeOf(data[key]) == "OBJECT")
                        newData[key] = parse(value, data[key]);
                    else
                        newData[key] = null
                } else if (typeOf(value) == "ARRAY") {
                    if (typeOf(data[key]) == "ARRAY")
                        newData[key] = parse(value, data[key]);
                    else
                        newData[key] = null
                } else
                    newData[key] = data[key]
            } else
                newData[key] = null
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
export default function (restGraph: string, data: object) : object{
    const map = mapper(restGraph);
    return parse(map, data)
}
