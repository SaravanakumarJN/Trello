import { useState, useEffect, useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSnackbar } from "react-simple-snackbar";

import styles from "./List.module.css";
import { Card } from "../Card/Card";
import { AddFeatureComp } from "../Add_Feature_Comp/AddFeatureComp";
import { OnClickEditor } from "../On_Click_Editor/OnClickEditor";
import { addCard, editListName } from "../../utilities/networkRequests";
import { getDeepCopy } from "../../utilities/getDeepCopy";

const List = ({ list, setBoardData, list_index }) => {
  const { cards, _id, board_id, name } = list;
  const [openSnackbar] = useSnackbar({
    position: "top-center",
  });

  //---------------------------------states and methods for AddFeatureComp----------------------------------------

  const [text, setText] = useState("");
  const [openTextEditor, setOpenTextEditor] = useState(false);

  const hanldeOpenTextEditor = () => {
    setOpenTextEditor(!openTextEditor);
  };

  const handleAddCard = () => {
    let position =
      cards.length > 0 ? Number(cards[cards.length - 1].position) + 1 : 1;

    if (text.trim().length > 0) {
      let payload = {
        name: text,
        list_id: _id,
        board_id,
        position,
      };

      addCard(payload)
        .then((res) => {
          let { card } = res.data;
          setBoardData((prev) => {
            let lists_copy = getDeepCopy([...prev.lists]);
            let to_update_list = { ...lists_copy[list_index] };
            to_update_list.cards.push(card);
            lists_copy[list_index] = to_update_list;

            return { ...prev, lists: lists_copy };
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
        let payload = {
          list_id: _id,
          name: editName,
        };

        editListName(payload)
          .then((res) => {
            let { name } = res.data.list;

            setBoardData((prev) => {
              let lists_copy = getDeepCopy([...prev.lists]);
              let to_update_list = { ...lists_copy[list_index] };
              to_update_list.name = name;
              lists_copy[list_index] = to_update_list;

              return { ...prev, lists: lists_copy };
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
          });
      }
      handleOpenEditorName();
      setEditName("");
    }
  };

  //---------------------------------------------------------------------------------------------------------------

  return (
    <div className={styles.container}>
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
      <div className={styles.card_container}>
        <Droppable droppableId={_id}>
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {cards.length === 0 && (
                  <div className={styles.card_container_empty}></div>
                )}
                {cards?.map((card, i) => {
                  return (
                    <Card
                      key={card._id}
                      card={card}
                      list_index={list_index}
                      card_index={i}
                      setBoardData={setBoardData}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        {openTextEditor ? (
          <AddFeatureComp
            text={text}
            setText={setText}
            hanldeOpenTextEditor={hanldeOpenTextEditor}
            handleAdd={handleAddCard}
          />
        ) : (
          <button
            className={styles.add_card_btn}
            onClick={hanldeOpenTextEditor}
          >
            Add card
          </button>
        )}
      </div>
    </div>
  );
};

export { List };
