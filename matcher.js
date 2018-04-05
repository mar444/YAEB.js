const FAIL = null;
const NO_BINDINGS = [{}];

function match(pattern, input, bindings = NO_BINDINGS) {
    if (bindings === FAIL) {
        return FAIL;
    } else if (isVariable(pattern)) {
        return matchVariable(pattern, input, bindings);
    } else if (isEqualAtom(pattern, input)) {
        return bindings;
    } else if (isNonEmptyArray(pattern) && isSegment(pattern[0])) {
        return matchSegment(pattern, input, bindings);
    } else if (isNonEmptyArray(pattern) && isNonEmptyArray(input)) {
        return match(pattern.slice(1), input.slice(1), match(pattern[0], input[0], bindings));
    } else {
        return FAIL;
    }
}

function isString(x) {
    return (typeof x === typeof "string");
}

function isVariable(pattern) {
    return isString(pattern) && pattern.startsWith("?");
}

function isSegment(pattern) {
    return isString(pattern) && pattern.startsWith("(?") && pattern.endsWith(")");
}

function isEmptyArray(x) {
    return Array.isArray(x) && (x.length === 0);
}

function isNonEmptyArray(x) {
    return Array.isArray(x) && (x.length > 0);
}

function isEqualAtom(pattern, input) {
    if (typeof pattern === typeof "string") {
        return pattern === input;
    } else {
        return isEmptyArray(pattern) && isEmptyArray(input);
    }
}

function matchVariable(variable, input, bindings) {
    const binding = getBinding(variable, bindings);
    if (binding) {
        const value = bindingValue(binding);
        if (value === input) {
            return bindings;
        } else {
            return FAIL;
        }
    } else {
        return extendBindings(variable, input, bindings);
    }
}

function matchSegment(pattern, input, bindings, fromIdx = 0) {
    const variable = pattern[0].slice(-3, -1);
    const pat = pattern.slice(1);

    if (isEmptyArray(pat)) {
        return matchVariable(variable, input, bindings);
    }

    const pos = input.indexOf(pat[0], fromIdx);
    if (pos !== -1) {
        const matchResult = match(pat, input.slice(pos), extendBindings(variable, input.slice(0, pos) , bindings));
        if (matchResult === FAIL) {
            return matchSegment(pattern, input, bindings, pos + 1);
        } else {
            return matchResult;
        }
    } else {
        return FAIL;
    }
}

function getBinding(variable, bindings) {
    return bindings.find((binding) => {
        return binding['var'] === variable;
    });
}

function bindingValue(binding) {
    return binding['val'];
}

function extendBindings(variable, val, bindings) {
    bindings = (bindings === NO_BINDINGS) ? [] : bindings;
    return bindings.concat([{
        var: variable, val
    }]);
}

module.exports = {
    match
};