import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'




class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gists: null 
		}
	}
	componentDidMount() {
		fetch('https://api.github.com/gists')
			.then(res => res.json())
			.then(gists => this.setState({ gists }));
	}
	render() {
		const { gists } = this.state;
		const sidebarStyle = {
			width: '300px',
			float: 'left'
		}
		const contentStyle = {
			width: '400px',
			float: 'left'
		}

		return (
			<Router>
				<Switch>
					<div>
						<div style={sidebarStyle}>
							<h1> List of gists</h1>
							<ul> 
								{ gists ? (
									gists.map((gist, i) => (
										<li key={i}> 
											<Link to={`/g/${gist.id}`}> 
												{gist.description ||  '[ no description]'}
											</Link>
										</li>
									))
								) : (
									<p> loading </p>
								)}
							</ul>
						</div>
						<div style={contentStyle}>
							{ gists && (
								<Route path="/g/:gistId" render={({match}) => (
									<h1> {gists.find(g => g.id === match.params.gistId).id} </h1>
								)} />
							)}
						</div>
					</div>
				</Switch>
			</Router>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))

