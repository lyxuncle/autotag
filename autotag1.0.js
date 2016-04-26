var foldername = 'doubanspirite2';


var txtarea = document.getElementsByTagName('textarea'), 
    cCode = {
        12: {keyName:'L', shortfor:'外链', shortkey: 'l'},   //outer link, ctrl+l
        44: {keyName:'Comma', shortfor:'案例标题', shortkey: ','}, //case title, ctrl+,
        46: {keyName:'Period', shortfor:'图片', shortkey: '.'}, //image, ctrl+.
        47: {keyName:'Slsh', shortfor:'图片说明', shortkey: '/'}, //figure capture, ctrl+/
        27: {keyName:'Sbl', shortfor:'小编', shortkey: '['}, //author, ctrl+[
        29: {keyName:'Sbr', shortfor:'引用', shortkey: ']'}, //quote, ctrl+]
        31: {keyName:'V', shortfor:'视频', shortkey: ''},  //video, ctrl+
    }, 
    shortCut = {
        ctrlL: ['<a href="">', '</a>'], 
        ctrlComma: ['<span class="ar_full_sub">', '</span>'], 
        ctrlPeriod: ['<div class="img"><img lazy-src="', '" data-width="" data-height=""></div>'], 
        ctrlSlsh: ['<div class="figurecapture">', '</div>'], 
        ctrlSbl: ['<div class="author">', '</div>'], 
        ctrlSbr: ['<div class="quote">', '</div>'], 
        ctrlV: ['<video controls poster=""><source src="', '" type="video/mp4"></video>']
    };
Array.prototype.forEach.call(txtarea, function(item, idx){
    // item.onkeypress=interactive;
});

function interactive(evt){
    var ctrl = evt.ctrlKey, 
        subKey = evt.charCode;

    if(ctrl && (subKey===12 || subKey === 44 || subKey ===46 || subKey === 47 || subKey === 27 || subKey === 29)){
        
        
        wrap(this, subKey);
    }
        
}

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
        viewHtml += '<li><a class="viewMenuLink" data-code="'+key+'" href="javascript:void(0);">'+cCode[key].shortfor+' ctrl+'+cCode[key].shortkey+'</a></li>';
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