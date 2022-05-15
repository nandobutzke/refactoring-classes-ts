import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { FoodProps } from "../@types/types";
import api from "../services/api";

interface FoodsProviderProps {
    children: ReactNode;
}

interface FoodContextData {
    foods: FoodProps[]
    editingFood: FoodProps;
    openEditModal: boolean;
    handleAddFood: (food: FoodProps) => Promise<void>;
    handleEditFood: (editingFood: FoodProps) => Promise<void>;
    handleUpdateFood: (updatingFood: FoodProps) => Promise<void>;
    handleDeleteFood: (foodId: number) => Promise<void>;
    handleOpenEditFoodModal: (openEditModal: boolean) => Promise<void>;
}

const FoodContext = createContext<FoodContextData>(
    {} as FoodContextData
);

export function FoodsProvider({children}: FoodsProviderProps) {
    const [foods, setFoods] = useState<FoodProps[]>([]);
    const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps);
    const [openEditModal, setOpenEditModal] = useState(false);
    
    useEffect(() => {
        api.get('/foods').then(response => setFoods(response.data));
      }, []);

    async function handleAddFood(food: FoodProps) {
        try {
            const response = await api.post('/foods', {
                ...food,
                available: true,
            });
        
            setFoods([...foods, response.data]);
        } catch (err) {
        console.log(err);
        }
    }

    async function handleEditFood(selectedEditingFood: FoodProps) {
        setEditingFood(selectedEditingFood);
        setOpenEditModal((prevState) => !prevState);
    }

    async function handleDeleteFood(foodId: number) {
        const foodsFilter = foods.filter(food => food.id !== foodId);

        setFoods(foodsFilter);
        await api.delete(`/foods/${foodId}`);
    }

    async function handleUpdateFood(food: FoodProps) {
        try {
            const foodUpdated = await api.put(`/foods/${food.id}`, {...editingFood, ...food});
            
            const foodsUpdated = foods.map(f =>
                f.id !== foodUpdated.data.id ? f : foodUpdated.data,
            );

            setFoods(foodsUpdated);
        } catch (err) {
            console.log(err);
        } 
    }

    async function handleOpenEditFoodModal(openEditModal: boolean) {
        setOpenEditModal(openEditModal);
    }

    return (
        <FoodContext.Provider value={{ foods, editingFood, handleAddFood, handleEditFood, handleUpdateFood, handleDeleteFood, openEditModal, handleOpenEditFoodModal }}>
            {children}
        </FoodContext.Provider>
    );  
}

export function useFood() {
    const context = useContext(FoodContext);

    return context;
}