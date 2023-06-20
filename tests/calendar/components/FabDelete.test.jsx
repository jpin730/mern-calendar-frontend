import { fireEvent, render, screen } from "@testing-library/react";

import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore, useUiStore } from "../../../src/hooks";

jest.mock("../../../src/hooks");

describe("FabDelete", () => {
  const mockStartDeletingEvent = jest.fn();

  useUiStore.mockReturnValue({
    isDateModalOpen: false,
  });

  beforeEach(() => jest.clearAllMocks());

  test("should hide button if no event is selected", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    const { container } = render(<FabDelete />);

    expect(container.innerHTML).toBe("");
  });

  test("should show button if an event is selected", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });

    render(<FabDelete />);

    const btn = screen.getByRole("button");

    expect(btn.classList).toContain("btn");
    expect(btn.classList).toContain("btn-danger");
    expect(btn.classList).toContain("fab-delete");
  });

  test("should call startDeletingEvent if an event is selected", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(<FabDelete />);

    const btn = screen.getByRole("button");

    fireEvent.click(btn);

    expect(mockStartDeletingEvent).toHaveBeenCalledWith();
  });
});
