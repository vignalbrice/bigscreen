import React from "react";
import "./NotFound.css";
import Header from "../../components/FrontUI/Header/Header";
import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <>
            <Header />
            <section className="page_404">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 mt-5">
                            <div className="text-center">
                                <div className="four_zero_four_bg">
                                    <p className="text-center display-4">
                                        404 Not Found !
                                    </p>
                                </div>

                                <div className="contant_box_404">
                                    <p className="h1">Oops.. </p>

                                    <p className="h4 mb-5">
                                        La page que vous tentez de joindre n'est
                                        pas disponible.
                                    </p>

                                    <Link to="/" className="link_404">
                                        Retourner a la page d'accueil
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default NotFound;
