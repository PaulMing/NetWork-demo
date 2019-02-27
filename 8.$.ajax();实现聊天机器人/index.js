

// 行为处理
function bindEvent(){
    $('.inp').on('keydown',function(e){
        // 写法1：
        if(e.keyCode === 13){
            // trigger();//自动触发事件,参数为事件名称
            $('.btn').trigger('click');
        }
    });
    $(".btn").on('click',function(e){
        var val = $('.inp').val();
        // 判断如果input框有值 -> 进行数据渲染，获取数据
        if(val){
            renderDom(val,'mine');
            getData(val);
        }
    });
}
// 获取数据: 后台设置了CORS,所以不用jsonp跨域
function getData(val){
    $.ajax({
        type: 'GET',
        url: 'http://data.duyiedu.com/api/chat',
        data: {
            text: val,
        }, 
        success: function(data){
            console.log(data,typeof data);  
            var dataList = JSON.parse(data);
            console.log(dataList);
            renderDom(dataList.text,'rabit');
        }  
    })
}
// 数据渲染
function renderDom(text,str){
    if(str == 'mine'){
        var dom = $('<div class="mine talk">\
                        <div class="avitor-mine"></div>\
                        <div class="text">'+text+'</div>\
                    </div>')
    }else{
        var dom = $('<div class="rabit talk">\
                        <div class="avitor avitor-rabit"></div>\
                        <div class="text">'+text+'</div>\
                   </div>')
    }
    $('.content-wrapper').append(dom);
    $('.inp').val('');
}
bindEvent();

// 小结：
// 事件绑定中巧妙使用了trigger();方法，还可以有其他写法
// 写法2
/* function bindEvent(){
    $('inp').on('keydown',function(e){
        var val = $('this').val();
        if(e.keyCode == 13){
            renderDom(val,'mine');
            getData(val);
        }
    })
    $('.btn').on('click',function(){
        var val = $('.inp').val();
        renderDom(val,'mine');
        getData(val);
    })
} */
// 写法3;//有bug -> 当点击按钮的时候 -> 自动触发input框的keydown事件，但没有触发函数内的判断条件 -> 所以无法成功渲染页面
/* function bindEvent(){
    $('inp').on('keydown',function(e){
        var val = $('this').val();
        if(e.keyCode == 13){
            renderDom(val,mine);
            getData(val);
        }
    })
    $('.btn').on('click',function(){
        $('inp').trigger('keydown');
    })
} */
