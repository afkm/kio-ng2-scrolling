
# Kio Scrolling

## [ScrollService](./services/scroll.service.ts)

Injectable service that emits [ScrollEvents](#ScrollEvent) scheduled on animation frame interval

The service is implemented in `../components/kio-abstract/kio-abstract.component.ts` so all of its subclasses can use it, after initial registration with `startScrollTracking()`
   
## [ScrollMargin](./interfaces/scrollable-component.ts)
### properties
**position**
*number|top|center|bottom*
margin´s relative position on an element (0-1); top=0, center=0.5, bottom=1

   
# KioAbstractComponent

<a name="startScrollTracking"></a>startScrollTracking(margins:ScrollMargin[],element:ElementRef)
--------------------
register element on scroll service  
**margins**
*ScrollMargin[]*
margins to register for scroll tracking 


<a name="onScrollMarginUpdates"></a>onScrollMarginUpdates ( positions:number[] )
--------------------
called on scroll movement, if tracking was enabled through `startScrollTracking()`  
**positions**
*number[]*
updated relative positions for registered margins





### Usage

````javascript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ScrollableComponent, MarginPosition, ScrollMargin } from '../../../scrolling'

@Component(...)
export class SomeResponsiveComponent extends KioAbstractComponent {
	
	@ViewChild('scrollTarget') scrollTarget:ElementRef
	
	
  	cssPropValue:string=''

	onScrollMarginUpdates(positions:number[]){
		// only take values between 0 and 1
		const m = Math.max(Math.min(positions[0],1),0) * -1
		this.cssPropValue = `${m * 50}px`
	}
	
	ngOnInit(){
		super.ngOnInit()
		this.startScrollTracking(
			[
				{
					position: MarginPosition.top
				}
			],
			this.scrollTarget
		)
	}

}

````


   
## [ScrollEvent](./interfaces/scroll-event.ts)
<a name="ScrollEvent"></a>

emitted when scrolling

### properties

**direction**
*number*
direction of scroll movement (-1=up, 1=down)  
**distance**
*number*
distance of scroll movement in px  
**timestamp**
*number*
timestamp of original event

