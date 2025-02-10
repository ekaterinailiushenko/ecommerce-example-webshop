import i18next from 'i18next'
import userEvent from '@testing-library/user-event'
import { render, screen, within } from '@testing-library/react'

import { SupportedLanguages } from '../i18n/config'
import { LanguageSwitcher } from './LanguageSwitcher'

const renderLanguageSwitcher = () => {
  render(<LanguageSwitcher />)
}

describe('LanguageSwitcher', () => {
  it('should render switch language button with current language as button text', () => {
    renderLanguageSwitcher()

    const currentLanguage = i18next.language
    const switchLanguageButton = screen.getByRole('button', { name: currentLanguage })

    expect(switchLanguageButton).toBeVisible()
    expect(switchLanguageButton).toBeEnabled()
  })

  it('should open dropdown and render available language options when switch language button is clicked', async () => {
    renderLanguageSwitcher()

    expect(screen.queryByRole('menu')).toBeNull()

    const currentLanguage = i18next.language
    const switchLanguageButton = screen.getByRole('button', { name: currentLanguage })

    await userEvent.click(switchLanguageButton)

    const dropdown = screen.getByRole('menu')
    const withinDropdown = within(dropdown)

    const availableLanguages = SupportedLanguages.filter(lang => lang !== i18next.language)
    const languageOptions = withinDropdown.queryAllByRole('menuitem')

    expect(dropdown).toBeVisible()
    expect(languageOptions).toHaveLength(availableLanguages.length)
    languageOptions.forEach(option => {
      expect(option).toBeVisible()
    })
  })

  it('should not show current language in dropdown', async () => {
    renderLanguageSwitcher()

    const currentLanguage = i18next.language
    const switchLanguageButton = screen.getByRole('button', { name: currentLanguage })

    await userEvent.click(switchLanguageButton)

    const dropdown = screen.getByRole('menu')
    const withinDropdown = within(dropdown)

    expect(withinDropdown.queryByText(currentLanguage)).toBeNull()
  })

  it('should update current language after click on language option in dropdown', async () => {
    renderLanguageSwitcher()

    const currentLanguage = i18next.language
    const switchLanguageButton = screen.getByRole('button', { name: currentLanguage })

    expect(switchLanguageButton).toBeVisible()

    await userEvent.click(switchLanguageButton)

    const dropdown = screen.getByRole('menu')
    const withinDropdown = within(dropdown)

    const languageOptions = withinDropdown.queryAllByRole('menuitem')
    const newLanguageOption = languageOptions[0]

    if (!newLanguageOption?.textContent) {
      throw new Error('No alternative language found')
    }

    await userEvent.click(newLanguageOption)

    expect(i18next.language).toBe(newLanguageOption.textContent)
    expect(screen.getByRole('button', { name: newLanguageOption.textContent })).toBeVisible()
  })
})
