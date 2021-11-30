import styles from "./AddFeatureComp.module.css";

const AddFeatureComp = ({ text, setText, hanldeOpenTextEditor, handleAdd }) => {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textEditor}
        placeholder='Enter name'
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
      <div>
        <button onClick={handleAdd} className={styles.confirm_btn}>
          Add
        </button>
        <button className={styles.cancel_btn} onClick={hanldeOpenTextEditor}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export { AddFeatureComp };
