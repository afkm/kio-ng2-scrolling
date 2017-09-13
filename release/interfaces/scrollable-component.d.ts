import { ElementRef } from '@angular/core';
import { MarginPosition } from '../enums/margin-position.enum';
export declare type ScrollPosition = number | keyof MarginPosition;
export interface ScrollMargin {
    position: ScrollPosition;
}
export interface ScrollState {
    inViewport: boolean;
    positionInViewport: number;
}
export interface ScrollableComponent {
}
export declare function isScrollableComponent(component: any): component is ScrollableComponent;
export interface ScrollableItem {
    component: ScrollableComponent;
    margins: ScrollMargin[];
    element: ElementRef;
    lastPosition: number;
}
