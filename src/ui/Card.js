import React from "react";

const Container = ({ children }) => {
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-xl-5 col-lg-6 col-md-7 col-sm-9">
                    <div className="card rounded-0 shadow-sm">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Container;
