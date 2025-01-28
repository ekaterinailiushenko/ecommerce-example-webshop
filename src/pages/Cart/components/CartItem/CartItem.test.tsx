import { render, waitFor, screen, act } from '@testing-library/react'

import en from '../../../../i18n/en.json'
import { cartApi } from '../../../../api/cartApi'
import { CartItem, REMOVAL_DELAY } from '../index'
import { flushPromises } from '../../../../utilities'
import { getProductsResponse } from '../../../../mocks'
import { CartContextProvider } from '../../../../contexts/CartContext/provider'
import { AuthContextProvider } from '../../../../contexts/AuthContext/provider'

const product = getProductsResponse[0]!

export const renderCartItem = async () => {
  render(
    <AuthContextProvider>
      <CartContextProvider>
        <CartItem item={product} />
      </CartContextProvider>
    </AuthContextProvider>
  )

  await act(async () => {
    await flushPromises()
  })
}

describe('CartItem', () => {
  it('should render product image, name, delivery time and cart button', async () => {
    await renderCartItem()

    expect(screen.getByAltText(en.products.productImageAltText)).toBeVisible()
    expect(screen.getByText(product.name)).toBeVisible()
    expect(screen.getByText(en.cart.deliveryTime)).toBeVisible()
  })

  it('should render product image, name and delivery time with opacity when delete product from cart button is clicked', async () => {
    await renderCartItem()

    const img = screen.getByAltText(en.products.productImageAltText)
    const deleteFromCartButton = screen.getByTestId('remove-from-cart')

    await act(async () => {
      deleteFromCartButton.click()

      await flushPromises()
    })

    await waitFor(() => {
      expect(img).toHaveClass('opacity-50')
    })
  })

  it('should call deleteProductFromCart function when delete product from cart button is clicked', async () => {
    vi.useFakeTimers({
      shouldAdvanceTime: true,
    })

    await renderCartItem()

    const deleteFromCartButton = screen.getByTestId('remove-from-cart')

    await act(async () => {
      deleteFromCartButton.click()

      await vi.advanceTimersByTimeAsync(REMOVAL_DELAY)
    })

    expect(cartApi.deleteProductFromCart).toHaveBeenCalledTimes(1)
  })

  it('should show undo button and hide delete product from cart button when it is clicked', async () => {
    await renderCartItem()

    const visibleDeleteFromCartButton = screen.getByTestId('remove-from-cart')

    expect(visibleDeleteFromCartButton).toBeVisible()

    const unvisibleUndoButton = screen.queryByRole('button', {
      name: en.cart.buttons.undoRemoveFromCart.title,
    })

    expect(unvisibleUndoButton).toBeNull()

    await act(async () => {
      visibleDeleteFromCartButton.click()

      await flushPromises()
    })

    const disabledDeleteFromCartButton = screen.queryByTestId('remove-from-cart')

    expect(disabledDeleteFromCartButton).toHaveAttribute('disabled')

    const visibleUndoButton = screen.getByRole('button', {
      name: en.cart.buttons.undoRemoveFromCart.title,
    })

    expect(visibleUndoButton).toBeVisible()
  })

  it('should cancel product removal when undo button is clicked', async () => {
    await renderCartItem()

    const unvisibleUndoButton = screen.queryByRole('button', {
      name: en.cart.buttons.undoRemoveFromCart.title,
    })

    expect(unvisibleUndoButton).toBeNull()

    const visibleDeleteFromCartButton = screen.getByTestId('remove-from-cart')

    expect(visibleDeleteFromCartButton).toBeVisible()

    await act(async () => {
      visibleDeleteFromCartButton.click()

      await flushPromises()
    })

    const visibleUndoButton = await screen.findByRole('button', {
      name: en.cart.buttons.undoRemoveFromCart.title,
    })

    expect(visibleUndoButton).toBeVisible()

    const disabledDeleteFromCartButton = screen.queryByTestId('remove-from-cart')

    expect(disabledDeleteFromCartButton).toHaveAttribute('disabled')

    await act(async () => {
      visibleUndoButton.click()

      await flushPromises()
    })

    expect(visibleDeleteFromCartButton).toBeVisible()
    expect(unvisibleUndoButton).toBeNull()
  })
})
