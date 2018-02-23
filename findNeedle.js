process.stdin.resume();
process.stdin.setEncoding('utf8');

var input_stdin = "";
var input_stdin_array = "";

process.stdin.on('data', function(chunk) {
    input_stdin += chunk;
    input_stdin_array = input_stdin.split("\n");
    findNeedles(input_stdin_array)
});

process.stdin.on('end', function() {
    console.log("");

});

var findNeedles = function(input) {
    // Iterate over the input array to find each occurrance of needle within the haystack.
    var needlelength, needle, haystack;
    for (var i = 0; i < input.length; i++) {
        if (i % 3 == 0) {
            needlelength = input[i];
            continue;
        }
        if (i % 3 == 1) {
            needle = input[i];
            continue;
        }
        if (i % 3 == 2) {
            haystack = input[i];
            console.log(" ");
            findOccurances(needlelength, needle, haystack);
        }
    }
}

function findOccurances(needlelength, needle, haystack) {
    var longsufpxArray = [],
        x = needlelength,
        endPtt = []; // array to store end pattern-match in the text

    while (x--) {
        longsufpxArray.push(0);
    }

    // Knuth–Morris–Pratt algorithm
    for (var i = 1, l = 0; i < needlelength;) {
        if (needle[i] == needle[l]) {
            longsufpxArray[i++] = ++l; // Next char matched, increment position
        } else {
            if (l > 0) {
                l = longsufpxArray[l - 1]; // Fall back in the pattern
            } else {
                ++i
            }
        }
    }

    for (var i = j = 0; i < haystack.length; ++i) {
        if (needle[j] == haystack[i]) {
            if (++j == needlelength) {
                endPtt.push(i);
            }
        } else {
            if (j > 0 && i--) {
                j = longsufpxArray[j - 1];
            }
        }
    }

    // print each position of occurances
    for (var i = 0; i < endPtt.length; ++i)
        console.log(endPtt[i] + 1 - needlelength)

}
