import styles from "./Card.module.css";

interface CardProps {
  card: {
    id: string;
    title: string;
    description?: string;
  };
}

const Card = ({ card }: CardProps) => {
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>{card.title}</h4>

      {card.description && (
        <p className={styles.description}>{card.description}</p>
      )}

      <div className={styles.actions}>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Card;
