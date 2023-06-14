import { useCalendarStore, useUiStore } from "../../hooks";

import "./FabDelete.css";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <>
      {hasEventSelected && !isDateModalOpen && (
        <button className="btn btn-danger fab-delete" onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i>
        </button>
      )}
    </>
  );
};
