import i18next from 'i18next'
import { render, waitFor, screen, act } from '@testing-library/react'

import { CartItem } from '../index'
import { cartApi } from '../../../../api/cartApi'
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

    expect(screen.getByAltText(i18next.t('products.productImageAltText'))).toBeVisible()
    expect(screen.getByText(product.name)).toBeVisible()
    expect(screen.getByText(i18next.t('cart.deliveryTime'))).toBeVisible()
  })

  it('should render product image, name and delivery time with opacity when delete product from cart button is clicked', async () => {
    await renderCartItem()

    const img = screen.getByAltText(i18next.t('products.productImageAltText'))
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

    expect(cartApi.deleteProductFromCart).not.toHaveBeenCalled()

    await act(async () => {
      deleteFromCartButton.click()

      await vi.advanceTimersByTimeAsync(CartItem.removalDelay)
    })

    expect(cartApi.deleteProductFromCart).toHaveBeenCalledTimes(1)
  })

  it('should show undo button and hide delete product from cart button when it is clicked', async () => {
    await renderCartItem()

    const deleteButtonBeforeClick = screen.getByTestId('remove-from-cart')
    const undoButtonBeforeClick = screen.queryByRole('button', {
      name: i18next.t('cart.buttons.undoRemoveFromCart.title'),
    })

    expect(deleteButtonBeforeClick).toBeVisible()
    expect(deleteButtonBeforeClick).toBeEnabled()
    expect(undoButtonBeforeClick).toBeNull()

    await act(async () => {
      deleteButtonBeforeClick.click()

      await flushPromises()
    })

    const deleteButtonAfterClick = screen.queryByTestId('remove-from-cart')
    const undoButtonAfterClick = screen.getByRole('button', {
      name: i18next.t('cart.buttons.undoRemoveFromCart.title'),
    })

    expect(deleteButtonAfterClick).toBeDisabled()
    expect(undoButtonAfterClick).toBeVisible()
    expect(undoButtonAfterClick).toBeEnabled()
  })

  it('should cancel product removal when undo button is clicked', async () => {
    await renderCartItem()

    const deleteButtonBeforeClick = screen.getByTestId('remove-from-cart')
    const undoButtonBeforeClick = screen.queryByRole('button', {
      name: i18next.t('cart.buttons.undoRemoveFromCart.title'),
    })

    expect(deleteButtonBeforeClick).toBeVisible()
    expect(deleteButtonBeforeClick).toBeEnabled()
    expect(undoButtonBeforeClick).toBeNull()

    await act(async () => {
      deleteButtonBeforeClick.click()

      await flushPromises()
    })

    const deleteButtonAfterClick = screen.queryByTestId('remove-from-cart')
    const undoButtonAfterClick = await screen.findByRole('button', {
      name: i18next.t('cart.buttons.undoRemoveFromCart.title'),
    })

    expect(deleteButtonAfterClick).toBeDisabled()
    expect(undoButtonAfterClick).toBeVisible()
    expect(undoButtonAfterClick).toBeEnabled()

    await act(async () => {
      undoButtonAfterClick.click()

      await flushPromises()
    })

    expect(deleteButtonBeforeClick).toBeVisible()
    expect(deleteButtonBeforeClick).toBeEnabled()
    expect(undoButtonBeforeClick).toBeNull()
  })
})
