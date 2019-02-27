// ajax('GET', 'http://localhost/web/ajax/waterfall2-1/src/js/data.txt', addDom, 'cpage=2', true);
// function addDom(data) {
//     console.log(JSON.parse(data));
// }


(function () {
    var oLi = document.getElementsByClassName('box'),
        flag = false,
        num = 1,
        initWidth = 200;
    function getData() {
        if(!flag) {
            flag = true;
            ajax('GET', 'http://localhost/web/ajax/waterfall2-1/src/js/getPics.php', addDom, 'cpage=' + num, true)
            num++;
        }
    }
    getData();
    function addDom(data) {
        console.log(data);
        var dataList = JSON.parse(data);
        if(dataList.length > 0) {

        
            dataList.forEach(function (ele, index) {
                var minIndex = getMinList(oLi);
                var oItem = document.createElement('div'),
                    oImg = new Image(),
                    oP =  document.createElement('p'),
                    oCont = document.createElement('div');
                    oCont.className = 'cont';

                    oItem.className = 'item';
                    oImg.src = ele.preview;

                    oImg.height = ele.height*initWidth/ele.width;
                    oCont.style.height = ele.height*initWidth/ele.width;
                    oP.innerText = ele.title;
                    oImg.onerror = function() {
                        this.style.width = '202px';
                        oImg.height = ele.height*initWidth/ele.width + 2;
                        this.style.margin = '-1px'
                    }
                    oCont.appendChild(oImg)

                    oItem.appendChild(oCont);
                    oItem.appendChild(oP);

                    oLi[minIndex].appendChild(oItem);
            }) 
        }
        flag = false;
    }
    function getMinList(dom) {
        var minHeight = dom[0].offsetHeight,
            i = 1,
            index = 0;
        for(; i < dom.length; i++) {
            var minH = dom[i].offsetHeight;
            if(minH < minHeight) {
                minHeight = minH;
                index = i;
            }
        }
        return index;
    }

    window.onscroll = function () {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var pageHeigh = oLi[getMinList(oLi)].offsetHeight;

        if(scrollHeight + clientHeight > pageHeigh) {
            getData();
        }
    }

})()
