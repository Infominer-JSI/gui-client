import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

// the header and footer components
import Header from "components/Header";
import Footer from "components/Footer";

// the datasets routes
import Datasets from "pages/Datasets";
import Upload from "pages/Datasets/Upload";
import Dataset from "pages/Datasets/Dataset";
// login and misc routes
import Login from "pages/Login";
// error routes
import PageNotFound from "pages/PageNotFound";

// import styles
import styles from "App.module.scss";

export default function App() {
  return (
    <Router>
      <div className={styles.website}>
        <Header />
        <main className={styles.content}>
          <Switch>
            {/* Homepage Route */}
            <Route exact path="/">
              <Redirect to="/datasets" />
            </Route>

            {/* Datasets Routes */}
            <Route exact path="/datasets" component={Datasets} />
            <Route exact path="/datasets/upload" component={Upload} />
            <Route exact path="/datasets/:datasetId" component={Dataset} />

            {/* Login Routes */}
            <Route exact path="/login" component={Login} />

            {/* 404: Page not Found */}
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
