import { useState, useRef, useEffect } from "react";
import { editCardNameDes } from "../../utilities/networkRequests";
import { OnClickEditor } from "../On_Click_Editor/OnClickEditor";
import styles from "./Card.module.css";

const Card = ({ card }) => {
  let { name, _id, description } = card;

  //---------------------------------states and methods for OnClickEditor----------------------------------------

  let [editName, setEditName] = useState(name);
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
            console.log(name);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      handleOpenEditorName();
      setEditName(name);
    }
  };

  //---------------------------------------------------------------------------------------------------------------

  return (
    <div className={styles.container}>
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
            <div className={styles.card_name} onClick={handleOpenEditorName}>
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
};

export { Card };
