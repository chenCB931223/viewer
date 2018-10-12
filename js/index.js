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
    this.hidePic();
}
Viewer.prototype.create = function() {
    this.container = $('<div id="view-box"></div>').hide();
    this.mask = $('<div class="view_mask"></div>').hide();

    var strDom = '<div id="img_content" class="mask_pic">' +
        '<span class="prev iconfont icon-fanhui"></span>' +
        '<span class="next iconfont icon-jiantouyou"></span>' +
        '<img id="view_img" src=""/>' +
        '<div class="light_info">' +
        '<p class="active"></p>' +
        '<p class="pic_alt"></p>' +
        '<span class="reset">x</span>' +
        '</div>' +
        '</div>';

    this.container.append(strDom);
    $('body').append(this.mask, this.container);
}
Viewer.prototype.addEven = function() {
    var _this = this;
    $('body').on('click', '.view-pic', function(e) {
        var $img = $('#view_img');
        _this.mask.show();
        _this.container.show();
        
        _this.setSize();
        _this.getGroup(this);
        _this.getArrow(this);

    });
    $('.prev').on('click', function() {
        _this.imgChange(-1);
    });
    $('.next').on('click', function() {
        _this.imgChange(1);
    });
}
Viewer.prototype.getGroup = function(img) {
    var _this = this;
    var current_group = $(img).attr('data-group');

    if (current_group != _this.groupName) {
        this.groupName = current_group;
        var $groupList = $('body').find('img[data-group=' + this.groupName + ']');
        this.groupArr.length = 0;
        $groupList.each(function() {
            _this.groupArr.push($(this));
        });
    }
    this.index = this.groupList.index($(img));


}
Viewer.prototype.imgChange = function(step) {
    this.index += step;

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
    $('.active').html((this.index + 1) + ' of ' + arrLen);
    $('.pic_alt').html(this.groupArr[this.index].attr('alt'));
}
Viewer.prototype.setSize = function() {
    var $view_img = $('#view_img'),
        $img_content = $('#img_content');
    var theImg = new Image();
    theImg.src = $view_img.attr('src');
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
        });

    var top = parseInt(($win_h + 50) - $view_img.height()) / 2;

    $img_content.css('top', top);

    $('.prev,.next').css('height', $view_img.height())
}

Viewer.prototype.hidePic = function() {
    var _this = this;
    $(".reset , .view_mask").on('click', function() {
        _this.mask.fadeOut();
        _this.container.fadeOut();
    });
}
