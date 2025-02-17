export const validatePositiveNumber = (value: string) => {
	if (value.trim() === "")
		return { numberValue: null, error: "Value cannot be empty" }


	const numberValue = parseInt(value, 10)

	if (isNaN(numberValue) || numberValue < 0)
		return { numberValue: null, error: "Value must be a positive integer" }


	return { numberValue, error: "" }
}
