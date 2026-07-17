import { Link } from "react-router-dom";
import Icon from "../Icon";
import type { Category } from "../../data/categories";
import "./index.css";

interface CardCategoryProps {
  categoria: Category;
}

const CardCategory = ({ categoria }: CardCategoryProps) => {
  return (
    <Link to={`/anuncios?categoria=${categoria.id}`} className="card-category">
      <span className="card-category-icon" style={{ background: `${categoria.color}22`, color: categoria.color }}>
        <Icon src={categoria.icon} size={18} />
      </span>
      <span className="card-category-label">{categoria.label}</span>
      <span className="card-category-link">
        Ver itens <Icon src="/arrow-narrow-right.svg" size={14} />
      </span>
    </Link>
  );
};

export default CardCategory;
