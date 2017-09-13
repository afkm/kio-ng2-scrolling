export function isScrollableComponent(component) {
    return 'scrollMargins' in component && 'onMarginEnters' in component && 'onMarginLeaves' in component;
}
