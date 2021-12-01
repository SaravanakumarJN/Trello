import { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSnackbar } from "react-simple-snackbar";
import { FaRegEdit } from "react-icons/fa";
import Modal from "react-modal";

import styles from "./Card.module.css";
import { editCardNameDes } from "../../utilities/networkRequests";
import { OnClickEditor } from "../On_Click_Editor/OnClickEditor";
import { getDeepCopy } from "../../utilities/getDeepCopy";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};
const Card = ({ card, setBoardData, card_index, list_index }) => {
  let { name, _id, description } = card;
  const [openSnackbar] = useSnackbar({
    position: "top-center",
  });

  const handleEditCardNameDes = (data) => {
    return editCardNameDes(data)
      .then((res) => {
        let { name, description } = res.data.card;
        setBoardData((prev) => {
          let cards_copy = getDeepCopy([...prev.lists[list_index].cards]);
          let to_update_card = { ...cards_copy[card_index] };
          to_update_card.name = name;
          to_update_card.description = description;
          cards_copy[card_index] = to_update_card;

          let lists_copy = getDeepCopy([...prev.lists]);
          let to_update_list = { ...lists_copy[list_index] };
          to_update_list.cards = cards_copy;
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
  };

  //---------------------------------states and methods for Modal-----------------------------------------------

  const [modelOpen, setModalOpen] = useState(false);
  let [modalState, setModalState] = useState({ name, description });

  const hanldeModalState = (e) => {
    let { name, value } = e.target;
    setModalState({ ...modalState, [name]: value });
  };

  const hanldeModalOpen = () => {
    setModalOpen(true);
  };

  const hanldeModalClose = () => {
    setModalState({ name, description });
    setModalOpen(false);
  };

  useEffect(() => {
    setModalState({ name, description });
  }, [name, description]);

  const handleUpdate = () => {
    if (modalState.name !== "") {
      let data = {
        _id,
        payload: {
          name: modalState.name,
          description: modalState.description,
        },
      };
      handleEditCardNameDes(data).finally(() => {
        hanldeModalClose();
      });
    } else {
      openSnackbar("Card name cannot be empty");
    }
  };

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
        handleEditCardNameDes(data);
      }
      handleOpenEditorName();
      setEditName("");
    }
  };

  //---------------------------------------------------------------------------------------------------------------

  return (
    <>
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
                    <div
                      className={styles.card_edit_btn}
                      onClick={hanldeModalOpen}
                    >
                      <FaRegEdit />
                    </div>
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
      <Modal
        isOpen={modelOpen}
        onRequestClose={hanldeModalClose}
        style={modalStyles}
        ariaHideApp={false}
      >
        <div className={styles.modal_header}>Edit Card</div>
        <div className={styles.modal_container}>
          <div className={styles.modal_container_items}>
            <div className={styles.modal_container_item_label}>Name</div>
            <input
              name='name'
              value={modalState.name}
              onChange={hanldeModalState}
            />
          </div>
          <div className={styles.modal_container_items}>
            <div className={styles.modal_container_item_label}>Desciption</div>
            <textarea
              name='description'
              value={modalState.description}
              onChange={hanldeModalState}
            />
          </div>
          <button
            className={styles.modal_container_ok_btn}
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            className={styles.modal_container_cancel_btn}
            onClick={hanldeModalClose}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export { Card };
