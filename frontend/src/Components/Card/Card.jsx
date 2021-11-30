import { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSnackbar } from "react-simple-snackbar";

import styles from "./Card.module.css";
import { editCardNameDes } from "../../utilities/networkRequests";
import { OnClickEditor } from "../On_Click_Editor/OnClickEditor";
import { getDeepCopy } from "../../utilities/getDeepCopy";

const Card = ({ card, setBoardData, card_index, list_index }) => {
  let { name, _id, description } = card;
  const [openSnackbar] = useSnackbar({
    position: "top-center",
  });

  //---------------------------------states and methods for OnClickEditor----------------------------------------

  let [editName, setEditName] = useState("");
  let [openEditName, setOpenEditName] = useState(false);
  let input_ref = useRef();

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
        let data = {
          _id,
          payload: {
            name: editName,
          },
        };
        editCardNameDes(data)
          .then((res) => {
            let { name } = res.data.card;
            setBoardData((prev) => {
              let cards_copy = getDeepCopy([...prev.lists[list_index].cards]);
              let to_update_card = { ...cards_copy[card_index] };
              to_update_card.name = name;
              cards_copy[card_index] = to_update_card;

              let lists_copy = getDeepCopy([...prev.lists]);
              let to_update_list = { ...lists_copy[list_index] };
              to_update_list.cards = cards_copy;
              lists_copy[list_index] = to_update_list;

              return { ...prev, lists: lists_copy };
            });
          })
          .catch(({ response }) => {
            openSnackbar(response.data.message);
          });
      }
      handleOpenEditorName();
      setEditName("");
    }
  };

  //---------------------------------------------------------------------------------------------------------------

  return (
    <Draggable draggableId={_id} index={card_index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            className={styles.container}
          >
            {openEditName ? (
              <OnClickEditor
                editName={editName}
                setEditName={setEditName}
                handleOpenEditorName={handleOpenEditorName}
                handleKeyDown={handleKeyDown}
                input_ref={input_ref}
              />
            ) : (
              <>
                <div className={styles.inner_container}>
                  <div
                    className={styles.card_name}
                    onClick={handleOpenEditorName}
                  >
                    {name}
                  </div>
                  <div className={styles.card_edit_btn}>Edit</div>
                </div>
                {description && (
                  <div className={styles.card_description}>{description}</div>
                )}
              </>
            )}
          </div>
        );
      }}
    </Draggable>
  );
};

export { Card };
