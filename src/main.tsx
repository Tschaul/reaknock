import * as ko from 'knockout'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

class ViewModel {
    constructor(data){
        this.name(data.name);
    }

    public name = ko.observable<string>();

}


class View extends React.Component<{model:ViewModel},{}> {

    constructor(props){
        super(props);
        this.computedRender.subscribe(()=>this.forceUpdate())
    }

    public fuzzName = () => {
        this.props.model.name(this.props.model.name()+"fuzz");
    }

    computedRender = ko.computed(()=>{
        return (
            <div>
                <span>{this.props.model.name()}</span>
                <button onClick={this.fuzzName}>fuzz</button>
            </div>
        )
    },this)

    render() {
        return this.computedRender();
    }
}


var vm = new ViewModel({name:"test"})

ReactDOM.render(<View model={vm} />, document.body);

