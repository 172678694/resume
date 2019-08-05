!function () {
    //点击导航栏后缓缓滑动到到相应区域
    var view = View('nav.menu');
    var controller = {
        view: null,
        aTags: null,
        init: function (view) {
            this.view = view;
            this.initAnimation();
            this.bindEvents();
        },
        initAnimation: function () {
            function animate(time) {
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }
            requestAnimationFrame(animate);
        },

        scrollToElement: function (element) {
            let top = element.offsetTop;
            let currentTop = window.scrollY;
            let targetTop = top - 120;
            let s = targetTop - currentTop;
            var coords = { y: currentTop //起始位置
            };var t = Math.abs(s / 100 * 300);
            if (t > 500) {
                t = 500;
            }
            var tween = new TWEEN.Tween(coords).to({ y: targetTop }, t) //结束位置和时间
            .easing(TWEEN.Easing.Quadratic.Out) //缓动类型
            .onUpdate(function () {
                window.scrollTo(0, coords.y);
            }) //如何更新页面
            .start(); //开始缓动
        },
        bindEvents: function (element) {
            let aTags = this.view.querySelectorAll('nav.menu>ul>li>a');
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = x => {
                    x.preventDefault();
                    let a = x.currentTarget;
                    let href = a.getAttribute('href'); //"#siteAbout"
                    let element = document.querySelector(href);
                    this.scrollToElement(element);
                };
            }
        }
    };
    controller.init(view);
}.call();