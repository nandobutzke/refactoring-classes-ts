import { ReactNode } from "react";

export interface FoodProps {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
}

export interface ModalProps extends ReactModal.Props {
    children: ReactNode
    onRequestClose: () => void;
    isOpen: boolean;
}

export interface ModalAddFoodProps {
    isOpen: boolean;
    onRequestClose: () => void;
}