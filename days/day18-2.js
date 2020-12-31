let exprs = data.split('\n').map(expr => expr.replaceAll(' ', ''));
function compute(expr) {
    let stack = [];
    let answer = 0;
    let op = '+';
    let level = 0;
    function push() {
        stack.push([answer, op, level]);
        answer = 0;
        op = '+';
        level = 0;
    }
    function pop(nextOp) {
        let part = answer;
        [answer, op, level] = stack.pop();
        computePart(part, nextOp);
    }
    function computePart(part, nextOp) {
        if (nextOp == '+' && level == 0) {
            push();
            answer = part;
            level = 1;
            return;
        }
        answer = op == '+' ? answer + part : answer * part;
        if (nextOp == '*' && level == 1) {
            pop(nextOp);
        }
    }
    for (let i = 0; i < expr.length; i++) {
        let nextOp = i + 1 < expr.length ? expr[i + 1] : '';
        if (expr[i] == '(') {
            push();
        }
        else if (expr[i] == ')') {
            if (level == 1) {
                pop('');
            }
            pop(nextOp);
        }
        else if (expr[i] == '+' || expr[i] == '*') {
            op = expr[i];
        }
        else {
            computePart(+expr[i], nextOp);
        }
    }
    if (level == 1) {
        pop('');
    }
    return answer;
}
let sum = exprs.reduce((sum, expr) => sum + compute(expr), 0);
log('Sum of expressions (part 2): ' + sum);
