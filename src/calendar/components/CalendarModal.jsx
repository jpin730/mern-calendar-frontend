import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Modal from "react-modal";
import Swal from "sweetalert2";

import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks";
import { emptyCalendarEvent } from "../constants";

import "react-datepicker/dist/react-datepicker.css";
import "./CalendarModal.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent, setActiveEvent } = useCalendarStore();
  const { user } = useAuthStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(emptyCalendarEvent);

  const titleClass = useMemo(
    () => (formSubmitted && formValues.title.length === 0 ? "is-invalid" : ""),
    [formValues.title, formSubmitted]
  );

  const canSave = useMemo(
    () =>
      !!activeEvent &&
      (!activeEvent.id ||
        user.uid === activeEvent?.user?.uid ||
        user.uid === activeEvent?.user?._id),
    [activeEvent]
  );

  useEffect(() => {
    if (activeEvent) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  useEffect(() => {
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      setFormValues({ ...formValues, end: addHours(formValues.start, 1) });
    }
  }, [formValues.start]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, dateName) => {
    setFormValues({
      ...formValues,
      [dateName]: event,
    });
  };

  const onCloseModal = () => {
    setActiveEvent(null);
    closeDateModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Wrong dates", "Check the dates entered", "error");
      return;
    }

    if (formValues.title.length <= 0) return;

    await startSavingEvent(formValues);
    setFormSubmitted(false);
    closeDateModal();
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-overlay"
      closeTimeoutMS={200}
    >
      <div className="p-3">
        <h2> {activeEvent?.id ? "Edit Event" : "New event"} </h2>
        <hr />
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label className="form-label">Start</label>
            <ReactDatePicker
              showTimeSelect
              className="form-control"
              dateFormat="Pp"
              readOnly={!canSave}
              selected={formValues.start}
              onChange={(event) => onDateChanged(event, "start")}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">End</label>
            <ReactDatePicker
              showTimeSelect
              className="form-control"
              dateFormat="Pp"
              readOnly={!canSave}
              minDate={formValues.start}
              selected={formValues.end}
              onChange={(event) => onDateChanged(event, "end")}
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="A brief description"
              name="title"
              autoComplete="off"
              readOnly={!canSave}
              value={formValues.title}
              onChange={onInputChanged}
            />
            <div className="invalid-feedback">Title is required.</div>
          </div>
          <div className="form-group mb-3">
            <label className="form-label">Notes</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Additional information (optional)"
              rows="5"
              name="notes"
              readOnly={!canSave}
              value={formValues.notes}
              onChange={onInputChanged}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary d-block ms-auto px-5 mt-4"
            disabled={!canSave}
          >
            <i className="far fa-save me-2"></i>
            <span>Save</span>
          </button>
        </form>
      </div>
    </Modal>
  );
};
