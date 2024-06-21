import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../../firebase.config";

const initialState = {
	name: "",
	email: "",
	isLoading: true,
	isError: false,
	error: "",
};

export const createUser = createAsyncThunk(
	"user/createUser",
	

    async ({ email, password }, thunkAPI) => {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        console.log(userCredential);
        return { name: user.displayName, email: user.email };
		}
);



export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
	    builder
	        .addCase(createUser.pending, (state) => {
	            state.name = "";
	            state.email = "";
	            state.isLoading = true;
	            state.isError = false;
	            state.error = "";
	        })
	        .addCase(createUser.fulfilled, (state, action) => {
	            state.name = action.payload.name;
	            state.email = action.payload.email;
	            state.isLoading = false;
	            state.isError = false;
	            state.error = "";
	        })
	        .addCase(createUser.rejected, (state, action) => {
	            state.name = "";
	            state.email = "";
	            state.isLoading = false;
	            state.isError = true;
	            state.error = action.payload; 
	        });
	},
});

export default userSlice.reducer;
