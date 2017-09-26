import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import { Observable, Notification, Scheduler, Subject, AsyncSubject } from 'rxjs'

import { ScrollDirection } from '../enums/scroll-direction.enum'
import { MarginPosition } from '../enums/margin-position.enum'
import { ScrollEvent, ScrollMarginUpdate } from '../interfaces/scroll-event'
import { ScrollableComponent, ScrollableItem, ScrollPosition, ScrollMargin, ScrollState } from '../interfaces/scrollable-component'
//import { AppFeatures } from '../../../config'


const marginPosition = ( position:ScrollPosition ):number => {
  if ( 'string' === typeof position )
    return MarginPosition[position] || 0
  return position
}

@Injectable()
export class ScrollService {

  constructor () {
    //this.interval = Observable.interval(0,Scheduler.animationFrame)
  }

  pause:EventEmitter<boolean>=new EventEmitter()
  resume:EventEmitter<boolean>=new EventEmitter()

  pauseToggle=Observable.merge(
    this.pause.mapTo(true),
    this.resume.mapTo(false),
    Observable.of(false) // unpause on start
  )

  //private _debug_pauseToggle = window.afkm.logger.observe(this,'pauseToggle')

  getWindowSize(){
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  private interval:Observable<number>=Observable.interval(0,Scheduler.animationFrame)

  private windowSize=Observable.merge(
      Observable.of(this.getWindowSize()),
      Observable.fromEvent(window,'resize').map ( val => this.getWindowSize() )
    )
  
  get TOP():ScrollPosition {
    return MarginPosition.top
  }

  get CENTER():ScrollPosition {
    return MarginPosition.center
  }

  get BOTTOM():ScrollPosition {
    return MarginPosition.bottom
  }

  scrollEvents=this.pauseToggle
    .switchMap( paused => paused ? Observable.never() : this.interval )
    .map ( i => window.pageYOffset )
    .distinctUntilChanged()
    .scan ( ( prev:number=0, scrollY:number, idx:number ) => {
      return scrollY - prev
    } )
    .map ( diffY => {
      return {
        direction: diffY < 0 ? ScrollDirection.down : ScrollDirection.up,
        timestamp: Date.now(),
        distance: Math.sqrt(Math.pow(diffY,2))
      }
    } )

  //protected _debug_scrollEvents=window.afkm.logger.observe(this,'scrollEvents')

/*  get _scrollEvents():Observable<ScrollEvent> {
    //console.trace('subscribe to scrollEvents')
    if ( !this._events )
    {
      let lastScrollY = window.pageYOffset
      const source = this.interval
      //.withLatestFrom(this.nativeScrollEvent,(int,y)=>y)
      .map ( i => window.pageYOffset )
      //.filter( y => y !== lastScrollY )
      .distinctUntilChanged()
      .map ( y => {
        const diff = y - lastScrollY
        lastScrollY = y
        return {
          direction: diff < 0 ? ScrollDirection.down : ScrollDirection.up,
          timestamp: Date.now(),
          distance: Math.sqrt(Math.pow(diff,2))
        }
      } )
      this._events = source
        .catch ( error => {
          console.log('error in scroll service', error)
          return Observable.empty()
        } )
      
    }
    return this.pauseToggle.switchMap ( (paused:boolean) => paused ? Observable.never() : this._events )
  }*/

  private _events:Observable<ScrollEvent>
  private _lastScrollY:number=window.pageYOffset
  private _lastScrollTimestamp:number=0

  private _paused:boolean=false

  private _registeredComponents:Set<ScrollableItem>=new Set()

  registerComponent(component:ScrollableComponent,margins:ScrollMargin[],element:ElementRef):Observable<ScrollMarginUpdate>{
    /*if ( !AppFeatures.isEnabled(AppFeatures.Features.scrollSniffer) )
      return undefined*/

    const nativeElement:HTMLElement = element.nativeElement
    return this.scrollEvents
      //.debounceTime(60)
      .map ( scrollEvent => ({
        direction: scrollEvent.direction,
        bounds: nativeElement.getBoundingClientRect()
      }) )
      .withLatestFrom ( this.windowSize )
      .filter ( ([{bounds,direction},{width,height}]) => bounds.top <= (height*2) && bounds.bottom >= -(height) )
      .map ( ([{bounds,direction},{width,height}]) => {
      //console.log('elementBounds.top',elementBounds.top, element)
      const positions = margins.map ( 
        (margin:ScrollMargin) => {
          const marginY = (bounds.top + (bounds.height * marginPosition(margin.position)))
          return marginY ? marginY/window.innerHeight : 0
        }
      )
      return {
        positions,
        direction
      }
    })
  }  

}
