import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import useTokenPrices from "@/hooks/useTokenPrices"
import AlertModal from "@/components/AlertModal"
import { validatePositiveNumber } from "@/utils/validateInput"
import Loading from "@/components/Loading"
import CurrencyItem from "@/components/CurrencyItem"

const Solution2: React.FC = () => {
	const [formData, setFormData] = useState({
		fromCurrency: "",
		toCurrency: "",
		amount: ""
	})
	const [loading, setLoading] = useState(false)

	const [error, setError] = useState("")
	const { prices, error: fetchError } = useTokenPrices()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalTitle, setModalTitle] = useState("")
	const [modalDescription, setModalDescription] = useState("")


	const handleSwap = async () => {
		const { fromCurrency, toCurrency, amount } = formData
		if (!fromCurrency || !toCurrency || !amount) {
			setError("Please fill in all fields")
			return
		}

		if (parseFloat(amount) < 0) return

		setLoading(true)
		setError("")

		// Simulate a network request
		setTimeout(() => {
			setLoading(false)
			const fromPrice = prices[fromCurrency]
			const toPrice = prices[toCurrency]
			if (!fromPrice || !toPrice) {
				setError("Invalid currency selected")
				return
			}
			const exchangeRate = toPrice / fromPrice
			const result = parseFloat(amount) * exchangeRate

			console.log(fromPrice)

			setModalTitle("Swap Successful")
			setModalDescription(`You will receive ${result} ${toCurrency}`)
			setIsModalOpen(true)
		}, 2000)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const { error } = validatePositiveNumber(value)
		setError(error)
		setFormData(prev => ({ ...prev, amount: value }))
	}

	const handleCurrencyChange = (field: "fromCurrency" | "toCurrency") => (value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }))
	}

	const filteredFromCurrencies = useMemo(() =>
		Object.keys(prices).filter(currency => formData.toCurrency !== currency),
		[prices, formData.toCurrency]
	)

	const filteredToCurrencies = useMemo(() =>
		Object.keys(prices).filter(currency => formData.fromCurrency !== currency),
		[prices, formData.fromCurrency]
	)



	return (
		<Card>
			<CardHeader>
				<CardTitle>Problem 2</CardTitle>
				<CardDescription>Fancy Form</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				{fetchError && (
					<div className="mb-4 p-2 bg-red-100 text-sm border border-red-400 text-red-700 rounded">
						{fetchError}
					</div>
				)}
				<form onSubmit={(e) => e.preventDefault()}>
					<div className="space-y-4">
						<div>
							<Label htmlFor="fromCurrency">From</Label>

							<Select onValueChange={handleCurrencyChange("fromCurrency")}>
								<SelectTrigger>
									<SelectValue placeholder="Select currency" />
								</SelectTrigger>
								<SelectContent>
									{filteredFromCurrencies.map((currency) => (
										<SelectItem key={`from-currency-${currency}`} value={currency}>
											<CurrencyItem currency={currency} />
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label htmlFor="toCurrency">To</Label>
							<Select onValueChange={handleCurrencyChange("toCurrency")}>
								<SelectTrigger>
									<SelectValue placeholder="Select currency" />
								</SelectTrigger>
								<SelectContent>
									{filteredToCurrencies.map((currency) => (
										<SelectItem key={`to-currency-${currency}`} value={currency}>
											<CurrencyItem currency={currency} />
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="mb-4">
							<Label htmlFor="amount">Amount</Label>
							<Input
								id="amount"
								type="number"
								min={0}
								value={formData.amount}
								onChange={handleInputChange}
							/>
						</div>
						{error && <p className="text-sm text-red-500 ml-1 mb-0">{error}</p>}
						<Button className="w-full mt-4" type="submit" onClick={handleSwap} disabled={loading || !!fetchError || !formData.fromCurrency || !formData.toCurrency || !formData.amount}>
							{loading && <Loading />}
							{loading ? "Swapping..." : "Swap"}
						</Button>
					</div>
				</form>
			</CardContent>
			<AlertModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={modalTitle}
				description={modalDescription}
			/>
		</Card>
	)
}

export default Solution2
