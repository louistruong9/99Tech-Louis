import { memo } from "react";
import ImageNotFound from "@/assets/image-not-found.svg"

const CurrencyItem = memo(({ currency }: { currency: string }) => {

	const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const imgElement = event.currentTarget;
		imgElement.src = ImageNotFound
	}

	return (
		<div className="flex items-center">
			<img
				src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`}
				alt={currency}
				className="w-6 h-6 mr-2"
				onError={handleImageError}
			/>
			{currency}
		</div>
	)
})

export default CurrencyItem