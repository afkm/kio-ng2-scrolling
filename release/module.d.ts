import { ModuleWithProviders } from '@angular/core';
export { ScrollEvent, ScrollMarginUpdate } from './interfaces/scroll-event';
export { ScrollMargin, ScrollPosition, ScrollState, ScrollableComponent, ScrollableItem, isScrollableComponent } from './interfaces/scrollable-component';
export { ScrollDirection } from './enums/scroll-direction.enum';
export { MarginPosition } from './enums/margin-position.enum';
export { ScrollService } from './services/scroll.service';
export declare class KioNg2ScrollingModule {
    static forRoot(): ModuleWithProviders;
}
