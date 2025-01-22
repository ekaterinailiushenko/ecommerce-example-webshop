import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import { act, render, screen, within } from '@testing-library/react'

import { EmptyCart } from './index'
import en from '../../../../i18n/en.json'
import { Routes } from '../../../../router/config'
import { flushPromises } from '../../../../utilities'
import { CartContextProvider } from '../../../../contexts/CartContext/provider'
import { AuthContextProvider } from '../../../../contexts/AuthContext/provider'

const history = createMemoryHistory()

const renderCartSummary = async () => {
  render(
    <Router location={history.location} navigator={history}>
      <AuthContextProvider>
        <CartContextProvider>
          <EmptyCart />
        </CartContextProvider>
      </AuthContextProvider>
    </Router>
  )

  await act(async () => {
    await flushPromises()
  })
}

describe('EmptyCart', () => {
  it('should display empty cart image, main message, secondary message, and navigation button', async () => {
    await renderCartSummary()

    const emptySummary = screen.getByTestId('empty-cart')

    expect(within(emptySummary).getByAltText(en.cart.emptyCart.altText)).toBeVisible()
    expect(within(emptySummary).getByText(en.cart.emptyCart.mainMessage)).toBeVisible()
    expect(within(emptySummary).getByText(en.cart.emptyCart.secondaryMessage)).toBeVisible()

    const startShoppingButton = within(emptySummary).getByRole('button', {
      name: en.cart.emptyCart.linkToMainPage,
    })

    expect(startShoppingButton).toBeVisible()
  })

  it('should redirect to homepage when navigation button is clicked', async () => {
    await renderCartSummary()

    const emptySummary = screen.getByTestId('empty-cart')

    const startShoppingButton = within(emptySummary).getByRole('button', {
      name: en.cart.emptyCart.linkToMainPage,
    })

    await act(async () => {
      startShoppingButton.click()

      await flushPromises()
    })

    expect(history.location.pathname).toBe(Routes.HOME_PAGE_URL)
  })
})
