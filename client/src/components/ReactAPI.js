import { Component } from "react";


/******************************************/

// sample component for apis

/******************************************/

class ReactAPI extends Component {
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            apiResponse: ""
        };
    }

    callAPI(){
        fetch("http://192.168.1.200:9000/reactAPI")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }));
    }

    componentDidMount(){
        this.callAPI();
    }
    render(){
        return(
            <div>
                <p>{this.state.apiResponse}</p>
            </div>
        );
    }
}