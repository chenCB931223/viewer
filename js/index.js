$(function() {
    $('body').on('click','.view-pic', function() {
        var $container = $('<div></div>');
        $container.attr('id', 'view-box');

        var $mast = $('<div></div>');
        $mast.addClass('view_mast');

        var $img_content = $('<div></div>')
        $img_content.attr('id', 'img_content');
        $img_content.addClass('mast_pic')

        var $img = $('<img/>');
        var url = $(this).attr('src');
        $img.attr('id', 'vier_img');
        $img.attr('src', url);

        var $prev = $('<span></span>');
        $prev.addClass('prev iconfont icon-fanhui');
        $img_content.append($prev);

        var $next = $('<span></span>');
        $next.addClass('next iconfont icon-jiantouyou');
        $img_content.append($next);

        var $actic = $('<p></p>');
        var $img_alt = $(this).attr('alt');
        $actic.addClass('actic');
        $actic.html($img_alt);

        var $reset = $('<span></span>');
        $reset.addClass('reset');

        $img_content.append($img);
        $img_content.append($actic);
        $img_content.append($reset);
        $container.append($mast);
        $container.append($img_content);
        $('body').append($container);
        resetPic(0.5);
        hidePic();
    });

    function resetPic(scale) {
        var $img_content = $('#img_content');
        var $icon = $('.iconfont');
        var $img = $('#vier_img');

        var $i_width = $img.width() * scale;
        var $i_height = $img.height() * scale;

        $img_content.width(parseInt($i_width));
        $img.width($img_content.width())
        $icon.height($img.height());
        $img_content.css("margin-top", -parseInt($i_height / 2));
        $img_content.css("margin-left", -parseInt($i_width / 2));
    }

    function hidePic() {
        $(".reset").click(function() {
            $("#view-box").remove();
        });
    }
})
