$(function() {
    var vier = new Viewer({

    });
})

function Viewer() {
    this.groupName = null;
    this.groupArr = [];
    this.index = 0;
    this.init();
}
Viewer.prototype.init = function() {
    this.create();
    this.addEven();
    this.hidePic();
    this.getArrow();

}
Viewer.prototype.create = function() {
    this.container = $('<div id="view-box"></div>').hide();
    this.mast = $('<div class="view_mast"></div>').hide();

    var strDom = '<div id="img_content" class="mast_pic">' +
        '<span class="prev iconfont icon-fanhui"></span>' +
        '<span class="next iconfont icon-jiantouyou"></span>' +
        '<img id="vier_img" src=""/>' +
        '<div class="light_info">' +
        '<p class="active"></p>' +
        '<span class="reset">x</span>' +
        '</div>' +
        '</div>';

    this.container.append(strDom);
    $('body').append(this.mast, this.container);
}
Viewer.prototype.addEven = function() {
    var _this = this;
    $('body').on('click', '.view-pic', function(e) {
        var $img = $('#vier_img'),
            $actic = $('.active');
        _this.mast.show();
        _this.container.show();
        var $url = $(this).attr('src');
        $img.attr('src', $url);
        var $img_alt = $(this).attr('alt');
        $actic.html($img_alt);

        this.index = $(this).index();

        _this.setSize();
        _this.getGroup(this);
        _this.getArrow(this);

    });
    $('.prev').on('click', function() {
        _this.imgChange(-1);
        _this.getArrow()
        _this.setSize();

    });
    $('.next').on('click', function() {
        _this.imgChange(1);
        _this.getArrow()
        _this.setSize();

    });
}
Viewer.prototype.getGroup = function(img) {
    var _this = this;
    var current_group = $(img).attr('data-group');
    if (current_group != _this.groupName) {
        _this.groupName = current_group;

    }
    var groupList = $('body').find('*[data-group=' + this.groupName + ']');

    this.groupArr.length = 0;
    groupList.each(function() {
        _this.groupArr.push({
            src: $(this).attr('src'),
        });
    });

}
Viewer.prototype.imgChange = function(step) {
    var $img = $('#vier_img');
    this.index += step;

    $img.attr('src', this.groupArr[this.index].src)

}
Viewer.prototype.getArrow = function() {

    var arrLen = this.groupArr.length;
    if (arrLen > 1) {
        if (this.index == 0) {
            $('.prev').hide();
            $('.next').show();
        } else if (this.index == arrLen - 1) {
            $('.prev').show();
            $('.next').hide();
        } else {
            $('.prev,.next').show();
        }
    } else {
        $('.prev,.next').hide();
    }

}
Viewer.prototype.setSize = function() {
    var $view_img = $('#vier_img'),
        $img_content = $('#img_content'),
        $next = $('.next');
    var theImg = new Image();
    theImg.src = $view_img.attr('src');
    var $win_w = ($(window).width()) * 0.8,
        $win_h = ($(window).height()) - 50,
        $img_w = theImg.width,
        $img_h = theImg.height;
    var scale_w = $img_w / $win_w,
        scale_h = $img_h / $win_h;



    if ($img_w < $win_w && $img_h < $win_h) {
        $view_img.css({ width: $img_w, height: $img_h });
    } else {
        if (scale_w > scale_h) {
            $view_img.css({
                width: $win_w,
                height: $win_h / scale_w
            })
        } else {
            $view_img.css({
                width: $win_w / scale_h,
                height: $win_h
            })
        }
    }
    var left = parseInt(($win_w / 0.8) - $view_img.width()) / 2,
        top = parseInt(($win_h + 50) - $view_img.height()) / 2;


    $img_content.css({
        'left': left,
        'top': top
    });
    $next.css('height', $view_img.height())

}

Viewer.prototype.hidePic = function() {
    var _this = this;
    $(".reset , .view_mast").on('click', function() {
        _this.container.hide();
        _this.mast.hide();
    });
}
