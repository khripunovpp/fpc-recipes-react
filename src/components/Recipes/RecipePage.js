import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import fetchSingleRecipe from '../../store/actions/recipe/fetchSingleRecipe';
import Alert from "../layout/Alert";
import Spinner from '../layout/Spinner';
import { Helmet } from "react-helmet";

function Page({recipe}) {
  return (
        recipe.uid
			?   <Fragment>
                    {recipe.thumbnail && <img src={recipe.thumbnail} className="card-img-top" alt={recipe.title} />}
                    <Helmet>
                        <title>{recipe.title}</title>
                    </Helmet>
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h1 className="display-4">{recipe.title}</h1>
                            {recipe.description && <p className="lead">{recipe.description}</p>}
                        </div>
                    </div>
                </Fragment>
			:   <Alert>Ingredient not found!</Alert>
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
                        : <Page recipe={this.state}/>
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
