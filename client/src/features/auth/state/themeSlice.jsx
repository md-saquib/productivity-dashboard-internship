import { createSlice } from "@reduxjs/toolkit";


const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        mode: JSON.parse(localStorage.getItem('mode')) ?? 'dark'
    },
    reducers: {
        changeTheme: (state) => {
            localStorage.setItem('mode', JSON.stringify(state.mode === 'dark' ? 'light' : 'dark'));

            state.mode = JSON.parse(localStorage.getItem('mode'));

            window.document.body.classList.toggle('light')
        }
    }
})

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;