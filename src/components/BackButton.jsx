import { useNavigate } from "react-router";
import Button from "./Button";
import styles from "./Button.module.css";

function BackButton() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        className={styles.btn}
        type="back"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        &larr; Back
      </Button>
    </div>
  );
}

export default BackButton;
