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
    foods: Food[]
    editingFood: Food;
    handleEditFood: (editingFood: Food, openEditModal: boolean) => Promise<void>;
    handleDeleteFood: (foodId: number) => Promise<void>;
    openEditModal: boolean;
    handleOpenEditFoodModal: (openEditModal: boolean) => Promise<void>;
}

const FoodContext = createContext<FoodContextData>(
    {} as FoodContextData
);

export function FoodsProvider({children}: FoodsProviderProps) {
    const [food, setFood] = useState<Food>({} as Food);
    const [foods, setFoods] = useState<Food[]>([]);
    
    const [editingFood, setEditingFood] = useState<Food>({} as Food);
    
    const [openEditModal, setOpenEditModal] = useState(false);
    
    useEffect(() =>{
        api.get('/foods').then(response => setFoods(response.data));
      }, []);

    async function handleEditFood(selectedEditingFood: Food, openEditModal: boolean) {
        setEditingFood(selectedEditingFood);
        setOpenEditModal(!openEditModal);
    }

    async function handleDeleteFood(foodId: number) {
        const foodsFilter = foods.filter(food => food.id !== foodId);

        setFoods(foodsFilter);
        await api.delete(`/foods/${foodId}`);
    }

    async function handleOpenEditFoodModal(openEditModal: boolean) {
        setOpenEditModal(openEditModal);
    }

    return (
        <FoodContext.Provider value={{ foods, editingFood, handleEditFood, handleDeleteFood, openEditModal, handleOpenEditFoodModal }}>
            {children}
        </FoodContext.Provider>
    );  
}

export function useFood() {
    const context = useContext(FoodContext);

    return context;
}