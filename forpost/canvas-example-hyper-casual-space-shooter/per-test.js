// test - the result of getN should equal the original value of n
var testForN = function (n, d) {
    var per = log3.getPer(n, d),
    n2 = log3.getN(per, d),
    result = n === n2;
    console.log(n, n2, n === n2);
    return result;
};

testForN(5, 10);

var n = 0,
d = 10,
result,
pass = true;
while (n <= d) {
    result = testForN(n, d);
    if (!result) {
        pass = false;
    }
    //console.log( n ,'n == n2 : ' + result );
    n += 1
}
console.log('passed? :' + pass);
