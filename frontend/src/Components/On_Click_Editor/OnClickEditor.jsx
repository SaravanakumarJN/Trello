import styles from "./OnClickEditor.module.css";

const OnClickEditor = ({
  editName,
  setEditName,
  handleOpenEditorName,
  handleKeyDown,
  input_ref,
}) => {
  return (
    <div className={styles.edit_field}>
      <div className={styles.edit_field_input}>
        <input
          value={editName}
          onChange={(e) => {
            setEditName(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          ref={input_ref}
          tabIndex='0'
        />
      </div>
      <div
        className={styles.edit_field_cancel_btn}
        onClick={handleOpenEditorName}
      >
        X
      </div>
    </div>
  );
};

export { OnClickEditor };
