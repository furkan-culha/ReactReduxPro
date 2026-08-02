import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  keyword: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    createDataFunc: (state, action) => {
      state.data = [...state.data, action.payload];
    },
    sortingDataFunc: (state, action) => {
      state.data = [...state.data].sort((a, b) => {
        // 👈 Sadece (a, b)'yi parantez içine aldım
        if (action.payload === "asc") {
          // "asc" ise küçükten büyüğe sırala (a-b)
          return a.price - b.price; // Varsayım: Fiyata göre sıralıyorsunuz.
        } else if (action.payload === "desc") {
          // "desc" ise büyükten küçüğe sırala (b-a)
          return b.price - a.price; // Varsayım: Fiyata göre sıralıyorsunuz.
        }
        return 0; // Payload "asc" veya "desc" değilse sıralama yapma (veya mevcut düzeni koru)
      });
    },
    deleteDataFunc: (state, action) => {
      state.data = [...state.data.filter((dt) => dt.id != action.payload)];
    },
    updateDataFunc: (state, action) => {
      state.data = [
        ...state.data.map((dt) =>
          dt.id == action.payload.id ? { ...dt, ...action.payload } : dt
        ),
      ];
    },
    searchDataFunc: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createDataFunc,
  deleteDataFunc,
  updateDataFunc,
  sortingDataFunc,
  searchDataFunc,
} = dataSlice.actions;

export default dataSlice.reducer;
