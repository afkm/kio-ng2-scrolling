import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollService } from './services/scroll.service';
export { isScrollableComponent } from './interfaces/scrollable-component';
export { ScrollDirection } from './enums/scroll-direction.enum';
export { MarginPosition } from './enums/margin-position.enum';
export { ScrollService } from './services/scroll.service';
var KioNg2ScrollingModule = /** @class */ (function () {
    function KioNg2ScrollingModule() {
    }
    KioNg2ScrollingModule.forRoot = function () {
        return {
            ngModule: KioNg2ScrollingModule,
            providers: [ScrollService]
        };
    };
    KioNg2ScrollingModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    //declarations: [],
                    providers: [ScrollService],
                    //entryComponents: [],
                    exports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    KioNg2ScrollingModule.ctorParameters = function () { return []; };
    return KioNg2ScrollingModule;
}());
export { KioNg2ScrollingModule };
