import { MemoryRouter } from 'react-router'
import { screen, render, act, within } from '@testing-library/react'

import { Cart } from './index'
import en from '../../i18n/en.json'
import { cartApi } from '../../api/cartApi'
import { flushPromises } from '../../utilities'
import { CartContextProvider } from '../../contexts/CartContext/provider'
import { AuthContextProvider } from '../../contexts/AuthContext/provider'
import { mockCartSummary, mockEmptyCartSummary, mockProducts } from '../../mocks'

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
  })

  describe('when the cart has items', () => {
    beforeEach(() => {
      vi.mocked(cartApi.getCartSummary).mockResolvedValue(mockCartSummary)
      vi.mocked(cartApi.clearCart).mockResolvedValue(mockEmptyCartSummary)
    })

    it('should render cart header, cart summary and not display empty cart section', async () => {
      await renderApp()

      expect(screen.getByTestId('cart-header')).toBeVisible()
      expect(screen.getByTestId('cart-summary')).toBeVisible()

      expect(screen.queryByTestId('empty-cart')).toBeNull()
    })

    it('should render products in the cart', async () => {
      await renderApp()

      mockProducts.forEach(product => expect(screen.getByText(product.name)).toBeVisible())
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

      const emptyCart = screen.getByTestId('empty-cart')

      expect(emptyCart).toBeVisible()

      mockProducts.forEach(product =>
        expect(within(emptyCart).queryByText(product.name)).toBeNull()
      )
      expect(screen.queryByTestId('cart-header')).toBeNull()
      expect(screen.queryByTestId('cart-summary')).toBeNull()
    })
  })
})
