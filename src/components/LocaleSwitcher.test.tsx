import i18next from 'i18next'
import userEvent from '@testing-library/user-event'
import { render, screen, within } from '@testing-library/react'

import { resources } from '../i18n/config'
import { LocaleSwitcher } from './LocaleSwitcher'

const renderLocaleSwitcher = () => {
  render(<LocaleSwitcher />)
}

describe('LocaleSwitcher', () => {
  it('should render switch language button with current language as button text', () => {
    renderLocaleSwitcher()

    const currentLanguage = i18next.language
    const openDropdownButton = screen.getByRole('button')

    expect(openDropdownButton).toBeVisible()
    expect(openDropdownButton).toBeEnabled()
    expect(openDropdownButton).toHaveTextContent(currentLanguage)
  })

  it('should open dropdown and render available language options when switch language button is clicked', async () => {
    renderLocaleSwitcher()

    const openDropdownButton = screen.getByRole('button')

    await userEvent.click(openDropdownButton)

    const dropdown = screen.getByRole('menu')
    const withinDropdown = within(dropdown)

    const availableLanguages = Object.keys(resources).filter(lang => lang !== i18next.language)
    const languageOptions = withinDropdown.queryAllByRole('menuitem')

    expect(dropdown).toBeVisible()
    expect(languageOptions).toHaveLength(availableLanguages.length)
    languageOptions.forEach(option => {
      expect(option).toBeVisible()
    })
  })

  it('should not show current language in dropdown', async () => {
    renderLocaleSwitcher()

    const openDropdownButton = screen.getByRole('button')

    await userEvent.click(openDropdownButton)

    const dropdown = screen.getByRole('menu')
    const withinDropdown = within(dropdown)

    const currentLanguage = i18next.language

    expect(withinDropdown.queryByText(currentLanguage)).toBeNull()
  })

  it('should update current language after click on language option in dropdown', async () => {
    renderLocaleSwitcher()

    const currentLanguage = i18next.language
    const openDropdownButton = screen.getByRole('button')

    expect(openDropdownButton).toHaveTextContent(currentLanguage)

    await userEvent.click(openDropdownButton)

    const dropdown = screen.getByRole('menu')
    const withinDropdown = within(dropdown)

    const languageOptions = withinDropdown.queryAllByRole('menuitem')
    const newLanguageOption = languageOptions[0]

    if (!newLanguageOption?.textContent) {
      throw new Error('No alternative language found')
    }

    await userEvent.click(newLanguageOption)

    expect(openDropdownButton).toHaveTextContent(newLanguageOption.textContent)
    expect(i18next.language).toBe(newLanguageOption.textContent)
  })
})
