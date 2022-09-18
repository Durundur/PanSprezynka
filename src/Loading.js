import React from "react";
import './Loading.css'


class Loading extends React.Component {
    render() {
        return (
            <div className="loading-container">
                <div className="loading-spinner">
                </div>
            </div>
        )
    }
}

export default Loading