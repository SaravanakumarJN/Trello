import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { useSnackbar } from "react-simple-snackbar";

import styles from "./Board.module.css";
import { List } from "../List/List";
import { AddFeatureComp } from "../Add_Feature_Comp/AddFeatureComp";
import { OnClickEditor } from "../On_Click_Editor/OnClickEditor";
import {
  getIndividualBoard,
  addList,
  editBoardName,
  editCardPositionList,
} from "../../utilities/networkRequests";
import {
  getPrevNextSameList,
  getPrevNextDiffList,
} from "../../utilities/getPositions";

const Board = () => {
  const [boardData, setBoardData] = useState({});
  const [loading, setLoading] = useState(true);
  const { board_id } = useParams();
  const [openSnackbar] = useSnackbar({
    position: "top-center",
  });

  const getData = () => {
    getIndividualBoard(board_id)
      .then((res) => {
        let { board } = res.data;
        setBoardData(board);
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

  //---------------------------------states and methods for AddFeatureComp----------------------------------------

  const [text, setText] = useState("");
  const [openTextEditor, setOpenTextEditor] = useState(false);

  const hanldeOpenTextEditor = () => {
    setOpenTextEditor(!openTextEditor);
  };

  const handleAddList = () => {
    if (text.trim().length > 0) {
      let { _id, lists } = boardData;

      let position =
        lists.length > 0 ? Number(lists[lists.length - 1].position) + 1 : 1;

      let payload = {
        name: text,
        board_id: _id,
        position,
      };

      addList(payload)
        .then((res) => {
          let { list } = res.data;

          setBoardData((prev) => {
            return { ...prev, lists: [...prev.lists, list] };
          });
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

  //---------------------------------states and methods for OnClickEditor----------------------------------------

  const [editName, setEditName] = useState("");
  const [openEditName, setOpenEditName] = useState(false);
  const input_ref = useRef();

  useEffect(() => {
    if (openEditName) {
      input_ref.current.focus();
    }
  }, [openEditName]);

  const handleOpenEditorName = () => {
    setOpenEditName(!openEditName);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (editName !== "") {
        let { _id } = boardData;

        let payload = {
          board_id: _id,
          name: editName,
        };

        editBoardName(payload)
          .then((res) => {
            let { board } = res.data;
            setBoardData({ ...boardData, name: board.name });
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
          });
      }
      handleOpenEditorName();
      setEditName("");
    }
  };

  //---------------------------------------------------------------------------------------------------------------

  const handleDragEnd = (data) => {
    let { source, destination, draggableId } = data;

    // if no destination
    if (!destination) {
      return;
    }

    let destination_list = boardData?.lists.filter((list, i) => {
      if (list._id === destination.droppableId) {
        return true;
      }
      return false;
    })[0];

    let { cards } = destination_list;
    let { index: des_index } = destination;
    let { index: sor_index } = source;

    let prev_position;
    let next_position;
    if (source.droppableId === destination.droppableId) {
      let { prev_position: pp, next_position: np } = getPrevNextSameList(
        sor_index,
        des_index,
        cards
      );
      prev_position = pp;
      next_position = np;

      if (prev_position === next_position) {
        return;
      }
    } else {
      let { prev_position: pp, next_position: np } = getPrevNextDiffList(
        des_index,
        cards
      );
      prev_position = pp;
      next_position = np;
    }

    let payload = {
      list_id: destination.droppableId,
      prev_position,
      next_position,
    };
    editCardPositionList({ _id: draggableId, payload })
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
      });
  };

  let { lists, name } = boardData;
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles.container}>
        {loading ? (
          <div className='loading_indicator'>Loading...</div>
        ) : (
          <>
            {openEditName ? (
              <div className={styles.header}>
                <OnClickEditor
                  editName={editName}
                  setEditName={setEditName}
                  handleOpenEditorName={handleOpenEditorName}
                  handleKeyDown={handleKeyDown}
                  input_ref={input_ref}
                />
              </div>
            ) : (
              <div onClick={handleOpenEditorName} className={styles.header}>
                {name}
              </div>
            )}
            <div className={styles.list_container}>
              {lists?.map((list, i) => {
                return (
                  <List
                    key={list._id}
                    list={list}
                    list_index={i}
                    setBoardData={setBoardData}
                  ></List>
                );
              })}
              <div className={styles.add_feature_comp_container}>
                {openTextEditor ? (
                  <AddFeatureComp
                    text={text}
                    setText={setText}
                    hanldeOpenTextEditor={hanldeOpenTextEditor}
                    handleAdd={handleAddList}
                  />
                ) : (
                  <button
                    className={styles.add_list_btn}
                    onClick={hanldeOpenTextEditor}
                  >
                    Add list
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </DragDropContext>
  );
};

export { Board };
