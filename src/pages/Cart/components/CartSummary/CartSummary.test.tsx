import { act, render, screen, within } from '@testing-library/react'

import { CartSummary } from './index'
import en from '../../../../i18n/en.json'
import { cartApi } from '../../../../api/cartApi'
import { mockCartSummary } from '../../../../mocks'
import { flushPromises, formatPrice } from '../../../../utilities'
import { CartContextProvider } from '../../../../contexts/CartContext/provider'
import { AuthContextProvider } from '../../../../contexts/AuthContext/provider'

const renderCartSummary = async () => {
  render(
    <AuthContextProvider>
      <CartContextProvider>
        <CartSummary />
      </CartContextProvider>
    </AuthContextProvider>
  )

  await act(async () => {
    await flushPromises()
  })
}

describe('CartSummary', () => {
  it('should display loading state when cart summary is not loaded', async () => {
    await renderCartSummary()

    expect(screen.getByText(en.global.loading)).toBeVisible()
  })

  it('should display cart summary title, product quantity, calculated prices and action button', async () => {
    vi.mocked(cartApi.getCartSummary).mockResolvedValue(mockCartSummary)

    await renderCartSummary()

    const cartSummary = screen.getByTestId('cart-summary')

    const cartSummaryTitle = within(cartSummary).getByText(en.cart.summary)

    expect(cartSummaryTitle).toBeVisible()

    const productQuantity = within(cartSummary).getByText(
      `(${mockCartSummary.productsQuantity} ${en.cart.productItems})`
    )

    expect(productQuantity).toBeVisible()

    const assertPriceInCartSummary = (price: number) => {
      const formattedPrice = formatPrice(price)

      if (formattedPrice) {
        expect(within(cartSummary).findByText(formattedPrice)).not.toBeNull()
      }
    }

    assertPriceInCartSummary(mockCartSummary.totalPrice)
    assertPriceInCartSummary(mockCartSummary.deliveryCosts)
    assertPriceInCartSummary(mockCartSummary.totalPriceWithDeliveryCosts)

    const buyButton = within(cartSummary).getByRole('button', {
      name: en.cart.buttons.buyNow.title,
    })

    expect(buyButton).toBeVisible()
  })
})
