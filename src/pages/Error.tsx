import { ApolloError } from "@apollo/client";
import React from "react";

type PropTypes = {
    error: ApolloError;
};

const Error = ({ error }: PropTypes) => {
    return (
        <div className="wrapper">
            <div className="error">
                <p>Error! Something Went Wrong</p>
                <span>{error.message}</span>
            </div>
        </div>
    );
};

export default Error;
