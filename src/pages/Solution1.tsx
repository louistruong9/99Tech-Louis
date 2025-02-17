import { useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { validatePositiveNumber } from '@/utils/validateInput'
import ImplementationBlock from '@/components/ImplementationBlock'
import OutputBlock from '@/components/OutputBlock'

type TSum = (n: number) => number

const sum_to_n_a: TSum = (n) => {
	let sum = 0
	for (let i = 1; i <= n; i++) {
		sum += i
	}
	return sum
}

const sum_to_n_b: TSum = (n) => (n * (n + 1)) / 2

const sum_to_n_c: TSum = (n) => {
	if (n === 0) return 0
	return (n === 1) ? 1 : n + sum_to_n_c(n - 1)
}


const implementation1 =
	`const sum_to_n_a = (n) => {
let sum = 0
for (let i = 1 i <= n i++) {
sum += i
}
return sum
}`

const implementation2 = `const sum_to_n_b = (n) => (n * (n + 1)) / 2`

const implementation3 = `const sum_to_n_c = (n) => 
{
if (n === 0) return 0
return (n === 1) ? 1 : n + sum_to_n_c(n - 1)
}`

const Solution1: React.FC = () => {
	const [outputs, setOutputs] = useState({
		outputA: sum_to_n_a(5),
		outputB: sum_to_n_b(5),
		outputC: sum_to_n_c(5)
	})
	const [error, setError] = useState<string>("")


	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		const { numberValue, error } = validatePositiveNumber(value)
		setError(error)
		if (numberValue !== null) {
			setOutputs({
				outputA: sum_to_n_a(numberValue),
				outputB: sum_to_n_b(numberValue),
				outputC: sum_to_n_c(numberValue)
			})
		}
	}

	const implementations = [
		{
			id: 1,
			title: 'Implementation 1: Using a Loop',
			code: implementation1,
			output: outputs.outputA
		},
		{
			id: 2,
			title: 'Implementation 2: Using the Arithmetic Series Formula',
			code: implementation2,
			output: outputs.outputB
		},
		{
			id: 3,
			title: 'Implementation 3: Using Recursion',
			code: implementation3,
			output: outputs.outputC
		}
	]
	
	


	return (
		<Card>
			<CardHeader>
				<CardTitle>Problem 1</CardTitle>
				<CardDescription>
					Three ways to sum to n
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<div className="space-y-1">
					<Label htmlFor="number">Positive integer (n):</Label>
					<Input id="number" type='number' defaultValue="5" onChange={handleInputChange} />
					{error.length > 0 && <p className='text-xs text-red-500'>{error}</p>}
				</div>
				{implementations.map((imp, index) => (
					<div key={index}>
						<ImplementationBlock title={imp.title} code={imp.code} />
						<OutputBlock output={imp.output} index={index} />
					</div>
				))}
			</CardContent>
		</Card>
	)
}

export default Solution1