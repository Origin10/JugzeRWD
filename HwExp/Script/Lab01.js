var table = "<table><caption><h4>九九乘法表</h4></caption><tbody><tr>";
for (var i = 2 ; i < 10 ; i++) {
    table += "<td>";
    for (var j = 1; j < 10 ; j++) {
        v = i + "*" + j + "=" + i * j + "<br>";
        table += v;
    }
    table += "</td>"
}
table += "</tr></tbody></table>"

document.write(table);