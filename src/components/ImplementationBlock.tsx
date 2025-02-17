import { memo } from "react"
import { CodeBlock, dracula} from "react-code-blocks"

const ImplementationBlock = memo(({ title, code }: { title: string, code: string }) => {
	return (
		<div>
			<p className='text-sm mt-4'>{title}</p>
			<div className="space-y-1 text-xs">
				<CodeBlock text={code} language='javascript' theme={dracula} />
			</div>
		</div>
	)
})

export default ImplementationBlock