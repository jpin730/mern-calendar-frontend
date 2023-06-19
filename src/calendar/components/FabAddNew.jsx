import { useCalendarStore, useUiStore } from "../../hooks";
import { emptyCalendarEvent } from "../constants";

import "./FabAddNew.css";

export const FabAddNew = () => {
  const { openDateModal, isDateModalOpen } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent(emptyCalendarEvent);
    openDateModal();
  };

  return (
    <>
      {!isDateModalOpen && (
        <button
          className="btn btn-primary shadow fab-add-new"
          onClick={handleClickNew}
        >
          <i className="fas fa-plus"></i>
        </button>
      )}
    </>
  );
};
