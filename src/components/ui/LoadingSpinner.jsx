import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner = ({ message = "Carregando..." }) => {
    return (
        <div className="text-center my-4">
            <Spinner animation="border" role="status" />
            <div className="mt-2">{message}</div>
        </div>
    );
};

export default LoadingSpinner;