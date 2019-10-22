import React,{Component ,Fragment} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary'
import {setSearchField, requestRobots} from '../actions';
import {connect} from 'react-redux'; 
import 'materialize-css'
// import "../node_modules/jquery/dist/jquery.min.js";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

const mapStateToProps = (state) => {
		return {
			searchField : state.searchRobots.searchField,
			robots : state.requestRobots.robots,
			isPending : state.requestRobots.isPending,
			error : state.requestRobots.error
		}	
	}

const mapDispatchToProps = (dispatch) => {
		return {
			onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
			// onRequestRobots: () => requestRobots(dispatch) or can be written as
			onRequestRobots : () => dispatch(requestRobots())
		}
	}

class App extends Component{


	componentDidMount(){
		this.props.onRequestRobots();
	}

	render ()
	{
		const {searchField , onSearchChange ,robots, isPending} = this.props;
		const filteredRobots = robots.filter(robot=>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})

		// if(robots.length===0)
		// {
		// 	return <h1>Loading...</h1>
		// }
		// else
 		// {
		return (

		<div className='tc'>
        <h1 className='f1' id='title'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          { isPending ? <h1>Loading</h1> :
            <ErrorBoundary>
              <CardList robots={filteredRobots} />
            </ErrorBoundary>
          }
        </Scroll>
      </div>
		);
	}
}
// 
// Connect is Higher Order Functio that returns another functio (App)

export default connect(mapStateToProps,mapDispatchToProps)(App)

