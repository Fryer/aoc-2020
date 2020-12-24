let editor = null;


export function open() {
    close();
    
    editor = CodeMirror(document.body, {
        value: 'let lines = data.split(\'\\n\');\nconsole.log(lines);\nlog(\'(part 1): \');\n',
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
    
    let autoHintTokens = new Set(['property', 'variable', 'keyword', 'atom']);
    editor.on('change', (instance, changeObj) => {
        let token = instance.getTokenAt(instance.getDoc().getCursor(), true);
        if (token.string == '.' || autoHintTokens.has(token.type)) {
            instance.showHint({ completeSingle: false });
        }
        else {
            instance.closeHint();
        }
    });
};


export function close() {
    if (editor) {
        editor.getWrapperElement().remove();
        editor = null;
    }
}
