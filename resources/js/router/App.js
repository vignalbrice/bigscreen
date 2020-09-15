import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Surveys from "../screens/Surveys/Surveys";
import Answers from "../screens/Answers/Answers";
import Admin from "../screens/Protected/Admin/Admin";
import Login from "../screens/Login/Login";
import "./App.css";
import NotFound from "../screens/NotFound/NotFound";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/" component={Surveys} />
                    <Route path="/reponses/:reponsesUrl" component={Answers} />
                    <Route path="/administration" component={Login} />
                    <PrivateRoute path="/dashboard">
                        <Route component={Admin} />
                    </PrivateRoute>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                localStorage.getItem("token") ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/administration",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};
export default App;
