const domElement = document.querySelector("#root");
const e = React.createElement;

//add <br> on a single line break
marked.setOptions({
    breaks: true
});

// Get reference
const renderer = new marked.Renderer();

// Override function
renderer.link = function ( href,  title,  text) {
    return `<a target='_blank' href='${href}'>${text}`+'</a>';
};

//main react component with state
class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            value: placeholder
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({
            value: e.target.value
        });
    }

    render(){
        return(
            <div className='main-part'>
                <Editor value={this.state.value} handleChange={this.handleChange} />
                <Previewer value={this.state.value} />
            </div>
        );
    }
}

//editor component
const Editor = (props) => {
    return(
        <div className='section'>
            <h3 className='section-header'>Editor</h3>
            <textarea id='editor' value={props.value} onChange={props.handleChange} />
        </div>
    );
}

//previewer component
const Previewer = (props) => {
    const text = props.value;
    return(
        <div className='section'>
            <h3 className='section-header'>Previewer</h3>
            <p id='preview' dangerouslySetInnerHTML={{__html: marked(text, {renderer: renderer})}}></p>
        </div>
    );
}

//default placeholder text
const placeholder =  `
# Good evening, ladies and gentlemens

## Here we go!

Let's start to study some new things.
We should wrire smportant things **like this**.

My sister said:
> Of course it's hard. It's super difficult. But it's interesting!
> > ***Nota bene!***
> ## Everything is system!

We could look forever on three things:
- fire
- water
- flowers bloom

Just example of Java code:

    System.out.println('Hello world!');

This is just Levi:
    ![Levi, handsome man](https://i.ibb.co/vJ9zspW/MVgw-VBJ9fag.jpg)

Here it's some \`inline code\`

Here it's link on [Eren picture](https://i.ibb.co/5jV5VKk/y1wx-Wr-QNhh-Y.jpg)

### bye bye! =)
`

//render our react app
ReactDOM.render(<App />, domElement)