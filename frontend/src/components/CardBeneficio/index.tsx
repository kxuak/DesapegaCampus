import Icon from "../Icon";
import "./index.css";

interface CardBeneficioProps {
  icon: string;
  titulo: string;
  descricao: string;
}

const CardBeneficio = ({ icon, titulo, descricao }: CardBeneficioProps) => {
  return (
    <div className="card-beneficio">
      <span className="card-beneficio-icon">
        <Icon src={icon} size={20} />
      </span>
      <h3 className="card-beneficio-titulo">{titulo}</h3>
      <p className="card-beneficio-descricao">{descricao}</p>
    </div>
  );
};

export default CardBeneficio;
