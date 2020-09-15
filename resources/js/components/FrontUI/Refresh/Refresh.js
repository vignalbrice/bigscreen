import React from "react";

const Refresh = ({ disabled }) => {
    return (
        disabled && (
            <div
                className="refresh"
                onClick={() => {
                    window.location.reload();
                }}
            >
                <img src="./images/refresh.svg" className="refresh_loader" />
            </div>
        )
    );
};

export default Refresh;
