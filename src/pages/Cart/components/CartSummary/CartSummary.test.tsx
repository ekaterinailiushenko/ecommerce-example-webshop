import i18next from 'i18next'
import { act, render, screen, within } from '@testing-library/react'

import { CartSummary } from './index'
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

    expect(screen.getByText(i18next.t('global.loading'))).toBeVisible()
  })

  it('should display cart summary title, product quantity, calculated prices and action button', async () => {
    vi.mocked(cartApi.getCartSummary).mockResolvedValue(mockCartSummary)

    await renderCartSummary()

    const cartSummary = screen.getByTestId('cart-summary')
    const withinCartSummary = within(cartSummary)

    const cartSummaryTitle = withinCartSummary.getByText(i18next.t('cart.summary'))
    const productQuantity = withinCartSummary.getByText(
      i18next.t('cart.productItems', { count: mockCartSummary.productsQuantity })
    )
    const buyButton = withinCartSummary.getByRole('button', {
      name: i18next.t('cart.buttons.buyNow.title'),
    })

    expect(cartSummaryTitle).toBeVisible()
    expect(productQuantity).toBeVisible()
    expect(buyButton).toBeVisible()
    expect(buyButton).toBeEnabled()

    const assertPriceInCartSummary = (price: number) => {
      const formattedPrice = formatPrice(price)

      if (!formattedPrice) {
        throw new Error(`Price formatting failed for: ${price}`)
      }

      expect(
        withinCartSummary.getByText(formattedPrice, { collapseWhitespace: false })
      ).toBeVisible()
    }

    assertPriceInCartSummary(mockCartSummary.totalPrice)
    assertPriceInCartSummary(mockCartSummary.deliveryCosts)
    assertPriceInCartSummary(mockCartSummary.totalPriceWithDeliveryCosts)
  })
})
