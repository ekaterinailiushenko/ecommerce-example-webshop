import i18next from 'i18next'
import { render, screen, act, within } from '@testing-library/react'

import { CartHeader } from './index'
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
    const withinCartHeader = within(cartHeader)

    const cartTitle = withinCartHeader.getByText(i18next.t('cart.title'))
    const productQuantity = withinCartHeader.getByText(
      i18next.t('cart.productItems', { count: mockCartSummary.productsQuantity })
    )
    const clearCartButton = withinCartHeader.getByRole('button', {
      name: i18next.t('cart.buttons.clearCart.title'),
    })

    expect(cartTitle).toBeVisible()
    expect(productQuantity).toBeVisible()
    expect(clearCartButton).toBeVisible()
    expect(clearCartButton).toBeEnabled()
  })
})
