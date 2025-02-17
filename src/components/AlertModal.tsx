import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import SuccessIcon from "@/assets/success.svg"

interface AlertModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	description: string
}

const AlertModal = ({ isOpen, onClose, title, description }: AlertModalProps) => {
	return (
		<AlertDialog open={isOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="text-center">
						<div className="w-full flex justify-center mb-4">
							<img src={SuccessIcon} />
						</div>
						<AlertDialogTitle className="mb-1">{title}</AlertDialogTitle>
						<AlertDialogDescription>{description}</AlertDialogDescription>
					</div>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={onClose}>OK</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default AlertModal