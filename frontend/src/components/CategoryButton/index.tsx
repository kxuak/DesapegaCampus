import "./index.css";

interface CategoryButtonProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const CategoryButton = ({ label, active, onClick }: CategoryButtonProps) => {
  return (
    <button
      type="button"
      className={`category-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CategoryButton;
