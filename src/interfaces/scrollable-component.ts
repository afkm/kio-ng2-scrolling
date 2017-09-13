import { ElementRef } from '@angular/core'

import { ScrollDirection } from '../enums/scroll-direction.enum'
import { MarginPosition } from '../enums/margin-position.enum'

export type ScrollPosition = number|keyof MarginPosition

export interface ScrollMargin {
  position:ScrollPosition
}

export interface ScrollState {
  inViewport:boolean
  // vertically relative position to top border of viewport 
  // 0 = top
  // 0.5 = middle
  // 1 = bottom
  positionInViewport:number
}

export interface ScrollableComponent {
  /*onMarginEnters(margin:ScrollMargin,state:ScrollState,direction:ScrollDirection)
  onMarginLeaves(margin:ScrollMargin,state:ScrollState,direction:ScrollDirection)*/
}

export function isScrollableComponent( component:any ): component is ScrollableComponent {
  return 'scrollMargins' in component && 'onMarginEnters' in component && 'onMarginLeaves' in component
}


export interface ScrollableItem {
  component:ScrollableComponent
  margins:ScrollMargin[]
  element:ElementRef
  lastPosition:number
}