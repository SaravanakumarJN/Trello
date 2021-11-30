import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getUsersAllBoards } from "../../utilities/networkRequests";
import { BoardCard } from "../Board_Card/BoardCard";
import styles from "./Home.module.css";

const Home = () => {
  const [userBoards, setUserBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    getUsersAllBoards()
      .then((res) => {
        let { boards } = res.data;
        setUserBoards(boards);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleNavigateToBoard = (board_id) => {
    history.push(`/board/${board_id}`);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.board_cards_container}>
          {userBoards.length === 0 ? (
            <div>No boards created yet</div>
          ) : (
            userBoards?.map((board) => {
              return (
                <BoardCard
                  key={board._id}
                  handleClick={handleNavigateToBoard}
                  name={board.name}
                  board_id={board._id}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export { Home };
