#!/usr/bin/env node
var arr = process.argv.slice(2);

console.time('总共需要时间'); 

var path = require('path');
var fs = require('fs');
var cwd = process.cwd();

var str = {};
var lineObj = {};
var readCount = 0;


function mkdirSync(url, mode, cb) {
  var path = require("path"),
    arr = url.split("/");
  mode = mode || 0755;
  cb = cb || function() {};
  if (arr[0] === ".") { //处理 ./aaa
    arr.shift();
  }
  if (arr[0] == "..") { //处理 ../ddd/d
    arr.splice(0, 2, arr[0] + "/" + arr[1])
  }

  function inner(cur) {
    if (!fs.existsSync(cur)) {
      //不存在就创建一个
      fs.mkdirSync(cur, mode)
    }
    if (arr.length) {
      inner(cur + "/" + arr.shift());
    } else {
      cb();
    }
  }
  arr.length && inner(arr.shift());
}



function readStream(file) {
  // console.log(file);
  var strTemp = "";
  str[file] = str[file] || '';


  var rs = fs.createReadStream(path.normalize(file));
  rs.on('data', function(chunk) {
    strTemp = chunk.toString('utf-8');
    var arr = strTemp.split('\r\n');
    str[file] += strTemp;
    for (var i = arr.length; i--;) {
      lineObj[arr[i]] = lineObj[arr[i]] ? lineObj[arr[i]] + 1 : 1;
    }
  });
  rs.on('end', function() {
    // console.log(file, str[file]);
    readCount++;
    // console.log(file, readCount, fileCount);
    // console.log( 'readCount === fileCount:', readCount === fileCount)
    if (readCount === fileCount) {
      // console.log(lineObj);
      wrtieToFile(lineObj);
      wrtieToFileCount(lineObj);
    }
  });
}
function wrtieToFile( obj ) {
  var filePath = '';
  var length = 0, count = 0;
  if( arr[1] === undefined ){
    arr[1] = 'output';
  }
  if ( 1 ) {
    // fs.mkdir(arr[1]);
    //测试代码
    mkdirSync(arr[1], 0, function(e) {
      if (e) {
        console.log(e, '出错了');
      } else {
        console.log("创建成功");
        if( arr[1] !== undefined ){
          arr[1] = 'output'
        }
        filePath = cwd + '/' + arr[1] + "/output.txt";
        fs.open(filePath, "w", 0777, function(e, fd) {
          if (e) {
            // throw e;
            console.log( filePath + '无法创建，程序错误。');
            return false;
          }
          fs.write(fd, 'now begin: ' + Date.now() + '\n', null, null, null, function(err) {
            if (err) {
              throw err;
              console.log( line, '写入文件出错。')
              return false;
            }
          });
          for(var line in obj){
            length ++;
            count += obj.line;
            fs.write(fd, line + '\n', null, null, null, function(err) {
              if (err) {
                throw err;
                console.log( line, '写入文件出错。')
                return false;
              }
            });
          }
          fs.write(fd, 'now end: ' + Date.now() + '\n', null, null, null, function(err) {
            if (err) {
              throw err;
              console.log( line, '写入文件出错。')
              return false;
            }
          });
          fs.close(fd, function() {
          });
          console.log('总共', length, '行单一数据，', '共输入'+ count + '行未统计重复数据。');
          console.timeEnd('总共需要时间');
        });
      }
    });
  }
}
function wrtieToFileCount( obj ) {
  var filePath = '';
  var length = 0, count = 0;
  if( arr[1] === undefined ){
    arr[1] = 'output';
  }
  if ( 1 ) {
    mkdirSync(arr[1], 0, function(e) {
      if (e) {
        console.log(e, '出错了');
      } else {
        console.log("创建成功");
        filePath = cwd + '/' + arr[1] + "/output.count.txt";
        fs.open(filePath, "w", 0777, function(e, fd) {
          if (e) {
            console.log( filePath + '无法创建，程序错误。');
            return false;
          }
          fs.write(fd, 'now begin: ' + Date.now() + '\n', null, null, null, function(err) {
            if (err) {
              throw err;
              console.log( line, '写入文件出错。')
              return false;
            }
          });
          for(var line in obj){
            length ++;
            count += obj.line;
            fs.write(fd, line + " : " + obj.line + '\n', null, null, null, function(err) {
              if (err) {
                throw err;
                console.log( line, '写入文件出错。')
                return false;
              }
            });
          }
          fs.write(fd, 'now end: ' + Date.now() + '\n', null, null, null, function(err) {
            if (err) {
              throw err;
              console.log( line, '写入文件出错。')
              return false;
            }
          });
          fs.close(fd, function() {
          });
          console.log('总共', length, '行单一数据，', '共输入'+ count + '行未统计重复数据。');
          console.timeEnd('总共需要时间');
        });
      }
    });
  }
}


var fileCount = 0;

function travel(dir, callback) {
  dir = path.normalize(dir);
  try {
    if (fs.statSync(dir).isDirectory()) {
      fs.readdirSync(dir).forEach(function(file) {        
        var pathname = path.join(dir, file);
        if (fs.statSync(pathname).isDirectory()) {
          // travel(pathname, callback);
        } else {
          if( /.txt$/ig.test(file) ){
            fileCount++;
            callback(pathname);
          }
        }
      });

    }
  } catch (e) {
    console.log('目录不存在，请检查');
    return;
  }
}
travel(cwd + '/' + arr[0], readStream);
