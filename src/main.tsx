import * as ko from 'knockout'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

enum Priority {
    Low, Mid, High
}

class ItemViewModel {

    constructor(data){
        this.name(data.name);
        this.done(data.done);
        this.priority(data.priority);
    }

    public name  = ko.observable<string>();
    public done = ko.observable<boolean>();
    public priority = ko.observable<Priority>();

    public toggle = () => {
        this.done(!this.done());
    }
}

class ViewModel {
    constructor(data){
        this.title(data.name);
        this.todos.push(new ItemViewModel({
            name: "Kaffee",
            done: false,
            priority: Priority.Low,
        }))
        this.todos.push(new ItemViewModel({
            name: "Milch",
            done: true,
            priority: Priority.Mid,
        }))
        this.todos.push(new ItemViewModel({
            name: "Zucker",
            done: false,
            priority: Priority.High,
        }))
    }

    public title = ko.observable<string>();
    
    public todos = ko.observableArray<ItemViewModel>();

    public addTodo = () => {
        this.todos.push(new ItemViewModel({
            name: "Test",
            done: false,
            priority: Priority.Low
        }))
    }

}


abstract class KnockoutView<TP,TS> extends React.Component<TP,TS>{
    constructor(props: TP){
        super(props);

        this.renderComputed.subscribe(()=>this.forceUpdate())
    }

    public abstract renderObservable();

    private trigger = ko.observable();

    private renderComputed = ko.computed(()=>{
        this.trigger();
        return this.renderObservable()
    })

    componentWillReceiveProps(){
        this.trigger.notifySubscribers();
    }

    render(){
        return this.renderComputed();
    }

}

class View extends KnockoutView<{model:ViewModel},{}> {
    renderObservable(){
        let {model} = this.props;

        let items = model.todos().map((item,n)=>(
            <ItemView model={item} key={n}/>
        ))

        return (
            <div>
                <h2>{model.title()}</h2>
                <ul>
                    {items}
                </ul>
                <button onClick={model.addTodo}>Add</button>
            </div>
        )
    }
}

class ItemView extends KnockoutView<{model:ItemViewModel},{}> {
    
    renderObservable(){
        let {model} = this.props;

        if(model.done()){
            return <li onClick={model.toggle} style={{textDecoration:"line-through"}}>{model.name()}</li>
        }else{
            return <li onClick={model.toggle}>{model.name()}</li>
        }
    }
}

var vm = new ViewModel({name:"test"})

ReactDOM.render(<View model={vm} />, document.getElementById("view"));

