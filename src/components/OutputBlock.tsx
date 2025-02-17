import { memo } from "react"
import { CodeBlock, dracula } from "react-code-blocks"

const OutputBlock = memo(({ output, index }: { output: number, index: number }) => {
	return (
		<>
			<p className='text-sm mt-4'>Output {index + 1}:</p>
			<div className="space-y-1 text-xs">
				<CodeBlock text={output.toString()} language='javascript' theme={dracula} />
			</div>
		</>
	)
})


export default OutputBlock