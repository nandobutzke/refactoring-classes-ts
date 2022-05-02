import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import { useFood } from '../../hooks/useFood';
import { FoodProps } from '../../@types/types';
import api from '../../services/api';
import { useState } from 'react';

export function Food(food: FoodProps) {
  const { handleEditFood, handleDeleteFood } = useFood();

  function handleDelete(id: number) {
    handleDeleteFood(id);
  }

  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  async function toggleAvailable(selectedFood: FoodProps) {
    await api.put(`/foods/${selectedFood.id}`, {
        ...selectedFood,
        available: !isAvailable,
    });

    setIsAvailable((prevState) => !prevState);
  }

  return (
    <Container available={!isAvailable}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => handleEditFood(food)}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={() => toggleAvailable(food)}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
