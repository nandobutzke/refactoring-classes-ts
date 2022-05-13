import { useState } from 'react';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { Header } from '../../components/Header';
import { useFood } from '../../hooks/useFood';
import { FoodProps } from '../../@types/types';

export function Dashboard() {
  const { foods, editingFood, openEditModal, handleUpdateFood, handleOpenEditFoodModal } = useFood();

  const [isOpenModalAddFood, setIsOpenModalAddFood] = useState(false);

  function handleSetIsOpenModalAddFood() {
    setIsOpenModalAddFood(true);
  }

  function handleCloseModalAddFood() {
    setIsOpenModalAddFood(false);
  }

  function handleCloseEditModal() {
    handleOpenEditFoodModal(false);
  }

  function handleModalUpdateFood(food: FoodProps) {
    handleUpdateFood(food);
  }

  return (
    <>
       <Header openModal={handleSetIsOpenModalAddFood} />
        <ModalAddFood
          isOpen={isOpenModalAddFood}
          onRequestClose={handleCloseModalAddFood}
        />
        <ModalEditFood
          isOpen={openEditModal}
          onRequestClose={handleCloseEditModal}
          editingFood={editingFood}
          handleModalUpdateFood={handleModalUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(props => (
              <Food
                key={props.id}
                {...props}
              />
            ))}
        </FoodsContainer>
      </>
  );
}
