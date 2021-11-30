import { useState, useEffect, useRef } from "react";
import { addCard, editListName } from "../../utilities/networkRequests";
import { AddFeatureComp } from "../Add_Feature_Comp/AddFeatureComp";
import { OnClickEditor } from "../On_Click_Editor/OnClickEditor";
import { Card } from "../Card/Card";
import styles from "./List.module.css";

const List = ({ list, setBoardData }) => {
  const { cards, _id, board_id, name } = list;

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
          let { name } = res.data.list;
          console.log(name);
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

  const [editName, setEditName] = useState(name);
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
        console.log(payload);

        editListName(payload)
          .then((res) => {
            console.log(res);
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
        {cards?.map((card) => {
          return <Card key={card._id} card={card} />;
        })}
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
