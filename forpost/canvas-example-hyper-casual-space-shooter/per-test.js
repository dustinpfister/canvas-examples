// test - the result of getN should equal the original value of n
var testForN = function (method, n, d, args) {
    args = args || [];
    //var per = method(n, d, 'per'),
    //n2 = method(per, d, 'n');
    var per = method.apply(null, [n, d, 'per'].concat(args || [])),
    n2 = method.apply(null,[per, d, 'n'].concat(args || []));
    return {
        method: method,
        n: n,
        d: d,
        per: per,
        pass: n === n2,
        n2: n2
    }
};

var n = 0,
d = 10,
step = 1,
result,
pass = true,
method = utils.log3,
args = [100]
while (n <= d) {
    result = testForN(method, n, d, args);
    if (!result.pass) {
        pass = false;
    }
    console.log('n=' + result.n.toFixed(2), 'per=' + result.per.toFixed(2), 'n2=' + result.n2.toFixed(2), result.pass);
    n += step;
}
console.log('passed? :' + pass);