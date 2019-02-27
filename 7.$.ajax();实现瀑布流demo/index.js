
// 结构 + 样式 + 行为处理
// 获取数据 -> 数据渲染，其中需要处理“获取最短列”以及当滚动条滑动到最短列没数据时，再次请求数据，完成数据渲染
(function(){
    var oLi = $('li');
    var page = 1;
    var flag = false;
// 获取最短列
function getMinLi(){
    var index = 0;
    var minH = $(oLi[0]).height();
    for(var i=0; i<oLi.length; i++){
        if($(oLi[i]).height() < minH){
            index = i;
            minH = $(oLi[i]).height();
        }
    }
    return {
        index: index,
        minH: minH
    }
}
// 渲染页面
function renderDom(item){   
    var oDiv = $('<div></div>');
    var img = new Image();
    img.src = item.preview;
    var p = $('<p></p>');
    p.text(item.title);
    img.onload = function(){
        oDiv.append(img);
        oDiv.append(p);
        var index = getMinLi().index;
        $(oLi[index]).append(oDiv);
    }
}
// 获取数据
function getData(){
    // 加锁
    if(flag){
        return;
    }
    flag = true;
    $('.loading').show();
    $.ajax({
        type: 'GET',
        url: './getPics.php',
        data: {
            cpage: page
        },
        success: function(data){
            var dataList = JSON.parse(data);
            dataList.forEach(function(item,index){
                renderDom(item);
            })
            // 当没有数据的时候 -> page=1 ->循环
            if(dataList.length < 1){
                page = 1;
            }
            $('.loading').hide();
            page++;
            flag = false;
        }
    })
}
getData();

// window对象scroll事件监听 -> 再次获取数据
$(window).scroll(function(){
    // 最短列的高度 < 滚动条滚动距离 + 可视区高度 ->请求新数据
    var scrollHeight = $(window).scrollTop();
    var winH = $(window).height();
    var minH = getMinLi().minH;
    if(minH <= scrollHeight + winH){
        getData();
    }
})
})()
