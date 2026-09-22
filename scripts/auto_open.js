var spawn = require('child_process').exec;

hexo.on('new', function(data){
  spawn('start "" "E:\\Typora\\Typora.exe" ' + data.path);
});