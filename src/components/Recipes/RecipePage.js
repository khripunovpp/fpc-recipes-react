import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetchSingleRecipe from '../../store/actions/recipe/fetchSingleRecipe';
import Alert from "../layout/Alert";
import Spinner from '../layout/Spinner';

function Page({data}) {
  return (
		data.uid
			? <div className="jumbotron jumbotron-fluid">
					<div className="container">
						<h1 className="display-4">{data.title}</h1>
						{data.description && <p className="lead">{data.description}</p>}
					</div>
				</div>
			: <Alert>Ingredient not found!</Alert>
  )
}


class RecipePage extends Component {
    state = {loading: true, uid: ''}
    render() {
        const {loading} = this.state;
        return (
            <div className="main">
                <div className="container">
                    {
                    loading
                        ? <Spinner />
                        : <Page data={this.state}/>
                    }
                </div>
            </div>
        )
    }
    componentDidMount = () => {
        const uid = this.props.match.params.uid;
        this.props.fetch(uid).then((recipe)=>{
            this.setState({
                ...recipe,
                loading: false
            })
        })
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    fetch: (uid) => fetchSingleRecipe(uid)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RecipePage)
