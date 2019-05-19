// @flow
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Content = styled.div`
    margin-top: 55px;
`

class Test extends React.Component{

    state = {
        file: null
    }

    handleChange = (e) => {
        this.setState({
            file: e.target.files[0]
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        
        // const file = new Blob([this.state.file], {type: 'image/png'});
        const file = this.state.file;

        const url = 'http://localhost:4000/api/test/save'
        const formData = new FormData();

        formData.append('image', file);
        
        axios.post(url, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response);
        });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.handleChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default Test;