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
import Profiles from "../pages/dashboard/Profiles";

const Router = () => {
  const { user, loading } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          dispatch(setUser({ uid: user.uid, ...docSnap.data() }));
          console.log(docSnap.data(), "");
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

  // console.log(user, "this is the usw");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {!user && !loading && (
            <>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="" element={<Navigate to="/login" replace />} />
              <Route path="/*" element={<Navigate to="/login" replace />} />
            </>
          )}
          {user && !loading && (
            <>
              <Route path="" element={<Dashboard isShowProfile />} />
              <Route
                path="/book-dependent-appointment/:dependentId"
                element={<Dashboard />}
              />
              <Route
                path="/book-dependent-appointment?/:dependentId?/reschedule-appointment?/:appointmentId?/doctor/:id"
                element={<DoctorDetails />}
              />
              <Route
                path="appointments/:dependentId?"
                element={<Appointments />}
              />
              <Route path="profiles" element={<Profiles />} />
            </>
          )}
          {user && (
            <>
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/register" element={<Navigate to="/" replace />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
