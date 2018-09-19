$(function() {
    $('body').delegate('.view-pic', 'click', function() {
        var $container = $('<div></div>');
        $container.attr('id', 'view-box');

        var $mast = $('<div></div>');
        $mast.attr('id', 'view_mast');
        $mast.css('position', 'absolute');
        $mast.css('top', 0);
        $mast.css('left', 0);
        $mast.css('button', 0);
        $mast.css('right', 0);
        $mast.css('width', '100%');
        $mast.css('height', '100%');
        $mast.css('background', '#000');
        $mast.css('opacity', '0.7');

        var $img_content = $('<div></div>')
        $img_content.attr('id', 'img_content');
        $img_content.css('position', 'absolute');
        $img_content.css('top', '50%');
        $img_content.css('left', '50%');


        var $img = $('<img/>');
        var url = $(this).attr('src');
        $img.attr('id', 'vier_img');
        $img.attr('src', url);

        var $prev = $('<span></span>');
        $prev.attr('class', 'prev iconfont icon-fanhui');
        $img_content.append($prev);

        var $next = $('<span></span>');
        $next.attr('class', 'next iconfont icon-jiantouyou');
        $img_content.append($next);

        var $actic = $('<p></p>');
        var $img_alt = $(this).attr('alt');
        $actic.attr('class', 'actic');
        $actic.html($img_alt);

        var $reset = $('<span></span>');
        $reset.attr('class', 'reset');

        $img_content.append($img);
        $img_content.append($actic);
        $img_content.append($reset);
        $container.append($mast);
        $container.append($img_content);
        $('body').append($container);
        resetPic(0.5);
        addEvent();
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
