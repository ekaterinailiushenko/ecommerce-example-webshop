import { act, render, screen } from '@testing-library/react'

import en from '../../../../i18n/en.json'
import { cartApi } from '../../../../api/cartApi'
import { flushPromises } from '../../../../utilities'
import { ProductQuantityInCartButton } from './index'
import { CartContextProvider } from '../../../../contexts/CartContext/provider'
import { AuthContextProvider } from '../../../../contexts/AuthContext/provider'
import { mockCartSummary, mockEmptyCartSummary, mockProduct } from '../../../../mocks'

const product = mockProduct

const renderComponent = async ({ isRemoving = false } = {}) => {
  render(
    <AuthContextProvider>
      <CartContextProvider>
        <ProductQuantityInCartButton product={product} isRemoving={isRemoving} />
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

      expect(screen.getByText(en.cart.buttons.addToCart.title)).toBeVisible()
    })

    it('should call addProductToCart when add to cart button is clicked', async () => {
      await renderComponent()

      const addToCartButton = screen.getByRole('button', { name: en.cart.buttons.addToCart.title })

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

    it('should render decrease and increase quantity buttons', async () => {
      await renderComponent()

      expect(screen.getByTestId('decrease-quantity')).toBeVisible()
      expect(screen.getByTestId('increase-quantity')).toBeVisible()
    })

    it('should render product quantity in the cart', async () => {
      await renderComponent()

      expect(screen.getByText(product.amountInCart)).toBeVisible()
    })
  })

  describe('when product is removing from the cart', () => {
    beforeEach(() => {
      vi.mocked(cartApi.getCartSummary).mockResolvedValue(mockCartSummary)
    })

    it('should render "Undo" button', async () => {
      await renderComponent({ isRemoving: true })

      expect(screen.getByText(en.cart.buttons.undoRemoveFromCart.title)).toBeVisible()
    })
  })
})
