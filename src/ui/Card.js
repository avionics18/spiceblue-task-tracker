import React from "react";

const Container = ({ children }) => {
    return (
        <div className="container">
            <div id="sidebar"></div>
            <div id="nav-bar" className="shadow-sm"></div>
            <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 offset-lg-2">
                    <div className="card rounded-0 shadow-sm">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Container;
