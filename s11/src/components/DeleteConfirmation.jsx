import { useEffect } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(() => {
    console.log("TIMER SET");
    const timer = setTimeout(() => { // 직접 JSX를 바꾸지 않으므로 side effect
      onConfirm();
    }, 3000);

    // clean up 함수
    return () => {
      console.log("Cleaning up timer");
      clearTimeout(timer);
    };
  }, []);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
