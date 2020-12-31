let passwords = data.split('\n');
let valid = passwords.reduce((valid, password) => {
    let parts = password.split(' ');
    let positions = parts[0].split('-').map(p => p - 1);
    let control = parts[1][0];
    let code = parts[2];
    return valid + (code[positions[0]] == control ^ code[positions[1]] == control);
}, 0);
log('Valid passwords (part 2): ' + valid);
