import { useEffect, useState } from 'react';

import api from '../../services/api';
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

/*class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foods: [],
      editingFood: {},
      modalOpen: false,
      editModalOpen: false,
    }
  }

  async componentDidMount() {
    const response = await api.get('/foods');

    this.setState({ foods: response.data });
  }

  handleAddFood = async food => {
    const { foods } = this.state;

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      this.setState({ foods: [...foods, response.data] });
    } catch (err) {
      console.log(err);
    }
  }

  handleUpdateFood = async food => {
    const { foods, editingFood } = this.state;

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      this.setState({ foods: foodsUpdated });
    } catch (err) {
      console.log(err);
    }
  }

  handleDeleteFood = async id => {
    const { foods } = this.state;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    this.setState({ foods: foodsFiltered });
  }

  toggleModal = () => {
    const { modalOpen } = this.state;

    this.setState({ modalOpen: !modalOpen });
  }

  toggleEditModal = () => {
    const { editModalOpen } = this.state;

    this.setState({ editModalOpen: !editModalOpen });
  }

  handleEditFood = food => {
    this.setState({ editingFood: food, editModalOpen: true });
  }

  render() {
    const { modalOpen, editModalOpen, editingFood, foods } = this.state;

    return (
      <>
        <Header openModal={this.toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={this.toggleModal}
          handleAddFood={this.handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={this.toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={this.handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={this.handleDeleteFood}
                handleEditFood={this.handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  }
};

export default Dashboard;*/
