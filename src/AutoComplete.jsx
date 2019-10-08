import React, { Component } from 'react';

const API = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=5&offset=0&hateoasMode=false&namePrefix="
const API_IMG = "https://api.pexels.com/v1/search?query="
//http://geodb-free-service.wirefreethought.com/v1/geo/cities/136168
//chave google: AIzaSyBnF1n-2UYOs4vM0QKWN8wZIsNcYZxp-M8

class AutoComplete extends Component {

    constructor(props) {
        super(props);
        this.onKeyChange = this.onKeyChange.bind(this)
        this.onClickSuggestion = this.onClickSuggestion.bind(this)
        this.state = {value: '', suggestions: []};
    }
    
    onKeyChange(e) {
        const inputText = e.target.value;

        this.setState({value: inputText});

        if (inputText === '') {
            this.setState({ suggestions: [] })
        } else {
        
            fetch(API + e.target.value)
            .then(response => response.json())
            .then(json =>
                this.setState({
                    suggestions: json.data.map(item => ({city: item.city, id: item.id, country: item.country}))
                }))
        }
    }

    onClickSuggestion(e) {
        this.setState({value: e.city, suggestions: []});

        fetch(API_IMG + e.country + "+monument", {
            method: 'GET',
            headers: {
                'Authorization': process.env.GOOGLE_API_KEY
            }
        }).then(response => response.json())
        .then(json => {
            e.image = json.photos[0].src.small
            this.setState({value: ''})
            this.cityInput.focus(); 
            this.props.onClickSuggestion(e)
        })
        .catch(error => this.setState({
            isLoading: false,
            message: 'Something bad happened ' + error
        }));
    }

    render() {
        return (
            <div>
                <input 
                ref={(input) => { this.cityInput = input; }} 
                onChange={this.onKeyChange} 
                value={this.state.value} 
                className="form-control" 
                type="text" 
                placeholder="Digite a cidade"
                list="suggestions"></input>
                
                { this.state.suggestions.length > 0 &&
                <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
                    { this.state.suggestions.map( item => 
                        <li key={item.id} onClick={() => this.onClickSuggestion(item)}
                        className="dropdown-item">{item.city} - {item.country}
                        </li>
                    )}
                </ul>
                }
            </div>
        );
    }
}

export default AutoComplete;
