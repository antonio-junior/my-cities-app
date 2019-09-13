import React from 'react';

export default props => (
    <div>
        {props.cities.map( city => (
            <div className="card">
            <img className="card-img-top" src={city.image} alt={city.name} />
            <div className="card-body">
                <h5 className="card-title">{city.city}</h5>
                <p className="card-text">País: {city.country}</p>
                <span onClick={() => props.onClickRemove(city)} className="btn btn-primary">Remover</span>
            </div>
            </div>
        ))}
    </div>
)