import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";

import styles from "./Home.module.css";
import { BoardCard } from "../Board_Card/BoardCard";
import { AddFeatureComp } from "../Add_Feature_Comp/AddFeatureComp";
import { addBoard, getUsersAllBoards } from "../../utilities/networkRequests";
import { getItem } from "../../utilities/localStorage";

const Home = () => {
  const [userBoards, setUserBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  let user_details = getItem("user_details");
  let name = user_details && user_details.name ? user_details.name : "User";
  const [openSnackbar] = useSnackbar({
    position: "top-center",
  });

  const getData = () => {
    getUsersAllBoards()
      .then((res) => {
        let { boards } = res.data;
        setUserBoards(boards);
      })
      .catch((error) => {
        if (error.response) {
          openSnackbar(
            error.response.data.message
              ? error.response.data.message
              : error.response.data
          );
        } else {
          openSnackbar(error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const handleNavigateToBoard = (board_id) => {
    history.push(`/board/${board_id}`);
  };

  //---------------------------------states and methods for AddFeatureComp----------------------------------------

  const [text, setText] = useState("");
  const [openTextEditor, setOpenTextEditor] = useState(false);

  const hanldeOpenTextEditor = () => {
    setOpenTextEditor(!openTextEditor);
  };

  const handleAddBoard = () => {
    if (text.trim().length > 0) {
      let payload = {
        name: text,
      };

      addBoard(payload)
        .then(() => {
          getData();
        })
        .catch((error) => {
          if (error.response) {
            openSnackbar(
              error.response.data.message
                ? error.response.data.message
                : error.response.data
            );
          } else {
            openSnackbar(error.message);
          }
        })
        .finally(() => {
          setText("");
          hanldeOpenTextEditor();
        });
    }
  };

  //---------------------------------------------------------------------------------------------------------------

  return (
    <div className={styles.container}>
      {loading ? (
        <div className='loading_indicator'>Loading...</div>
      ) : (
        <>
          <div className={styles.header}>{name}'s Boards</div>
          <div className={styles.board_cards_container}>
            {userBoards?.map((board) => {
              return (
                <BoardCard
                  key={board._id}
                  handleClick={handleNavigateToBoard}
                  name={board.name}
                  board_id={board._id}
                />
              );
            })}
            <div className={styles.add_feature_comp_container}>
              {openTextEditor ? (
                <AddFeatureComp
                  text={text}
                  setText={setText}
                  hanldeOpenTextEditor={hanldeOpenTextEditor}
                  handleAdd={handleAddBoard}
                />
              ) : (
                <button
                  className={styles.add_board_btn}
                  onClick={hanldeOpenTextEditor}
                >
                  Add Board
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { Home };
