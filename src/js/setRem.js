import utils from 'utils';

/**
 * 根据页面可视宽度动态改变根节点(html)的font-size
 * iOS下,iOS下，对于 window.devicePixelRatio=2 的屏幕，用2倍的方案（页面缩放0.5）；对于 window.devicePixelRatio=3 的屏幕，用3倍的方案（页面缩放0.3333）；
 * 其余的用1倍方案
 */
export default function (num) {
    var doc = document;
    var win = window;
    var docEle = doc.documentElement;

    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var isAndroid = win.navigator.appVersion.match(/Android/gi);

    if (typeof num !== 'undefined') {
        if (typeof num === 'number') {
            docEle.style.fontSize = num + 'px';
            setDpr();
        } else {
            throw new Error('Parameters must be numeric types');
        }
        return;
    }

    var recalc = function () {
        clearTimeout(t);
        var t = setTimeout(cb, 0);
        function cb() {
            var clientWidth = docEle.clientWidth;
            if (!clientWidth) return;
            if (isIPhone || isAndroid) {
                docEle.style.fontSize = (clientWidth / 10) + 'px';
            } else {
                docEle.style.fontSize = '50px';
                docEle.style.width = '500px';
                docEle.style.margin = '0 auto';
            }

            setDpr();
        }
    };

    function setDpr() {
        var dpr, scale;

        var devicePixelRatio = win.devicePixelRatio;

        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3;
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2;
            } else {
                dpr = 1;
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1;
        }
        scale = 1 / dpr;
        docEle.setAttribute('data-dpr', dpr);

        //var metaEl = document.querySelector('meta[name="viewport"]');
        //metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

    }

    // 如果浏览器不支持addEventListener中止
    if (!doc.addEventListener) return;
    var resizeEvt = 'deviceorientation' in window ? 'deviceorientation' : 'resize';
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
