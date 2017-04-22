var
async = require('async'),
    fs = require('fs'),
    gm = require('gm').subClass({imageMagick: true});
    maxworkers = require('os').cpus().length,
    path = require('path');

module.exports = resize;

function resize(params) {
    var queue = async.queue(resizeimg, maxworkers);

    fs.readdir(params.src, function(err, files) {
        console.log('files.length = ' + files.length);
        files.forEach(function(file) {
            queue.push({
                src: path.join(params.src, '/', file),
                dest: path.join(params.dest, '/', file),
                width: params.width,
                height: params.height
            }, function(err) {
                if (err) throw err;
                console.log('gm resized image to fit within ' + params.height + 'x' + params.width + 'px');
            });
        });
    });
}

function resizeimg(params, cb) {
    var imoptions = {
        srcPath: params.src,
        dstPath: params.dest
    };
    if (params.width !== undefined) imoptions.width = params.width;
    if (params.height !== undefined) imoptions.height = params.height;
    gm(params.src)
    .resize(imoptions.width, imoptions.height, '!') //http://aheckmann.github.io/gm/docs.html#resize
    .quality(100)
    .write(params.dest, cb);

}
