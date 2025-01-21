import { createMemoryHistory } from 'history'
import { MemoryRouter, Router } from 'react-router'
import { screen, render, act, within } from '@testing-library/react'

import { Cart } from './index'
import en from '../../i18n/en.json'
import { cartApi } from '../../api/cartApi'
import { Routes } from '../../router/config'
import { flushPromises } from '../../utilities'
import type { Cart as CartType } from '../../api/types'
import { CartContextProvider } from '../../contexts/CartContext/provider'
import { AuthContextProvider } from '../../contexts/AuthContext/provider'

const mockProducts: CartType['products'] = [
  {
    product_id: '1',
    name: 'Apples',
    pricePerProduct: 120,
    image: 'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/1.jpg',
    amountInCart: 1,
    priceForAmountInCart: 0,
  },
  {
    product_id: '2',
    name: 'Oranges',
    pricePerProduct: 167,
    image: 'https://s3-eu-west-1.amazonaws.com/developer-application-test/images/2.jpg',
    amountInCart: 1,
    priceForAmountInCart: 0,
  },
]

const mockCartSummary: CartType = {
  products: mockProducts,
  totalPrice: 3505,
  deliveryCosts: 500,
  productsQuantity: 2,
  totalPriceWithDeliveryCosts: 4005,
}

const mockEmptyCartSummary: CartType = {
  products: [],
  totalPrice: 0,
  deliveryCosts: 0,
  productsQuantity: 0,
  totalPriceWithDeliveryCosts: 0,
}

export const renderApp = async () => {
  render(
    <MemoryRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <Cart />
        </CartContextProvider>
      </AuthContextProvider>
    </MemoryRouter>
  )

  await act(async () => {
    await flushPromises()
  })
}

describe('Cart page', () => {
  describe('when the cart is empty', () => {
    it('should display empty cart section and not render cart header or summary section', async () => {
      await renderApp()

      expect(
        within(screen.getByTestId('empty-cart')).getByText(en.cart.emptyCart.mainMessage)
      ).toBeVisible()

      expect(screen.queryByTestId('cart-header')).toBeNull()
      expect(screen.queryByTestId('cart-summary')).toBeNull()
    })

    it('should display a navigation button that redirects to homepage when clicked', async () => {
      const history = createMemoryHistory()

      render(
        <Router location={history.location} navigator={history}>
          <AuthContextProvider>
            <CartContextProvider>
              <Cart />
            </CartContextProvider>
          </AuthContextProvider>
        </Router>
      )

      const startShoppingButton = within(screen.getByTestId('empty-cart')).getByRole('button', {
        name: en.cart.emptyCart.linkToMainPage,
      })

      await act(async () => {
        startShoppingButton.click()

        await flushPromises()
      })

      expect(history.location.pathname).toBe(Routes.HOME_PAGE_URL)
    })
  })

  describe('when the cart has items', () => {
    beforeEach(() => {
      vi.mocked(cartApi.getCartSummary).mockResolvedValue(mockCartSummary)
      vi.mocked(cartApi.clearCart).mockResolvedValue(mockEmptyCartSummary)
    })

    it('should render cart header with correct product quantity and not display empty cart section', async () => {
      await renderApp()

      expect(
        within(screen.getByTestId('cart-header')).getByText(
          `(${mockCartSummary.productsQuantity} ${en.cart.productItems})`
        )
      ).toBeVisible()

      expect(screen.queryByTestId('empty-cart')).toBeNull()
    })

    it('should render products in the cart', async () => {
      await renderApp()

      mockProducts.forEach(product => expect(screen.getByText(product.name)).toBeVisible())
    })

    it('should render cart summary with calculated prices and product quantity', async () => {
      await renderApp()

      expect(
        within(screen.getByTestId('cart-summary')).getByText(
          `(${mockCartSummary.productsQuantity} ${en.cart.productItems})`
        )
      ).toBeVisible()
      expect(screen.getByText('35,05 €')).toBeVisible()
      expect(screen.getByText('5,00 €')).toBeVisible()
      expect(screen.getByText('40,05 €')).toBeVisible()
    })

    it('should clear all products and display empty cart section after clear cart button is clicked', async () => {
      await renderApp()

      expect(screen.queryByTestId('empty-cart')).toBeNull()

      const clearCartButton = within(screen.getByTestId('cart-header')).getByRole('button', {
        name: en.cart.buttons.clearCart.title,
      })

      await act(async () => {
        clearCartButton.click()

        await flushPromises()
      })

      expect(screen.getByTestId('empty-cart')).toBeVisible()

      mockProducts.forEach(product => expect(screen.queryByText(product.name)).toBeNull())
      expect(screen.queryByTestId('cart-header')).toBeNull()
      expect(screen.queryByTestId('cart-summary')).toBeNull()
    })
  })
})
