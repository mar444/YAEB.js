function changeKeys(list, keys) {
    return list.map((item) => {
        keys.forEach(({newKey, oldKey}) => {
            if (item.hasOwnProperty(oldKey)) {
                item[newKey] = item[oldKey];
                delete item[oldKey];
            }
        });

        return item;
    });
}

function sublis(list, tree) {
    return tree.map((item) => {
        const match = list.find(({pattern}) => {
            return pattern === item;
        });

        return match ? match.replacement : item;
    });
}

function randomElt(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function mklist(x) {
    return Array.isArray(x) ? x : [x];
}

function mappend(list, fn) {
    return list.map(fn).reduce((acc, cur) => {
        return acc.concat(cur);
    }, []);
}

function flatten(list) {
    return mappend(list, mklist);
}

module.exports = {
    changeKeys,
    sublis,
    randomElt,
    flatten
};
