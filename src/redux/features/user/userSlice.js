import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import auth from "../../../../firebase.config";

const initialState = {
  name: "",
  email: "",
  isLoading: false,
  isInitializing: true,
  isError: false,
  error: "",
};

// Thunk to create a new user
export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: name });
      const user = userCredential.user;
      const userData = { name: user.displayName, email: user.email };
      
      return userData;
    } catch (error) {
      console.error("Error creating user:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for login with email and password
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = { name: user.displayName, email: user.email };
      
      return userData;
    } catch (error) {
      console.error("Error logging in:", error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Thunk for Google sign-in
  export const signInWithGoogle = createAsyncThunk(
    "user/signInWithGoogle",
    async (_, thunkAPI) => {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userData = { name: user.displayName, email: user.email };
        
        return userData;
      } catch (error) {
        console.error("Error signing in with Google:", error.response ? error.response.data : error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );




export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.name = payload.name;
      state.email = payload.email;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload.isLoading;
    },
    setInitializing: (state, { payload }) => {
      state.isInitializing = payload.isInitializing;
    },

  },
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
        state.error = action.payload; // Use action.payload for error message
      })
      .addCase(loginUser.pending, (state) => {
        state.name = "";
        state.email = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.name = "";
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload; // Use action.payload for error message
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.name = "";
        state.email = "";
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.name = "";
        state.email = "";
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload; // Use action.payload for error message
      });
  },
});


// Action creators are generated for each case reducer function
export const { setUser, setLoading, setInitializing } = userSlice.actions;

export default userSlice.reducer;
