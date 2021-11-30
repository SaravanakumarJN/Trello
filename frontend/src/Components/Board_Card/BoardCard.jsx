import styles from "./BoardCard.module.css";

const BoardCard = ({ name, handleClick, board_id }) => {
  return (
    <div
      className={styles.card_container}
      onClick={() => handleClick(board_id)}
    >
      {name}
    </div>
  );
};

export { BoardCard };
