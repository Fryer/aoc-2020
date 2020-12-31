let exprs = data.split('\n').map(expr => expr.replaceAll(' ', ''));
function compute(expr) {
    let stack = [];
    let answer = 0;
    let op = '+';
    for (let i = 0; i < expr.length; i++) {
        if (expr[i] == '(') {
            stack.push([answer, op]);
            answer = 0;
            op = '+';
        }
        else if (expr[i] == ')') {
            let [stackAnswer, stackOp] = stack.pop();
            answer = stackOp == '+' ? stackAnswer + answer : stackAnswer * answer;
        }
        else if (expr[i] == '+' || expr[i] == '*') {
            op = expr[i];
        }
        else {
            answer = op == '+' ? answer + (+expr[i]) : answer * expr[i];
        }
    }
    return answer;
}
let sum = exprs.reduce((sum, expr) => sum + compute(expr), 0);
log('Sum of expressions (part 1): ' + sum);
