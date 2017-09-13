import { CommonModule } from '@angular/common'
import { NgModule, ModuleWithProviders, Provider } from '@angular/core'
import { ScrollService } from './services/scroll.service'

export { ScrollEvent, ScrollMarginUpdate } from './interfaces/scroll-event'
export { ScrollMargin, ScrollPosition, ScrollState, ScrollableComponent, ScrollableItem, isScrollableComponent } from './interfaces/scrollable-component'
export { ScrollDirection } from './enums/scroll-direction.enum'
export { MarginPosition } from './enums/margin-position.enum'
export { ScrollService } from './services/scroll.service'

@NgModule({
  imports: [CommonModule],
  //declarations: [],
  providers: [ ScrollService ],
  //entryComponents: [],
  exports: [CommonModule]
})
export class KioNg2ScrollingModule {

  public static forRoot ():ModuleWithProviders {
    return {
      ngModule: KioNg2ScrollingModule,
      providers: [ ScrollService ]
    }
  }
}
