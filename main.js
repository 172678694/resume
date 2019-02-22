//添加offset类,制造从下往上浮现的效果
let specialTags = document.querySelectorAll('[data-x]')
for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add('offset')
}
findClosest()

//sticky navbar & 监听onscroll事件，高亮相应元素

//当文档在y方向上滚动的像素大于0（即开始滚动），topnavbar sticky
window.onscroll = function (xxxx) {
    if (window.scrollY > 0) {
        topNavBar.classList.add('sticky')
    } else {
        topNavBar.classList.remove('sticky')
    }
    findClosest()

}

//获取最靠近页面顶部的元素，即出现在用户眼前的元素
function findClosest() {
    let specialTags = document.querySelectorAll('[data-x]')
    let minIndex = 0
    //offsetTop 元素距离文档顶部的像素
    for (let i = 1; i < specialTags.length; i++) { 
        if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
            minIndex = i //minIndex就是离窗口顶部最近的元素
        }
    }
    specialTags[minIndex].classList.remove('offset') 

    let id = specialTags[minIndex].id
    let a = document.querySelector('a[href="#' + id + '"]')
    let li = a.parentNode
    let brothersAndMe = li.parentNode.children
    for (let i = 0; i < brothersAndMe.length; i++) {
        brothersAndMe[i].classList.remove('highlight') 
    }
    li.classList.add('highlight')
}

//当鼠标进入onmouseenter导航栏每个li标签时出现下划线
let liTags = document.querySelectorAll('nav.menu>ul>li')
for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (x) {
        let li = x.currentTarget.classList.add('active')
    }
    liTags[i].onmouseleave = function (x) {
        let li = x.currentTarget.classList.remove('active')
    }
}

//点击导航栏后缓缓滑动到到相应区域
let aTags = document.querySelectorAll('nav.menu>ul>li>a')
for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (x) {
        x.preventDefault()
        let a = x.currentTarget
        let href = a.getAttribute('href')     //"#siteAbout"
        let element = document.querySelector(href)
        let top = element.offsetTop

        let currentTop = window.scrollY
        let targetTop = top - 80
        let s = targetTop - currentTop

        //缓动
        // Setup the animation loop.
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        requestAnimationFrame(animate);

        var coords = { y: currentTop }
        var t = Math.abs((s / 100) * 300)
        if (t > 500) { t = 500 }
        var tween = new TWEEN.Tween(coords)
            .to({ y: targetTop }, t)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () { window.scrollTo(0, coords.y) })
            .start();
    }
}

