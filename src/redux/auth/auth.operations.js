import { authSlice } from "./auth.slice";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";

const { authStateChange, updateUserProfile, authLogOut } = authSlice.actions;

export const register =
  ({ email, password, displayName, photoURL }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName, photoURL });
      const { uid } = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          displayName,
          email,
          photoURL,
        })
      );
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const logIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName, photoURL } = auth.currentUser;
      dispatch(
        updateUserProfile({
          userId: uid,
          displayName,
          email,
          photoURL,
        })
      );
    } catch (error) {
      console.log("error", error.message);
    }
  };

export const logOut = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authLogOut());
  } catch (error) {
    console.log("error", error.message);
  }
};

export const authStateCahngeUser = () => async (dispatch) => {
  await onAuthStateChanged(auth, (user) => {
    try {
      if (user) {
        const { uid, displayName, email } = user;
        const userUpdateProfile = {
          userId: uid,
          displayName,
          email,
        };
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    } catch (error) {
      console.log("error", error.message);
      signOut(auth);
      dispatch(authLogOut());
    }
  });
};
