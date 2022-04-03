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
    setEditingFood: () => Promise<void>;
}

const FoodContext = createContext<FoodContextData>(
    {} as FoodContextData
);

export function FoodsProvider({children}: FoodsProviderProps) {
    const [food, setFood] = useState<Food>({} as Food);
    const [isAvailable, setIsAvailable] = useState<boolean>(false);
    
    useEffect(() => {
        api.get(`/foods/${food.id}`).then(response => setFood(response.data))
    }, []);

    async function toggleAvailable() {
        await api.put(`/foods/${food.id}`, {
            ...food,
            available: !isAvailable,
        });

        setIsAvailable(!isAvailable);
    }

    async function setEditingFood() {

    }

    return (
        <FoodContext.Provider value={{ food, isAvailable, toggleAvailable, setEditingFood }}>
            {children}
        </FoodContext.Provider>
    );  
}

export function useFood() {
    const context = useContext(FoodContext);

    return context;
}