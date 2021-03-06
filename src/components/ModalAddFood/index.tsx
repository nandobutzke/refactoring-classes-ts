import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { FoodProps, ModalAddFoodProps } from '../../@types/types';
import { useFood } from '../../hooks/useFood';

export function ModalAddFood({ isOpen, onRequestClose }: ModalAddFoodProps) {
  const { handleAddFood } = useFood();

  function handleSubmit(data: FoodProps) {
    handleAddFood(data);
    onRequestClose();
  }

  return (
    <Modal onRequestClose={onRequestClose} isOpen={isOpen} >
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" required />

        <Input name="name" placeholder="Ex: Moda Italiana" required />
        <Input name="price" placeholder="Ex: 19.90" required />

        <Input name="description" placeholder="Descrição" required />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

/*class ModalAddFood extends Component {
  constructor(props) {
    super(props);

    this.formRef = createRef();
  }

  handleSubmit = async data => {
    const { setIsOpen, handleAddFood } = this.props;

    handleAddFood(data);
    setIsOpen();
  };

  render() {
    const { isOpen, setIsOpen } = this.props;

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={this.formRef} onSubmit={this.handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }
};

export default ModalAddFood;*/
