let passwords = data.split('\n');
let valid = passwords.reduce((valid, password) => {
    let parts = password.split(' ');
    let range = parts[0].split('-');
    let control = parts[1][0];
    let code = parts[2];
    let n = code.split('').reduce((n, chr) => n + (chr == control), 0);
    return valid + (n >= range[0] && n <= range[1]);
}, 0);
log('Valid passwords (part 1): ' + valid);
