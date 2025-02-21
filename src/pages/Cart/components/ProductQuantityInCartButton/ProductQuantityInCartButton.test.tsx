import i18next from 'i18next'
import { act, render, screen } from '@testing-library/react'

import { cartApi } from '../../../../api/cartApi'
import { flushPromises } from '../../../../utilities'
import { ProductQuantityInCartButton } from './index'
import { CartContextProvider } from '../../../../contexts/CartContext/provider'
import { AuthContextProvider } from '../../../../contexts/AuthContext/provider'
import { mockCartSummary, mockEmptyCartSummary, mockProduct } from '../../../../mocks'

const elementsGetters = {
  get undoButton() {
    return screen.queryByText(i18next.t('cart.buttons.undoRemoveFromCart.title'))
  },
  get addToCartButton() {
    return screen.queryByText(i18next.t('cart.buttons.addToCart.title'))
  },
  get decreaseQuantityButton() {
    return screen.queryByTestId('decrease-quantity')
  },
  get increaseQuantityButton() {
    return screen.queryByTestId('increase-quantity')
  },
  get productQuantity() {
    return screen.queryByText(product.amountInCart)
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

const product = mockProduct

const renderComponent = async ({ isRemoving = false } = {}) => {
  render(
    <AuthContextProvider>
      <CartContextProvider>
        <ProductQuantityInCartButton productId={product.product_id} isRemoving={isRemoving} />
      </CartContextProvider>
    </AuthContextProvider>
  )

  await act(async () => {
    await flushPromises()
  })
}

describe('ProductQuantityInCartButton', () => {
  describe('when product is not in the cart', () => {
    beforeEach(() => {
      vi.mocked(cartApi.getCartSummary).mockResolvedValue(mockEmptyCartSummary)
    })

    it('should render add to cart button', async () => {
      await renderComponent()

      checkElements({
        undoButton: 'not-rendered',
        addToCartButton: 'rendered',
        decreaseQuantityButton: 'not-rendered',
        increaseQuantityButton: 'not-rendered',
        productQuantity: 'not-rendered',
      })
    })

    it('should call addProductToCart when add to cart button is clicked', async () => {
      await renderComponent()

      const addToCartButton = screen.getByRole('button', {
        name: i18next.t('cart.buttons.addToCart.title'),
      })

      expect(addToCartButton).toBeVisible()
      expect(addToCartButton).toBeEnabled()
      expect(cartApi.addProductToCart).not.toHaveBeenCalled()

      await act(async () => {
        addToCartButton.click()

        await flushPromises()
      })

      expect(cartApi.addProductToCart).toHaveBeenCalledTimes(1)
    })
  })

  describe('when product is in the cart', () => {
    beforeEach(() => {
      vi.mocked(cartApi.getCartSummary).mockResolvedValue(mockCartSummary)
    })

    it('should render decrease and increase quantity buttons and product quantity', async () => {
      await renderComponent()

      checkElements({
        undoButton: 'not-rendered',
        addToCartButton: 'not-rendered',
        decreaseQuantityButton: 'rendered',
        increaseQuantityButton: 'rendered',
        productQuantity: 'rendered',
      })
    })
  })

  describe('when product is removing from the cart', () => {
    beforeEach(() => {
      vi.mocked(cartApi.getCartSummary).mockResolvedValue(mockCartSummary)
    })

    it('should render "Undo" button', async () => {
      await renderComponent({ isRemoving: true })

      checkElements({
        undoButton: 'rendered',
        addToCartButton: 'not-rendered',
        decreaseQuantityButton: 'not-rendered',
        increaseQuantityButton: 'not-rendered',
        productQuantity: 'not-rendered',
      })
    })
  })
})
