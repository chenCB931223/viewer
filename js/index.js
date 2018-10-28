$(function() {
    var vier = new Viewer();
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
}
Viewer.prototype.create = function() {
    this.container = $('<div id="view-box"></div>').hide();
    this.mask = $('<div class="view_mask"></div>').hide();

    var strDom = '<div class="box_pic" >' +
        '<div id="img_content" class="mask_pic">' +
        '<span class="prev iconfont icon-fanhui"></span>' +
        '<span class="next iconfont icon-jiantouyou"></span>' +
        '<img id="view_img" src=""/>' +
        '</div>' +
        '<div class="light_info">' +
        '<p class="pic_alt"></p>' +
        '<p class="active"></p>' +
        '<span class="reset">x</span>' +
        '</div>';
    '</div>' +

    this.container.append(strDom);
    $('body').append(this.mask, this.container);
}
Viewer.prototype.addEven = function() {
    var _this = this;
    $('body').on('click', '.view-pic', function(e) {
        _this.showBox();

        _this.getGroup(this);
        _this.setSize();
        _this.getArrow(this);


    });
    $('.prev').on('click', function() {

        _this.imgChange(-1);


    });
    $('.next').on('click', function() {
        _this.imgChange(1);
    });
    $(document).keyup(function(e) {
        switch (e.keyCode) {
            case 27:
                _this.hideBox();
                break;
            case 37:
                _this.imgChange(-1);
                break;
            case 39:
                _this.imgChange(1);
                break;
        };
    });
    $(".reset , .view_mask").on('click', function() {
        _this.hideBox();
    });
}
Viewer.prototype.getGroup = function(img) {
    var _this = this;
    var current_group = $(img).attr('data-group');

    if (current_group != _this.groupName) {
        this.groupName = current_group;
        this.groupList = $('body').find('img[data-group=' + this.groupName + ']');
        this.groupArr.length = 0;
        this.groupList.each(function() {
            _this.groupArr.push($(this));
        });
    }
    this.index = this.groupList.index($(img));
}
Viewer.prototype.imgChange = function(step) {
    $('.light_info').hide();

    this.index += step;
    var len = this.groupArr.length;
    this.index = Math.max(0, Math.min(this.index, len - 1));

    this.getArrow();
    this.setSize();

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
    var $view_img = $('#view_img'),
        _this = this;
    var theImg = new Image();
    theImg.src = this.groupArr[this.index].attr('src');
    var $win_w = ($(window).width()) * 0.8,
        $win_h = ($(window).height()) - 100,
        $img_w = theImg.width,
        $img_h = theImg.height;
    var scale_w = $win_w / $img_w,
        scale_h = $win_h / $img_h;
    var scale = Math.min(scale_w, scale_h, 1);
    $view_img.attr('src', ' ');
    $view_img.animate({
            width: $img_w * scale,
            height: $img_h * scale
        }, 800,
        function() {
            var $url = _this.groupArr[_this.index].attr('src');
            $view_img.attr('src', $url);
            $('.light_info').show();

            $('.active').html((_this.index + 1) + ' of ' + _this.groupArr.length);
            $('.pic_alt').html(_this.groupArr[_this.index].attr('alt'));

        });


}

Viewer.prototype.hideBox = function() {
    this.mask.fadeOut();
    this.container.fadeOut();
}
Viewer.prototype.showBox = function() {
    this.mask.show();
    this.container.show();
}
