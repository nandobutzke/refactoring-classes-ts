import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import { useFood } from '../../hooks/useFood';
import { FoodProps } from '../../@types/types';

export function Food(props: FoodProps) {
  const { food, isAvailable, toggleAvailable, handleEditFood, handleOpenEditFoodModal } = useFood();

  function handleDelete(id: number) {

  }

  function setEditingFood() {
    handleEditFood(props);
    handleOpenEditFoodModal(true);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={props.image} alt={props.name} />
      </header>
      <section className="body">
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <p className="price">
          R$ <b>{props.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setEditingFood}
            data-testid={`edit-food-${props.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(props.id)}
            data-testid={`remove-food-${props.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${props.id}`} className="switch">
            <input
              id={`available-switch-${props.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-food-${props.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}
