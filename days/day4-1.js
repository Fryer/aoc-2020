let valid = 0;
let passports = data.split('\n\n');
for (let passport of passports) {
    passport = passport.split(/ |\n/);
    let fieldsLeft = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
    for (let field of passport) {
        field = field.split(':');
        if (fieldsLeft.has(field[0])) {
            fieldsLeft.delete(field[0]);
        }
    }
    if (fieldsLeft.size > 0) {
        continue;
    }
    valid++;
}
log('Valid passports (part 1): ' + valid);
