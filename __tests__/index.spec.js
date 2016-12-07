/* global describe, test, expect, jest, beforeEach */

import { scopeStateToSelectors } from '../src'


describe('scopeStateToSelectors', () => {
  test('scopes state down to selector functions', () => {
    const store = {
      ui: {
        filter: 'active',
      },
    }
    const getFilterState = (state) => {
      return state.filter
    }
    const selectors = scopeStateToSelectors({
      ui: { getFilterState },
    })

    expect(selectors.getFilterState(store)).toBe('active')
  })

  test('scopes deepy nested state down to selector functions', () => {
    const store = {
      messages: {
        ui: {
          tabBar: {
            filter: 'active',
          },
        },
      },
    }
    const getFilterState = (state) => {
      return state.filter
    }
    const selectors = scopeStateToSelectors({
      messages: scopeStateToSelectors({
        ui: scopeStateToSelectors({
          tabBar: { getFilterState },
        }),
      }),
    })

    expect(selectors.getFilterState(store)).toBe('active')
  })

  test('second param for cross-selectors', () => {
    const store = {
      ui: {
        filter: 'active',
      },
    }
    const getFilterState = (state) => {
      return state.ui.filter
    }
    const selectors = scopeStateToSelectors({}, {
      getFilterState,
    })

    expect(selectors.getFilterState(store)).toBe('active')
  })
})
