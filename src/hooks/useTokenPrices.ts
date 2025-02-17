import { useEffect, useState } from "react"

interface TokenPrice {
	currency: string
	date: string
	price: number
}

const useTokenPrices = () => {
	const [prices, setPrices] = useState<Record<string, number>>({})
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchPrices = async () => {
			try {
				const response = await fetch("https://interview.switcheo.com/prices.json")

				if (!response.ok) {
					throw new Error(`Failed to fetch prices: ${response.status} ${response.statusText}`)
				}

				const data: TokenPrice[] = await response.json()
				const latestPrices: Record<string, TokenPrice> = {}

				data.forEach((token) => {
					const existingToken = latestPrices[token.currency]

					if (!existingToken || new Date(token.date) > new Date(existingToken.date)) {
						latestPrices[token.currency] = token
					}
				})

				const priceMap = Object.fromEntries(
					Object.entries(latestPrices).map(([currency, token]) => [currency, token.price])
				)
				
				setPrices(priceMap)
				setError(null)

			} catch (err) {
				console.error("Error fetching token prices:", err)
				setError("Failed to fetch token prices. Please try again later.")
				setPrices({})
			}
		}

		fetchPrices()
	}, [])

	return { prices, error }
}

export default useTokenPrices