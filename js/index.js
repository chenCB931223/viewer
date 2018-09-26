$(function() {
    var vier = new Viewer({});
})

function Viewer(obj) {
    this.a = obj.a;
    this.b = obj.b;
    this.init();
}
Viewer.prototype.init = function() {
    this.create();
    this.addEven();
    this.hidePic();
}
Viewer.prototype.create = function() {
    var $container = $('<div></div>');
    $container.attr('id', 'view-box');
    $container.css('display', 'none');

    var $mast = $('<div></div>');
    $mast.addClass('view_mast');

    var $img_content = $('<div></div>')
    $img_content.attr('id', 'img_content');
    $img_content.addClass('mast_pic')

    var $img = $('<img/>');
    $img.attr('id', 'vier_img');

    var $prev = $('<span></span>');
    $prev.addClass('prev iconfont icon-fanhui');
    $img_content.append($prev);

    var $next = $('<span></span>');
    $next.addClass('next iconfont icon-jiantouyou');
    $img_content.append($next);

    var $actic = $('<p></p>');
    $actic.addClass('actic');

    var $reset = $('<span></span>');
    $reset.addClass('reset');

    $img_content.append($img);
    $img_content.append($actic);
    $img_content.append($reset);
    $container.append($mast);
    $container.append($img_content);
    $('body').append($container);
}
Viewer.prototype.addEven = function() {
    var _this = this;
    $('body').on('click', '.view-pic', function() {
        var $containe = $('#view-box'),
            $img = $('#vier_img'),
            $actic = $('.actic');
        $containe.css('display', 'block');
        var $url = $(this).attr('src');
        $img.attr('src', $url);
        var $img_alt = $(this).attr('alt');
        $actic.html($img_alt);
        _this.setSize(this, 0.5);
    })；
    $('.prev').on('click', function() {

    });
    $('.next').on('click', function() {

    });
}

Viewer.prototype.setSize = function(img, scale) {
    var $win_w = $(window).width(),
        $win_h = $(window).height(),
        $img_w = img.naturalWidth * scale,
        $img_h = img.naturalHeight * scale;

    var left = parseInt($win_w - $img_w) / 2,
        top = parseInt($win_h - $img_h) / 2;

    $('#vier_img').css({ 'width': $img_w, 'height': $img_h });
    $('#img_content').css({ 'top': top, 'left': left });
    $('.iconfont').css('height', $img_h);
}
Viewer.prototype.imgChange = function(step) {
    var $img = $('.view-pic');
    $.each($img, function(i) {
        var $img_data = $($img[i]).attr('data-img');
        if ($img_data == 'a') {
                
        } else if ($img_data == 'b') {
            
        }
    })
}
Viewer.prototype.hidePic = function() {
    $(".reset").on('click', function() {
        $("#view-box").css('display', 'none');
    });
}
