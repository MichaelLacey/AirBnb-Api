// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import OneSpot from "./components/OneSpot";
import CreateASpot from "./components/CreateSpot";
// import EditDelSpot from "./components/EditDelSpot";
// import EditSpot from "./components/EditSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <CreateASpot />
      {isLoaded && (
        <Switch>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path='/' exact>
            <AllSpots />
          </Route>
          <Route path='/spots/:spotId'>
            <OneSpot />
            {/* <EditSpot />
            <EditDelSpot /> */}
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;