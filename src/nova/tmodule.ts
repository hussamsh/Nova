
// const fs = require('fs');

// fs.writeFile(".", "Hey there!", function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// }); 

// Or
// fs.writeFileSync('.', 'Hey there!');


var fs = require('fs');
var stream = fs.createWriteStream("filooooooooos.txt");
stream.once('open', function(fd) {
  stream.write("My first row\n");
  stream.write("My second row\n");
  stream.end();
});