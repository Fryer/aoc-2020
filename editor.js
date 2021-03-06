const GUID = 'fd5c1b86-e8ed-4973-86cc-0070785ea2dc';


let editor = null;
let code = null;
let input = null;
let output = null;

let protectedFiles = {};
let file = null;
let codeGeneration = 0;
let inputGeneration = 0;
let autoSaveTimer = null;
let autoSaveListener = null;

let commands = [
    { name: '\u25b6\ufe0e Run', callback: run },
    { name: '\u23f9\ufe0e Stop', callback: stop },
    { name: '\u25c0\ufe0e Clear', callback: clear },
    { name: '|' },
    { name: '\u{1f504}\ufe0e Reload', callback: reload }
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
        link.textContent = command.name;
        if (command.callback) {
            link.className = 'command';
            link.addEventListener('click', () => command.callback());
        }
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
            globals: ['data', ...Object.keys(bindings)],
            latedef: 'nofunc',
            strict: 'implied',
            undef: true,
            unused: true,
            varstmt: true,
            boss: true,
            loopfunc: true,
            browser: true,
            devel: true,
            prefix: '(async function() {',
            postfix: '});'
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
    if (autoSaveTimer !== null) {
        autoSave();
        clearInterval(autoSaveTimer);
        autoSaveTimer = null;
        removeEventListener(autoSaveListener);
        autoSaveListener = null;
    }
    
    if (editor) {
        clear();
        editor.remove();
        editor = null;
        code = null;
        input = null;
        output = null;
        
        protectedFiles = {};
        file = null;
        codeGeneration = 0;
        inputGeneration = 0;
    }
}


export function protect(file, source, data) {
    protectedFiles[file] = { source: source, data: data };
}


function reload() {
    if (file === null) {
        return;
    }
    
    localStorage.removeItem(`${GUID}.tempFiles.${file}`);
    codeGeneration = code.getDoc().changeGeneration(true);
    inputGeneration = input.getDoc().changeGeneration(true);
    load(file);
}


export function load(file) {
    if (!editor) {
        open();
    }
    
    if (file === null) {
        reset(null, '', '');
        return;
    }
    
    // Load auto-saved file.
    let fileItem = localStorage.getItem(`${GUID}.tempFiles.${file}`);
    if (fileItem !== null) {
        fileItem = JSON.parse(fileItem);
        reset(file, fileItem.source, fileItem.data);
        return;
    }
    
    // Load protected file.
    if (protectedFiles.hasOwnProperty(file)) {
        reset(file, protectedFiles[file].source, protectedFiles[file].data);
    }
}


function reset(newFile, source, data) {
    autoSave();
    
    file = newFile;
    clear();
    code.setValue(source);
    code.getDoc().clearHistory();
    input.setValue(data);
    input.getDoc().clearHistory();
    
    // Activate auto-saving.
    codeGeneration = code.getDoc().changeGeneration(true);
    inputGeneration = input.getDoc().changeGeneration(true);
    if (autoSaveTimer === null) {
        autoSaveTimer = setInterval(autoSave, 5000);
        autoSaveListener = addEventListener('beforeunload', autoSave);
    }
}


function autoSave() {
    if (file === null || (code.getDoc().isClean(codeGeneration) && input.getDoc().isClean(inputGeneration))) {
        return;
    }
    
    localStorage.setItem(`${GUID}.tempFiles.${file}`, JSON.stringify({ source: code.getValue(), data: input.getValue() }));
    codeGeneration = code.getDoc().changeGeneration(true);
    inputGeneration = input.getDoc().changeGeneration(true);
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
        drawCalls = [];
    }
}


function clear() {
    stop();
    output.setValue('');
    canvas.style.visibility = null;
}


function log(text) {
    let line = output.getDoc().lastLine();
    if (line > 0) {
        output.getDoc().replaceRange(text + '\n', { line: line, ch: 0 });
        output.scrollIntoView({ line: line + 1, ch: 0 });
    }
    else {
        output.getDoc().setValue(text + '\n');
    }
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
