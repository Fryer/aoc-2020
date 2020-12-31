let validPassports = 0;
let passports = data.split('\n\n');
for (let passport of passports) {
    passport = passport.split(/ |\n/);
    let fieldsLeft = new Set(['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
    let valid = true;
    for (let field of passport) {
        field = field.split(':');
        if (fieldsLeft.has(field[0])) {
            fieldsLeft.delete(field[0]);
        }
        switch (field[0]) {
            case 'byr':
                if (!/^[0-9]{4}$/.test(field[1]) || field[1] < 1920 || field[1] > 2002) {
                    valid = false;
                }
                break;
            case 'iyr':
                if (!/^[0-9]{4}$/.test(field[1]) || field[1] < 2010 || field[1] > 2020) {
                    valid = false;
                }
                break;
            case 'eyr':
                if (!/^[0-9]{4}$/.test(field[1]) || field[1] < 2020 || field[1] > 2030) {
                    valid = false;
                }
                break;
            case 'hgt':
                if (!/^[0-9]+(cm|in)$/.test(field[1])) {
                    valid = false;
                }
                else if (/[0-9]+cm/.test(field[1])) {
                    let hgt = field[1].replace('cm', '');
                    if (hgt < 150 || hgt > 193) {
                        valid = false;
                    }
                }
                else if (/[0-9]+in/.test(field[1])) {
                    let hgt = field[1].replace('in', '');
                    if (hgt < 59 || hgt > 76) {
                        valid = false;
                    }
                }
                break;
            case 'hcl':
                if (!/^#[0-9a-f]{6}$/.test(field[1])) {
                    valid = false;
                }
                break;
            case 'ecl':
                if (!/^amb|blu|brn|gry|grn|hzl|oth$/.test(field[1])) {
                    valid = false;
                }
                break;
            case 'pid':
                if (!/^[0-9]{9}$/.test(field[1])) {
                    valid = false;
                }
                break;
            default:
                break;
        }
    }
    if (fieldsLeft.size > 0 || !valid) {
        continue;
    }
    validPassports++;
}
log('Valid passports (part 2): ' + validPassports);
