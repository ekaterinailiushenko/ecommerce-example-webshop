import { createMemoryHistory } from 'history'
import { MemoryRouter, Router } from 'react-router'
import { screen, render, act } from '@testing-library/react'

import { Cart } from './index'
import { cartApi } from '../../api/cartApi'
import { flushPromises } from '../../utilities'
import type { Cart as CartType } from '../../api/types'
import { CartContextProvider } from '../../contexts/CartContext/provider'
import { AuthContextProvider } from '../../contexts/AuthContext/provider'

const mockProducts = [
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
    it('should not render cart header or summary section', async () => {
      await renderApp()

      expect(screen.queryByText('Your Cart')).toBeNull()
      expect(screen.queryByText('Summary')).toBeNull()
    })

    it('should display "Your Cart is empty." message', async () => {
      await renderApp()

      expect(screen.getByText('Your Cart is empty.')).toBeVisible()
    })

    it('should display "Start Shopping" button', async () => {
      await renderApp()

      expect(screen.getByRole('button', { name: 'Start Shopping' })).toBeVisible()
    })

    it('should redirect to homepage when "Start Shopping" button is clicked', async () => {
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

      expect(screen.getByText('Your Cart is empty.')).toBeVisible()

      const startShoppingButton = screen.getByRole('button', { name: 'Start Shopping' })

      await act(async () => {
        startShoppingButton.click()

        await flushPromises()
      })

      expect(history.location.pathname).toBe('/ecommerce-example-webshop/')
    })
  })

  describe('when the cart has items', () => {
    beforeEach(() => {
      vi.mocked(cartApi.getCartSummary).mockResolvedValue(mockCartSummary)
      vi.mocked(cartApi.clearCart).mockResolvedValue(mockEmptyCartSummary)
    })

    it('should not render "Your Cart is empty." message', async () => {
      await renderApp()

      expect(screen.queryByText('Your Cart is empty.')).toBeNull()
    })

    it('should render cart header with correct product quantity', async () => {
      await renderApp()

      expect(screen.getByText('Your Cart')).toBeVisible()
      expect(screen.getByTestId('cart-header-items')).toHaveTextContent(
        `${mockCartSummary.productsQuantity} Items`
      )
    })

    it('should render products in the cart', async () => {
      await renderApp()

      mockProducts.forEach(product => expect(screen.getByText(product.name)).toBeVisible())
    })

    it('should render cart summary with calculated prices and product quantity', async () => {
      await renderApp()

      expect(screen.getByText('Summary')).toBeVisible()
      expect(screen.getByText('35,05 €')).toBeVisible()
      expect(screen.getByText('5,00 €')).toBeVisible()
      expect(screen.getByText('40,05 €')).toBeVisible()
      expect(screen.getByTestId('cart-summary-items')).toHaveTextContent(
        `${mockCartSummary.productsQuantity} Items`
      )
    })

    it('should render "Clear Cart" button', async () => {
      await renderApp()

      expect(screen.getByRole('button', { name: 'Clear Cart' })).toBeVisible()
    })

    it('should clear cart after "Clear Cart" button is clicked', async () => {
      await renderApp()

      mockProducts.forEach(product => expect(screen.getByText(product.name)).toBeVisible())

      const clearCartButton = screen.getByRole('button', { name: 'Clear Cart' })

      await act(async () => {
        clearCartButton.click()

        await flushPromises()
      })

      expect(screen.getByText('Your Cart is empty.')).toBeVisible()
    })
  })
})
