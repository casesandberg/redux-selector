import _ from 'lodash'

export const scopeStateToSelectors = (selectorsMap, crossSelectors = {}) =>
  _.reduce(selectorsMap, (allScopedSelectors, selectors, scope) => (
    _.reduce(selectors, (scopedSelectors, selector, selectorName) => ({
      ...scopedSelectors,
      [selectorName]: (state, ...rest) => selector(state[scope], ...rest),
    }), allScopedSelectors)
  ), crossSelectors)
