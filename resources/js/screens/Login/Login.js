import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import Swal from "sweetalert2";

const Login = () => {
    /** Get email and password field by data object */
    const [data, setData] = React.useState({
        email: "",
        password: ""
    });
    // Store pathname dashboard
    let redirect = "/dashboard";
    /** History to navigate into application */
    const history = useHistory();
    /** Errors to set errors if is existed */
    const [errors, setErrors] = React.useState(null);
    /** Ref to access into Element */
    const emailRef = React.useRef();
    const passwordRef = React.useRef();
    /**  Function allows user to change data value object by input */
    const onChangeData = e => {
        const newState = { ...data };
        newState[e.target.name] = e.target.value;
        setData(newState);
    };
    /** Function submit all data and send it into API*/
    const onSubmit = e => {
        e.preventDefault();
        const auth = {
            email: data.email,
            password: data.password
        };
        axios
            .post("api/auth/login", auth, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    "X-CSRF-TOKEN": window.Laravel.csrfToken
                }
            })
            .then(response => {
                setErrors(false);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
                // Redirect to dashboard
                history.replace(redirect);
            })
            .catch(error => {
                setErrors(true);
                emailRef.current.value = "";
                passwordRef.current.value = "";
            });
    };
    /** Component Mounted execute theses arguments */
    React.useEffect(() => {
        if (localStorage.getItem("message")) {
            let message = localStorage.getItem("message");
            Swal.fire("Vous avez bien été déconnecter !", message, "success");
            localStorage.clear();
        }
        if (localStorage.getItem("token") && localStorage.getItem("user"))
            history.push(redirect);
    }, []);

    let msg = !errors
        ? "Connexion réussie !"
        : "Identifiants ou mot de passe incorrect !";
    let name = !errors ? "alert alert-success" : "alert alert-danger";
    return (
        <div className="container-fluid h-100 text-dark">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3 login_panel">
                    <div className="login_logo">
                        <img src="./images/bigscreen_logo.png" />
                    </div>
                    <form role="form" method="POST" onSubmit={onSubmit}>
                        <div className="form-group">
                            <label
                                htmlFor="email"
                                className="col-md-6 control-label"
                            >
                                Adresse e-mail
                            </label>

                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    ref={emailRef}
                                    className="form-control"
                                    name="email"
                                    onChange={onChangeData}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label
                                htmlFor="password"
                                className="col-md-6 control-label"
                            >
                                Mot de passe
                            </label>

                            <input
                                id="password"
                                type="password"
                                ref={passwordRef}
                                className="form-control"
                                name="password"
                                onChange={onChangeData}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg btn-block"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div>
                        {errors != undefined && (
                            <div className={name} role="alert">
                                {msg}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
