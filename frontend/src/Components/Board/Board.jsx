import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getIndividualBoard,
  addList,
  editBoardName,
} from "../../utilities/networkRequests";
import { AddFeatureComp } from "../Add_Feature_Comp/AddFeatureComp";
import { OnClickEditor } from "../On_Click_Editor/OnClickEditor";
import { List } from "../List/List";
import styles from "./Board.module.css";

const Board = () => {
  const [boardData, setBoardData] = useState({});
  const [loading, setLoading] = useState(true);
  const { board_id } = useParams();

  useEffect(() => {
    setLoading(true);

    getIndividualBoard(board_id)
      .then((res) => {
        let { board } = res.data;
        setBoardData(board);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
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
            console.log(error);
          });
      }
      handleOpenEditorName();
      setEditName("");
    }
  };

  //---------------------------------------------------------------------------------------------------------------
  let { lists, name } = boardData;
  return (
    <div className={styles.container}>
      {loading ? (
        <div>Loading...</div>
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
            {lists?.map((list) => {
              return (
                <List
                  key={list._id}
                  list={list}
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
                  className={styles.add_card_btn}
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
  );
};

export { Board };
