import React,{Component} from 'react';

class HelloWorld extends Component{
    constructor(props) {
        super(props);
        this.state = { liked: false };
    }
    
    render(){
        return (
            <span className="hello" >HelloWorld!!</span>
        );
    }
}

export default HelloWorld;