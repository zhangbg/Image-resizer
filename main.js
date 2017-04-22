var resize_imagemagick = require('./resize-imagemagick.js'); // 不能使用实际制定尺寸
var resize_gm = require('./resize-gm.js'); //能够使用指定尺寸
var resize = resize_gm;
resize({
    src: __dirname + '/' + 'src1',
    dest: __dirname + '/' + 'src2',
    width: 160,
    height: 230
});
