import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Scheduler } from 'rxjs';
import { ScrollDirection } from '../enums/scroll-direction.enum';
import { MarginPosition } from '../enums/margin-position.enum';
//import { AppFeatures } from '../../../config'
var marginPosition = function (position) {
    if ('string' === typeof position)
        return MarginPosition[position] || 0;
    return position;
};
var ScrollService = /** @class */ (function () {
    function ScrollService() {
        var _this = this;
        this.pause = new EventEmitter();
        this.resume = new EventEmitter();
        this.pauseToggle = Observable.merge(this.pause.mapTo(true), this.resume.mapTo(false), Observable.of(false) // unpause on start
        );
        this.interval = Observable.interval(0, Scheduler.animationFrame);
        this.windowSize = Observable.merge(Observable.of(this.getWindowSize()), Observable.fromEvent(window, 'resize').map(function (val) { return _this.getWindowSize(); }));
        this.scrollEvents = this.pauseToggle
            .switchMap(function (paused) { return paused ? Observable.never() : _this.interval; })
            .map(function (i) { return window.pageYOffset; })
            .distinctUntilChanged()
            .scan(function (prev, scrollY, idx) {
            if (prev === void 0) { prev = 0; }
            return scrollY - prev;
        })
            .map(function (diffY) {
            return {
                direction: diffY < 0 ? ScrollDirection.down : ScrollDirection.up,
                timestamp: Date.now(),
                distance: Math.sqrt(Math.pow(diffY, 2))
            };
        });
        this._lastScrollY = window.pageYOffset;
        this._lastScrollTimestamp = 0;
        this._paused = false;
        this._registeredComponents = new Set();
        //this.interval = Observable.interval(0,Scheduler.animationFrame)
    }
    //private _debug_pauseToggle = window.afkm.logger.observe(this,'pauseToggle')
    ScrollService.prototype.getWindowSize = function () {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    };
    Object.defineProperty(ScrollService.prototype, "TOP", {
        get: function () {
            return MarginPosition.top;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollService.prototype, "CENTER", {
        get: function () {
            return MarginPosition.center;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollService.prototype, "BOTTOM", {
        get: function () {
            return MarginPosition.bottom;
        },
        enumerable: true,
        configurable: true
    });
    ScrollService.prototype.registerComponent = function (component, margins, element) {
        /*if ( !AppFeatures.isEnabled(AppFeatures.Features.scrollSniffer) )
          return undefined*/
        var nativeElement = element.nativeElement;
        return this.scrollEvents
            .map(function (scrollEvent) { return ({
            direction: scrollEvent.direction,
            bounds: nativeElement.getBoundingClientRect()
        }); })
            .withLatestFrom(this.windowSize)
            .filter(function (_a) {
            var _b = _a[0], bounds = _b.bounds, direction = _b.direction, _c = _a[1], width = _c.width, height = _c.height;
            return bounds.top <= (height * 2) && bounds.bottom >= -(height);
        })
            .map(function (_a) {
            var _b = _a[0], bounds = _b.bounds, direction = _b.direction, _c = _a[1], width = _c.width, height = _c.height;
            //console.log('elementBounds.top',elementBounds.top, element)
            var positions = margins.map(function (margin) {
                var marginY = (bounds.top + (bounds.height * marginPosition(margin.position)));
                return marginY ? marginY / window.innerHeight : 0;
            });
            return {
                positions: positions,
                direction: direction
            };
        });
    };
    ScrollService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ScrollService.ctorParameters = function () { return []; };
    return ScrollService;
}());
export { ScrollService };
