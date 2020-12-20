let editor = null;


export function open() {
    close();
    
    let editorDiv = document.createElement('div');
    editorDiv.id = 'editor';
    editorDiv.textContent = 'let lines = data.split(\'\\n\');\nconsole.log(lines);\nlog(\'(part 1): \');\n';
    document.body.appendChild(editorDiv);
    
    editor = ace.edit(editorDiv);
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
    });
    editor.session.setOptions({
        useWorker: false,
        mode: 'ace/mode/javascript'
    });
    editor.renderer.setOptions({
        theme: 'ace/theme/twilight',
        fontFamily: 'monospace',
        fontSize: 'unset',
        printMargin: false,
    });
    editor.commands.removeCommand('showSettingsMenu');
};


export function close() {
    if (editor) {
        editor.destroy();
        editor.container.remove();
        delete window.editor;
    }
}
