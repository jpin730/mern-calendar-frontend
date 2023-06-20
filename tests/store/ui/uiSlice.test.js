import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";

describe("uiSlice", () => {
  test("should return initial state", () => {
    expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
  });

  test("should change isDateModalOpen", () => {
    let state = uiSlice.getInitialState();

    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBe(true);

    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBe(false);
  });
});
