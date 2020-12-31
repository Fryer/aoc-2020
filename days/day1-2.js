let report = data.split('\n').map(line => line * 1);
let multiplied = -1;
report.slice(0, -2).forEach((iLine, i) => { report.slice(i + 1, -1).forEach((jLine, j) => { report.slice(j + 1).forEach((kLine, k) => {
    if (iLine + jLine + kLine == 2020) {
        multiplied = iLine * jLine * kLine;
    }
})})});
log('Multiplied expenses (part 2): ' + multiplied);
