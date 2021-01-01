'use strict';


let returnResolves = {};
let callIndex = 0;


onmessage = function(event) {
    if (event.data.type == 'run') {
        onRun(event.data.source, event.data.data);
    }
    else if (event.data.type == 'bind') {
        onBind(event.data.name);
    }
    else if (event.data.type == 'return') {
        onReturn(event.data.index, event.data.value);
    }
};


function onRun(source, data) {
    let AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    (new AsyncFunction('data', `'use strict';\n${source}`))(data);
}


function onBind(name) {
    self[name] = function(...args) {
        let index = callIndex;
        callIndex++;
        postMessage({ type: 'call', index: index, name: name, args: args });
        return new Promise(resolve => returnResolves[index] = resolve);
    }
}


function onReturn(index, value) {
    returnResolves[index](value);
    delete returnResolves[index];
}
