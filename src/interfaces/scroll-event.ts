import { ScrollDirection } from '../enums/scroll-direction.enum'

export interface ScrollEvent {
  direction:ScrollDirection
  distance:number
  timestamp:number
}

export interface ScrollMarginUpdate {
  positions: number[],
  direction: ScrollDirection
}