import { useCalendarStore, useUiStore } from "../../hooks";

import "./FabClearSelection.css";

export const FabClearSelection = () => {
  const { setActiveEvent, hasEventSelected } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleClearSelection = () => {
    setActiveEvent(null);
  };

  return (
    <>
      {hasEventSelected && !isDateModalOpen && (
        <button
          className="btn btn-secondary fab-clear-selection"
          onClick={handleClearSelection}
        >
          <i className="fas fa-xmark"></i>
        </button>
      )}
    </>
  );
};
