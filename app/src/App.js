import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link }  from 'react-router-dom';



class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			gists: null
		}
	}
	componentDidMount() {
		fetch('https://api.github.com/gists')
		.then(res => res.json())
		.then(gists => this.setState({
			gists
		}));
	}
	render () {
		const styleSidebar = {
			width: '300px',
			backgroundColor: '#ccc',
			float: 'left'
		}
		const styleContent = {
			width: '500px',
			float: 'left'
		}
		const { gists } = this.state;
		return (
			<Router>
				<div>
					<div style={styleSidebar}> 
						<h1> Lista de Gits </h1>
						<ul>
							{ gists ? gists.map((x ,i) => (
								<li key={i}> 
									<Link to={`/g/${x.id}`}>
										{x.description || '[ no hay description]'} 
									</Link>
								</li>) 
							) : (<p> loading ... </p>)
							}
						</ul>
					</div>
					<div style={styleContent}>
						<h1> Detalle </h1>
						<Route path="/g/:gistId" render={({match}) => {
							return <h1> {gists.find(g => g.id === match.params.gistId).id} </h1>
						}} />
					</div>
				</div>
			</Router>
		)
	}
}
ReactDOM.render(<App />, document.getElementById('root'))

