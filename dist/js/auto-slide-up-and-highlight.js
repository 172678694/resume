!function () {
    //添加offset类,制造从下往上浮现的效果
    let specialTags = document.querySelectorAll('[data-x]');
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset');
    }
    findClosest();

    window.addEventListener('scroll', function () {
        findClosest();
    });

    //当鼠标进入onmouseenter导航栏每个li标签时出现下划线
    let liTags = document.querySelectorAll('nav.menu>ul>li');
    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (x) {
            let li = x.currentTarget.classList.add('active');
        };
        liTags[i].onmouseleave = function (x) {
            let li = x.currentTarget.classList.remove('active');
        };
    }

    //helper
    function findClosest() {
        let specialTags = document.querySelectorAll('[data-x]');
        let minIndex = 0;
        //offsetTop 元素距离文档顶部的像素
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i; //minIndex就是离窗口顶部最近的元素
            }
        }
        specialTags[minIndex].classList.remove('offset');

        let id = specialTags[minIndex].id;
        let a = document.querySelector('a[href="#' + id + '"]');
        let li = a.parentNode;
        let brothersAndMe = li.parentNode.children;
        for (let i = 0; i < brothersAndMe.length; i++) {
            brothersAndMe[i].classList.remove('highlight');
        }
        li.classList.add('highlight');
    }
}.call();