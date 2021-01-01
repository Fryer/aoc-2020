let editor = null;
let code = null;
let input = null;
let output = null;

let source = '';
let data = '';

let commands = [
    { name: 'Run', callback: run },
    { name: 'Stop', callback: stop },
    { name: 'Clear', callback: clear },
    { name: 'Reset', callback: reset }
];

let runner = null;
let bindings = {
    log: log,
    visualize: visualize,
    drawFrame: drawFrame,
    fillStyle: (fillStyle) => drawCalls.push(() => ctx.fillStyle = fillStyle),
    strokeStyle: (strokeStyle) => drawCalls.push(() => ctx.strokeStyle = strokeStyle),
    lineWidth: (lineWidth) => drawCalls.push(() => ctx.lineWidth = lineWidth),
    font: (font) => drawCalls.push(() => ctx.font = font),
    textAlign: (textAlign) => drawCalls.push(() => ctx.textAlign = textAlign),
    clear: () => drawCalls.push(() => ctx.fillRect(0, 0, canvas.width, canvas.height)),
    fillRect: (...args) => drawCalls.push(() => ctx.fillRect(...args)),
    stroke: () => drawCalls.push(() => { ctx.stroke(); ctx.beginPath(); }),
    moveTo: (...args) => drawCalls.push(() => ctx.moveTo(...args)),
    lineTo: (...args) => drawCalls.push(() => ctx.lineTo(...args)),
    fillText: (...args) => drawCalls.push(() => ctx.fillText(...args))
};

let canvas = document.getElementById('visualization');
let ctx = canvas.getContext('2d');
let drawCalls = [];


export function open() {
    close();
    
    // Set up panels.
    editor = document.createElement('div');
    editor.id = 'editor';
    document.body.appendChild(editor);
    let left = document.createElement('div');
    left.id = 'editor-left';
    editor.appendChild(left);
    let right = document.createElement('div');
    right.id = 'editor-right';
    editor.appendChild(right);
    
    // Add commands.
    let links = document.createElement('p');
    for (let command of commands) {
        let spacing = document.createTextNode('\u00a0\u00a0\u00a0' + (links.innerHTML == '' ? '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0' : ''));
        links.appendChild(spacing);
        let link = document.createElement('span');
        link.className = 'command';
        link.textContent = command.name;
        link.addEventListener('click', () => command.callback());
        links.appendChild(link);
    }
    left.appendChild(links);
    
    // Instantiate code editor.
    code = CodeMirror(left, {
        mode: 'javascript',
        theme: 'tomorrow-night-bright',
        indentUnit: 4,
        extraKeys: { 'Ctrl-Space': 'autocomplete' },
        lineWrapping: true,
        lineNumbers: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
        matchBrackets: true,
        autoCloseBrackets: true,
        foldGutter: true,
        foldOptions: { widget: '...' },
        highlightSelectionMatches: true,
        lint: {
            esversion: 10,
            globals: ['data', 'await', ...Object.keys(bindings)],
            latedef: 'nofunc',
            strict: 'implied',
            undef: true,
            unused: true,
            varstmt: true,
            boss: true,
            loopfunc: true,
            browser: true,
            devel: true
        },
        styleActiveLine: { nonEmpty: true },
        selectionPointer: true,
        scrollPastEnd: true
    });
    code.getWrapperElement().id = 'editor-code';
    
    // Enable autocomplete on input.
    let autoHintTokens = new Set(['property', 'variable', 'keyword', 'atom']);
    code.on('change', (instance, changeObj) => {
        let token = instance.getTokenAt(instance.getDoc().getCursor(), true);
        if (token.string == '.' || autoHintTokens.has(token.type)) {
            instance.showHint({ completeSingle: false });
        }
        else {
            instance.closeHint();
        }
    });
    
    // Instantiate input editor.
    let inputLabel = document.createElement('p');
    inputLabel.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Input:';
    right.appendChild(inputLabel);
    input = CodeMirror(right, {
        mode: null,
        theme: 'tomorrow-night-bright',
        smartIndent: false,
        electricChars: false,
        lineNumbers: true,
        highlightSelectionMatches: true,
        styleActiveLine: { nonEmpty: true },
        selectionPointer: true,
        scrollPastEnd: true
    });
    input.getWrapperElement().id = 'editor-input';
    
    // Instantiate output view.
    let outputLabel = document.createElement('p');
    outputLabel.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Output:';
    right.appendChild(outputLabel);
    output = CodeMirror(right, {
        mode: null,
        theme: 'tomorrow-night-bright',
        smartIndent: false,
        electricChars: false,
        lineNumbers: true,
        readOnly: true,
        highlightSelectionMatches: true,
        styleActiveLine: { nonEmpty: true },
        selectionPointer: true,
        scrollPastEnd: true
    });
    output.getWrapperElement().id = 'editor-output';
}


export function close() {
    if (editor) {
        clear();
        editor.remove();
        editor = null;
        code = null;
        input = null;
        output = null;
        source = '';
        data = '';
    }
}


export function reset(newSource = source, newData = data) {
    source = newSource;
    data = newData;
    
    if (!editor) {
        open();
    }
    clear();
    code.setValue(source);
    input.setValue(data);
}


function run() {
    clear();
    
    // Start runner worker.
    runner = new Worker('runner.js');
    
    // Set up bindings.
    runner.onmessage = async function(event) {
        if (event.data.type == 'call') {
            runner.postMessage({ type: 'return', index: event.data.index, value: await bindings[event.data.name](...event.data.args) });
        }
    }
    for (let [name, object] of Object.entries(bindings)) {
        runner.postMessage({ type: 'bind', name: name });
    }
    
    // Run code in runner.
    runner.postMessage({ type: 'run', source: code.getDoc().getValue(), data: input.getDoc().getValue().trim() });
}


function stop() {
    if (runner) {
        runner.terminate();
        runner = null;
    }
}


function clear() {
    stop();
    output.setValue('');
    canvas.style.visibility = null;
}


function log(text) {
    let value = output.getDoc().getValue();
    output.getDoc().setValue(value + text + '\n');
}


function visualize(width, height) {
    let canvas = document.getElementById('visualization');
    canvas.width = width;
    canvas.height = height;
    canvas.style.visibility = 'visible';
}


async function drawFrame() {
    await new Promise(resolve => requestAnimationFrame(() => resolve()));
    for (let call of drawCalls) {
        call();
    }
    drawCalls = [];
}
