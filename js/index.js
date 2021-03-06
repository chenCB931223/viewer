$(function() {
    var vier = new Viewer();
})

function Viewer() {
    this.groupName = null;
    this.groupArr = [];
    this.init();
}
Viewer.prototype.init = function() {
    this.create();
    this.addEven();
}
Viewer.prototype.create = function() {
    this.container = $('<div id="view-box"></div>').hide();
    this.mask = $('<div class="view_mask"></div>').hide();
    //创建布局
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
    //点击预览图片
    $('body').on('click', '.view-pic', function(e) {
        _this.showBox();
        _this.getGroup(this);
        _this.setSize();
        _this.getArrow(this);
    });
    //左箭头事件
    $('.prev').on('click', function() {

        _this.imgChange(-1);
    });
    //右箭头点击事件
    $('.next').on('click', function() {
        _this.imgChange(1);
    });
    //键盘事件
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
    //图片分组
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
//图片切换
Viewer.prototype.imgChange = function(step) {
    var len = this.groupArr.length;
    //判断是否是第一张和最后一张来阻止行为
    if (this.index == 0) {
        if (step == -1) {
            return false;
        }
    }
    if (this.index == len - 1) {
        if (step == 1) {
            return false;
        }
    }
    this.index += step;
    this.index = Math.max(0, Math.min(this.index, len - 1));
    this.getArrow();
    this.setSize();
}
Viewer.prototype.getArrow = function() {
    //判断左右箭头是否隐藏
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
//赋值src
Viewer.prototype.setSize = function() {
    var $view_img = $('#view_img'),
        _this = this;
    var theImg = new Image();
    $view_img.attr('src', ' ');
    theImg.src = this.groupArr[this.index].attr('src');
    theImg.onload = function() {
        var $win_w = ($(window).width()) * 0.8,
            $win_h = ($(window).height()) - 100,
            $img_w = theImg.width,
            $img_h = theImg.height;
        var scale_w = $win_w / $img_w,
            scale_h = $win_h / $img_h;
        var scale = Math.min(scale_w, scale_h, 1);
        $('.active').html((_this.index + 1) + ' of ' + _this.groupArr.length);
        $('.pic_alt').html(_this.groupArr[_this.index].attr('alt'));
        $view_img.stop().animate({
                width: $img_w * scale,
                height: $img_h * scale
            }, 800,
            function() {
                var $url = _this.groupArr[_this.index].attr('src');
                $view_img.attr('src', $url);
            });
    }

}

Viewer.prototype.hideBox = function() {
    this.mask.fadeOut();
    this.container.fadeOut();
}
Viewer.prototype.showBox = function() {
    this.mask.show();
    this.container.show();
}
