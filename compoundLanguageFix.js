/**
 * Translation helper
 * controller-extensions.js
 * @return {String} translated version of arguments.
 */
Controller.prototype.t = function() {
    if (!this._t) {
        this._t = this.compound.T();
        this._t.locale = this.app.settings.defaultLocale || 'fu';

        if(this.context.req.session != undefined && this.context.req.session.language!=undefined)
        {
            this._t.locale = this.context.req.session.language;
        }
        this._T = this.compound.T;
    }
    return this._t.apply(this, [].slice.call(arguments));

};