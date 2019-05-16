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
            file: e.target.files[0];
        });
    }
    
    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render(){
        return(
            <>
                <form onSubmit={this.handleSubmit}>
                    <h1>File Upload</h1>
                    <input type="file" onChange={this.handleChange} />
                    <button type="submit">Upload</button>
                </form>
            </>
        )
    }
}

export default Test;