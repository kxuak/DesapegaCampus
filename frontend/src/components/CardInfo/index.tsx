import Icon from "../Icon";
import "./index.css";

interface CardInfoProps {
  numero: number;
  icon: string;
  titulo: string;
  descricao: string;
}

const CardInfo = ({ numero, icon, titulo, descricao }: CardInfoProps) => {
  return (
    <div className="card-info">
      <span className="card-info-icon">
        <Icon src={icon} size={22} />
        <span className="card-info-numero">{numero}</span>
      </span>
      <h3 className="card-info-titulo">{titulo}</h3>
      <p className="card-info-descricao">{descricao}</p>
    </div>
  );
};

export default CardInfo;
