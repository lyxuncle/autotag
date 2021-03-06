var foldername = 'doubanspirite2';


var txtarea = document.getElementsByTagName('textarea'), 
    cCode = {
        12: {keyName:'L', shortfor:'外链'},   //outer link
        44: {keyName:'Comma', shortfor:'案例标题'}, //case title
        46: {keyName:'Period', shortfor:'图片'}, //image
        47: {keyName:'Slsh', shortfor:'图片说明'}, //figure capture
        27: {keyName:'Sbl', shortfor:'小编'}, //author
        29: {keyName:'Sbr', shortfor:'引用'}, //quote
        31: {keyName:'V', shortfor:'视频'},  //video
        32: {keyName:'Sb', shortfor:'子标题'}  //subtitle
    }, 
    shortCut = {
        ctrlL: ['<a href="">', '</a>'], 
        ctrlComma: ['<span class="ar_full_sub">', '</span>'], 
        ctrlPeriod: ['<div class="img"><img lazy-src="', '" data-width="" data-height=""></div>'], 
        ctrlSlsh: ['<div class="figurecapture">', '</div>'], 
        ctrlSbl: ['<div class="author">', '</div>'], 
        ctrlSbr: ['<div class="quote">', '</div>'], 
        ctrlV: ['<video controls poster=""><source src="', '" type="video/mp4"></video>'], 
        ctrlSb: ['<div class="subtitle">', '</div>']
    };

function wrap(self, code){
    var selStart = self.selectionStart, 
        selEnd = self.selectionEnd,
        oristr = self.value, 
        str = [], 
        outstr = ''
        key = cCode[code];

    str.push(oristr.substr(0, selStart));
    str.push(oristr.substring(selStart, selEnd));
    str.push(oristr.substr(selEnd));

    outstr += str[0] + shortCut['ctrl'+key.keyName][0] + str[1] + shortCut['ctrl'+key.keyName][1] + str[2];
    self.value = outstr;
}

function view(){
    var viewHtml = '<ul id="viewMenu" style="position: fixed;top: 50%;left: 10px;background:#FFF;padding: 10px;text-align: center; border:1px solid #000; border-radius: 10px;">';

    for(key in cCode){
        viewHtml += '<li><a class="viewMenuLink" data-code="'+key+'" href="javascript:void(0);">'+cCode[key].shortfor+'</a></li>';
    }
    viewHtml += '</ul>';
    document.querySelector('.header').innerHTML += viewHtml;
    var aaa = document.querySelectorAll('.viewMenuLink');
    Array.prototype.forEach.call(aaa, function(item, idx){
        item.addEventListener('click', function(e){
            var code = this.getAttribute('data-code');
            wrap(document.querySelector('.zen_sublinks'), code);
        });
    });
}

view();

function imgTags(){
    var domhead = document.getElementsByTagName('head')[0], 
        srcpre = 'http://jdc.jd.com/h5/case/images/', 
        releasedate = getDate(document.querySelector('.ant-calendar-picker-input').value), 
        imgpath = '';
        imgpath = srcpre + releasedate + '/'+ foldername +'/';

    var picjs = document.createElement('script');
    picjs.src = imgpath +'pics.js';

    picjs.onload = picjs.onreadystatechange = function(){
        uploadpics_maga.forEach(function(item, idx){
            var img = document.createElement('img'), 
                src = imgpath+item;
            img.onload = function(){
                width = this.width;
                height = this.height;

                showImgTag(src, width, height, item);
            }
            img.src = src;
        });
    }

    domhead.appendChild(picjs);
}


function showImgTag(src, width, height, picname){
    var tag = '';
        tagstart = '<div class="img"><img lazy-src=', 
        tagend = '></div>', 
        stylesheet = 'line-height:50px;background:#eee url("'+src+'") no-repeat;';

    tag += tagstart;
    tag += '"' + src + '"';
    tag += ' data-width="'+ width +'"';
    tag += ' data-height="'+ height +'"';
    tag += tagend;
    console.log('%c'+picname, stylesheet);
    console.log(tag);
}

function getDate(value){
    return value.split('-').join('');
}

imgTags();