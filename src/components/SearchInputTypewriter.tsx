import { useState, useEffect } from 'react'

import { useProductContext } from '../contexts/ProductContext/hook'

const TYPING_SPEED = 500
const DELAY_BETWEEN_WORDS = 1000

export const SearchInputTypewriter = ({
  setPlaceholderText,
}: {
  setPlaceholderText: (text: string) => void
}) => {
  const [wordIndex, setWordIndex] = useState(0) // Tracks the current word being typed
  const [charIndex, setCharIndex] = useState(0) // Tracks the current letter position within the word

  const { products } = useProductContext()

  const productsNames = products.map(product => product.name)

  useEffect(() => {
    const currentWordBeingTyped = productsNames[wordIndex]

    if (!currentWordBeingTyped) return

    let timeout: NodeJS.Timeout

    if (charIndex < currentWordBeingTyped.length) {
      // If the word is still being typed, add the next letter
      timeout = setTimeout(() => {
        setPlaceholderText(currentWordBeingTyped.slice(0, charIndex + 1)) // Update the text with the next letter
        setCharIndex(prev => prev + 1) // Move to the next letter
      }, TYPING_SPEED)
    } else {
      // If the word is fully typed, wait before switching to the next word
      timeout = setTimeout(() => {
        setCharIndex(0) // Reset letter index to start typing a new word
        setWordIndex(prev => (prev + 1) % productsNames.length) // Move to the next word
      }, DELAY_BETWEEN_WORDS)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, wordIndex, productsNames, setPlaceholderText])

  return null // This component only updates text, so it doesn’t render anything itself
}
