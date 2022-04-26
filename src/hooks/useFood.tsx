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
    editingFood: Food;
    isAvailable: boolean;
    toggleAvailable: (food: Food) => Promise<void>;
    handleEditFood: (editingFood: Food, openEditModal: boolean) => Promise<void>;
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
        //api.get(`/foods/${2}`).then(response => setFood(response.data));
    }, []);

    async function toggleAvailable(food: Food) {
        await api.put(`/foods/${food.id}`, {
            ...food,
            available: !isAvailable,
        });

        setIsAvailable(!food.available);
    }

    async function handleEditFood(selectedEditingFood: Food, openEditModal: boolean) {
        setEditingFood(selectedEditingFood);
        setOpenEditModal(!openEditModal);
    }

    async function handleOpenEditFoodModal(openEditModal: boolean) {
        setOpenEditModal(openEditModal);
    }

    return (
        <FoodContext.Provider value={{ editingFood, isAvailable, toggleAvailable, handleEditFood, openEditModal, handleOpenEditFoodModal }}>
            {children}
        </FoodContext.Provider>
    );  
}

export function useFood() {
    const context = useContext(FoodContext);

    return context;
}