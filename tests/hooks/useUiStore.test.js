import { act, renderHook } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { useUiStore } from "../../src/hooks/useUiStore";
import { uiSlice } from "../../src/store";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

export const isDateModalOpenFalse = {
  isDateModalOpen: false,
  closeDateModal: expect.any(Function),
  openDateModal: expect.any(Function),
  toggleDateModal: expect.any(Function),
};

export const isDateModalOpenTrue = {
  isDateModalOpen: true,
  closeDateModal: expect.any(Function),
  openDateModal: expect.any(Function),
  toggleDateModal: expect.any(Function),
};

describe("useUiStore", () => {
  test("should return default values", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual(isDateModalOpenFalse);
  });

  test("should open date modal", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { openDateModal } = result.current;

    act(() => {
      openDateModal();
    });

    expect(result.current).toEqual(isDateModalOpenTrue);
  });

  test("should close date modal", () => {
    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { closeDateModal } = result.current;

    act(() => {
      closeDateModal();
    });

    expect(result.current).toEqual(isDateModalOpenFalse);
  });

  test("should toggle date modal", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    act(() => {
      result.current.toggleDateModal();
    });
    expect(result.current).toEqual(isDateModalOpenTrue);

    act(() => {
      result.current.toggleDateModal();
    });
    expect(result.current).toEqual(isDateModalOpenFalse);
  });
});
