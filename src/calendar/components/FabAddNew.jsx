import { addHours } from "date-fns";

import { useCalendarStore, useUiStore } from "../../hooks";

import "./FabAddNew.css";

export const FabAddNew = () => {
  const { openDateModal, isDateModalOpen } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    setActiveEvent({
      title: "",
      notes: "",
      start: todayDate,
      end: addHours(todayDate, 1),
    });
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
