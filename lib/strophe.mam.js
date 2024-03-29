(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('vue-strophe.js')) :
	typeof define === 'function' && define.amd ? define(['vue-strophe.js'], factory) :
	(factory(global.window));
}(this, (function (strophe_js) { 'use strict';

/* XEP-0313: Message Archive Management
 * Copyright (C) 2012 Kim Alvefur
 *
 * This file is MIT/X11 licensed. Please see the
 * LICENSE.txt file in the source package for more information.
 *
 * Modified by: Chris Tunbridge (github.com/Destreyf/)
 * Updated to support v0.3 of the XMPP XEP-0313 standard
 * http://xmpp.org/extensions/xep-0313.html
 *
 */
strophe_js.Strophe.addConnectionPlugin('mam', {
    _c: null,
    _p: [ 'with', 'start', 'end' ],
    init: function (conn) {
        this._c = conn;
        strophe_js.Strophe.addNamespace('MAM', 'urn:xmpp:mam:2');
    },
    query: function (jid, options) {
        var _p = this._p;
        var attr = {
            type:'set',
            to:jid
        };
        options = options || {};
        var mamAttr = {xmlns: strophe_js.Strophe.NS.MAM};
        if (!!options.queryid) {
            mamAttr.queryid = options.queryid;
            delete options.queryid;
        }
        var iq = strophe_js.$iq(attr).c('query', mamAttr).c('x',{xmlns:'jabber:x:data', type:'submit'});

        iq.c('field',{var:'FORM_TYPE', type:'hidden'}).c('value').t(strophe_js.Strophe.NS.MAM).up().up();
        var i;
        for (i = 0; i < this._p.length; i++) {
            var pn = _p[i];
            var p = options[pn];
            delete options[pn];
            if (!!p) {
                iq.c('field',{var:pn}).c('value').t(p).up().up();
            }
        }
        iq.up();

        var onMessage = options.onMessage;
        delete options.onMessage;
        var onComplete = options.onComplete;
        delete options.onComplete;
        iq.cnode(new strophe_js.Strophe.RSM(options).toXML());

        var _c = this._c;
        var handler = _c.addHandler(onMessage, strophe_js.Strophe.NS.MAM, 'message', null);
        return this._c.sendIQ(iq, function(){
           _c.deleteHandler(handler);
           onComplete.apply(this, arguments);
        });
    }
});

})));
//# sourceMappingURL=strophe.mam.js.map
