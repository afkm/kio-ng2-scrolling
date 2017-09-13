import { CommonModule } from '@angular/common'
import { NgModule, ModuleWithProviders, Provider } from '@angular/core'
import { ScrollService } from './services/scroll.service'

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
