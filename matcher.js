const FAIL = null;
const NO_BINDINGS = [{}];

function match(pattern, input, bindings = NO_BINDINGS) {
    if (bindings === FAIL) {
        return FAIL;
    } else if (isVariable(pattern)) {
        return matchVariable(pattern, input, bindings);
    } else if (isEqualAtom(pattern, input)) {
        return bindings;
    } else if (isNonEmptyArray(pattern) && isNonEmptyArray(input)) {
        return match(pattern.slice(1), input.slice(1), match(pattern[0], input[0], bindings));
    } else {
        return FAIL;
    }
}

function isVariable(pattern) {
    return ((typeof pattern === typeof "string") && pattern.startsWith("?"));
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

function matchVariable(pattern, input, bindings) {
    const binding = getBinding(pattern, bindings);
    if (binding) {
        const value = bindingValue(binding);
        if (value === input) {
            return bindings;
        } else {
            return FAIL;
        }
    } else {
        return extendBindings(pattern, input, bindings);
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