import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DoctorDetails from "../pages/dashboard/DoctorDetails";
import { useAppDispatch, useAppSelector } from "../infrastructure/store";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { setLoadingUserData, setUser } from "../infrastructure/slice/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../infrastructure/firebase";
import Appointments from "../pages/dashboard/Appointments";

const Router = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoadingUserData(true));
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch(setUser({ uid: user.uid, ...docSnap.data() }));
        } else {
          dispatch(setUser(user));
        }
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoadingUserData(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {!user ? (
            <>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
            </>
          )}
          {user ? (
            <>
              <Route path="" element={<Dashboard />} />
              <Route path="doctor/:id" element={<DoctorDetails />} />
              <Route path="appointments" element={<Appointments />} />
            </>
          ) : (
            <Route path="/*" element={<Navigate to="/login" replace />} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
