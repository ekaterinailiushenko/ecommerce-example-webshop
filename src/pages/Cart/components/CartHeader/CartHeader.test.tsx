import { render, screen, act, within } from '@testing-library/react'

import { CartHeader } from './index'
import en from '../../../../i18n/en.json'
import { cartApi } from '../../../../api/cartApi'
import { mockCartSummary } from '../../../../mocks'
import { flushPromises } from '../../../../utilities'
import { CartContextProvider } from '../../../../contexts/CartContext/provider'
import { AuthContextProvider } from '../../../../contexts/AuthContext/provider'

const renderCartHeader = async () => {
  render(
    <AuthContextProvider>
      <CartContextProvider>
        <CartHeader />
      </CartContextProvider>
    </AuthContextProvider>
  )

  await act(async () => {
    await flushPromises()
  })
}

describe('CartHeader', () => {
  beforeEach(() => {
    vi.mocked(cartApi.getCartSummary).mockResolvedValue(mockCartSummary)
  })

  it('should display cart title, product quantity and clear cart button', async () => {
    await renderCartHeader()

    const cartHeader = screen.getByTestId('cart-header')

    const cartTitle = within(cartHeader).getByText(en.cart.title)

    expect(cartTitle).toBeVisible()

    const productQuantity = within(cartHeader).getByText(
      `(${mockCartSummary.productsQuantity} ${en.cart.productItems})`
    )

    expect(productQuantity).toBeVisible()

    const clearCartButton = within(cartHeader).getByRole('button', {
      name: en.cart.buttons.clearCart.title,
    })

    expect(clearCartButton).toBeVisible()
  })
})
