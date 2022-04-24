import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import { useFood } from '../../hooks/useFood';
import { FoodProps } from '../../@types/types';

export function Food({ id, name, description, price, available, image }: FoodProps) {
  const { food, isAvailable, toggleAvailable, handleEditFood, handleOpenEditFoodModal } = useFood();

  function handleDelete(id: number) {

  }

  function setEditingFood() {
    handleEditFood(food);
    handleOpenEditFoodModal(true);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={image} alt={name} />
      </header>
      <section className="body">
        <h2>{name}</h2>
        <p>{description}</p>
        <p className="price">
          R$ <b>{price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(id)}
            data-testid={`remove-food-${id}`}
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
              onChange={toggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
