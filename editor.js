let editor = null;
let code = null;
let input = null;
let output = null;

let commands = {};


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
    for (let [name, command] of Object.entries(commands)) {
        let spacing = document.createTextNode('\u00a0\u00a0\u00a0' + (links.innerHTML == '' ? '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0' : ''));
        links.appendChild(spacing);
        let link = document.createElement('span');
        link.className = 'command';
        link.textContent = name;
        link.addEventListener('click', command);
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
            globals: ['data', 'log'],
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
        editor.remove();
        output = null;
    }
}


export function reset(source, data) {
    if (!editor) {
        open();
    }
    
    code.setValue(source);
    input.setValue(data);
    output.setValue('');
}


function log(text) {
    let value = output.getDoc().getValue();
    output.getDoc().setValue(value + text + '\n');
}


commands['Run'] = function() {
    // Remove visalization.
    let canvas = document.getElementById('visualization');
    if (canvas) {
        canvas.remove();
    }
    
    // Run code.
    output.getDoc().setValue('');
    (new Function('data', 'log', code.getDoc().getValue()))(input.getDoc().getValue().trim(), log);
};
