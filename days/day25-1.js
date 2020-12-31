let [cardKey, doorKey] = data.split('\n').map(key => +key);
function getLoop(subject, target) {
    let key = 1;
    let loop = 0;
    while (key != target) {
        key *= subject;
        key %= 20201227;
        loop++;
    }
    return loop;
}
function transform(subject, nLoop) {
    let key = 1;
    for (let i = 0; i < nLoop; i++) {
        key *= subject;
        key %= 20201227;
    }
    return key;
}
let doorLoop = getLoop(7, doorKey);
let key = transform(cardKey, doorLoop);
log('Encryption key (part 1): ' + key);
