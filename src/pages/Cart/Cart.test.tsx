import i18next from 'i18next'
import { MemoryRouter } from 'react-router'
import { screen, render, act, within } from '@testing-library/react'

import { Cart } from './index'
import { CartItem } from './components'
import { cartApi } from '../../api/cartApi'
import { flushPromises } from '../../utilities'
import { CartContextProvider } from '../../contexts/CartContext/provider'
import { AuthContextProvider } from '../../contexts/AuthContext/provider'
import { getProductsResponse, mockCartSummary, mockEmptyCartSummary } from '../../mocks'

const elementsGetters = {
  get emptyCart() {
    return screen.queryByTestId('empty-cart')
  },
  get cartHeader() {
    return screen.queryByTestId('cart-header')
  },
  get cartSummary() {
    return screen.queryByTestId('cart-summary')
  },
}

type Config = Record<keyof typeof elementsGetters, 'rendered' | 'not-rendered'>

const checkElements = (config: Config) => {
  const keys = Object.keys(config) as (keyof Config)[]

  keys.forEach(key => {
    if (config[key] === 'rendered') {
      expect(elementsGetters[key]).toBeVisible()

      return
    }

    expect(elementsGetters[key]).toBeNull()
  })
}

const renderApp = async () => {
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

      checkElements({
        emptyCart: 'rendered',
        cartHeader: 'not-rendered',
        cartSummary: 'not-rendered',
      })
    })
  })

  describe('when the cart has items', () => {
    beforeEach(() => {
      vi.mocked(cartApi.getCartSummary).mockResolvedValue(mockCartSummary)
      vi.mocked(cartApi.clearCart).mockResolvedValue(mockEmptyCartSummary)
    })

    it('should render cart header, cart summary, products in the cart and not display empty cart section', async () => {
      await renderApp()

      checkElements({
        emptyCart: 'not-rendered',
        cartHeader: 'rendered',
        cartSummary: 'rendered',
      })

      getProductsResponse.forEach(product => {
        expect(screen.getByText(product.name)).toBeVisible()
      })
    })

    it('should delete products from the cart and display empty cart section after clear cart button is clicked', async () => {
      await renderApp()

      checkElements({
        emptyCart: 'not-rendered',
        cartHeader: 'rendered',
        cartSummary: 'rendered',
      })

      getProductsResponse.forEach(product => {
        expect(screen.getByText(product.name)).toBeVisible()
      })

      const clearCartButton = screen.getByRole('button', {
        name: i18next.t('cart.buttons.clearCart.title'),
      })

      await act(async () => {
        clearCartButton.click()

        await flushPromises()
      })

      getProductsResponse.forEach(product => {
        expect(screen.queryByText(product.name)).toBeNull()
      })

      checkElements({
        emptyCart: 'rendered',
        cartHeader: 'not-rendered',
        cartSummary: 'not-rendered',
      })
    })

    it('should remove product after the timeout if undo button is not clicked', async () => {
      vi.mocked(cartApi.deleteProductFromCart).mockResolvedValue({
        ...mockCartSummary,
        products: mockCartSummary.products.slice(1),
      })

      vi.useFakeTimers({
        shouldAdvanceTime: true,
      })

      await renderApp()

      const items = screen.getAllByTestId('cart-item')

      expect(items).toHaveLength(getProductsResponse.length)

      const item = items[0]

      if (!item) {
        throw new Error('Expected to find a cart item')
      }

      const deleteFromCartButton = within(item).getByTestId('remove-from-cart')

      await act(async () => {
        deleteFromCartButton.click()

        await vi.advanceTimersByTimeAsync(CartItem.removalDelay)
      })

      expect(item).not.toBeVisible()
      expect(screen.getAllByTestId('cart-item')).toHaveLength(getProductsResponse.length - 1)
    })
  })
})
