import React from "react";
import './NotFound.css'
import shruge from './Shruge.png'

class NotFound extends React.Component {
    render() {
        return (
            <div className="not-found">
                <h4>Nie znaleziono takiego streamera lub nie ma danych o jego streamach</h4>
                <img src={shruge} alt='shruge'></img>
            </div>
        )
    }
}

export default NotFound