import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";

interface FoodsProviderProps {
    children: ReactNode;
}

interface Food {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
}

interface FoodContextData {
    food: Food;
    isAvailable: boolean;
    toggleAvailable: () => Promise<void>;
    handleEditFood: (editingFood: Food) => Promise<void>;
    openEditModal: boolean;
    handleOpenEditFoodModal: (openEditModal: boolean) => Promise<void>;
}

const FoodContext = createContext<FoodContextData>(
    {} as FoodContextData
);

export function FoodsProvider({children}: FoodsProviderProps) {
    const [food, setFood] = useState<Food>({} as Food);
    const [foods, setFoods] = useState<Food[]>([]);
    const [isAvailable, setIsAvailable] = useState<boolean>(false);

    const [editingFood, setEditingFood] = useState<Food>({} as Food);

    const [openEditModal, setOpenEditModal] = useState(false);
    
    useEffect(() => {
        api.get(`/foods/${2}`).then(response => setFood(response.data))
    }, []);

    async function toggleAvailable() {
        await api.put(`/foods/${food.id}`, {
            ...food,
            available: !isAvailable,
        });

        setIsAvailable(!isAvailable);
    }

    async function handleEditFood(editingFood: Food) {
        setEditingFood(editingFood);
    }

    async function handleOpenEditFoodModal(openEditModal: boolean) {
        setOpenEditModal(openEditModal);
    }

    return (
        <FoodContext.Provider value={{ food, isAvailable, toggleAvailable, handleEditFood, openEditModal, handleOpenEditFoodModal }}>
            {children}
        </FoodContext.Provider>
    );  
}

export function useFood() {
    const context = useContext(FoodContext);

    return context;
}