let report = data.split('\n').map(line => line * 1);
let multiplied = -1;
report.slice(0, -1).forEach((iLine, i) => { report.slice(i + 1).forEach((jLine, j) => {
    if (iLine + jLine == 2020) {
        multiplied = iLine * jLine;
    }
})});
log('Multiplied expenses (part 1): ' + multiplied);
