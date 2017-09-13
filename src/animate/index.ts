import { Observable } from 'rxjs'
export function scrollToElement <T extends HTMLElement> ( targetEl:T ):Observable<T> {

  const targetOffsetTop = targetEl.offsetTop
  window.scroll({
    top: targetOffsetTop,
    left: 0,
    behavior: 'smooth'
  })

  return Observable.interval(50).map ( () => window.scrollY )
    .distinctUntilChanged()
    .filter(y => y !== targetOffsetTop)
    .take(1).mapTo(targetEl)
}