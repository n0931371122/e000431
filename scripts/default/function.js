function imgFill() {
    $('.imgFill').imgLiquid();
    $('.imgFill').each(function () {
    let imgUrl;
    const $this = $(this),
            $picture = $this.find('picture'),
            query = $this.data('query');
    const ww = window.innerWidth, wh = window.innerHeight;
    if ($picture.length) {
        const sourceLength = $picture.find('source').length;
        let sourceArry = [];
        $picture.find('source').each(function() {
        const srcset = $(this).attr('srcset');
        const node = $(this).attr('media').replace(/\(|\)| /g, '');
        const minmax = node.split(':')[0];
        const breakpoint = node.split(':')[1];
        sourceArry.push({
            srcset: srcset,
            minmax: minmax,
            breakpoint: breakpoint
        });
        });
        if ( query === 'size' ) {
        sourceArry.forEach(function(img) {
            if ( img.minmax === 'min-width' && ww >= parseFloat(img.breakpoint) ) {
            imgUrl = img.srcset;
            } else if ( img.minmax === 'max-width' && ww <= parseFloat(img.breakpoint) ) {
            imgUrl = img.srcset;
            }
        });
        } else if ( query === 'orientation' ) {
        sourceArry.forEach(function(img) {
            if ( img.breakpoint === 'landscape' && ww/wh > 1 ) {
            imgUrl = img.srcset;
            } else if ( img.breakpoint === 'portrait' && ww/wh <= 1 ) {
            imgUrl = img.srcset;
            }
        });
        }
        $this.css('background-image', 'url("' + imgUrl + '")');
    }
    });
}


function circleDot(){
    return '<svg viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1,0,0,1,-1470,-808)"><path class="path" d="M1522.31,819.688C1522.31,819.688 1516.12,811.041 1502,811C1492.88,810.974 1474,819.365 1474,840C1474,860.635 1489.86,869 1502,869C1514.14,869 1528.62,859.615 1530,845" style="fill:none;stroke:#ED1C24;stroke-width:4px;" /></g></svg>'
}
