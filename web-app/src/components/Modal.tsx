
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    // Conditional rendering at the very beginning
    if (!isOpen) return null;

    
}

