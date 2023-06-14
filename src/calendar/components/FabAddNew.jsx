import { addHours } from "date-fns";

import { useCalendarStore, useUiStore } from "../../hooks";

import "./FabAddNew.css";

export const FabAddNew = () => {
  const { openDateModal, isDateModalOpen } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "some-id",
        name: "Jaime Pineda",
      },
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
