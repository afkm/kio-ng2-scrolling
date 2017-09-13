import { ElementRef, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ScrollDirection } from '../enums/scroll-direction.enum';
import { ScrollMarginUpdate } from '../interfaces/scroll-event';
import { ScrollableComponent, ScrollPosition, ScrollMargin } from '../interfaces/scrollable-component';
export declare class ScrollService {
    constructor();
    pause: EventEmitter<boolean>;
    resume: EventEmitter<boolean>;
    pauseToggle: Observable<boolean>;
    getWindowSize(): {
        width: number;
        height: number;
    };
    private interval;
    private windowSize;
    readonly TOP: ScrollPosition;
    readonly CENTER: ScrollPosition;
    readonly BOTTOM: ScrollPosition;
    scrollEvents: Observable<{
        direction: ScrollDirection;
        timestamp: number;
        distance: number;
    }>;
    private _events;
    private _lastScrollY;
    private _lastScrollTimestamp;
    private _paused;
    private _registeredComponents;
    registerComponent(component: ScrollableComponent, margins: ScrollMargin[], element: ElementRef): Observable<ScrollMarginUpdate>;
}
