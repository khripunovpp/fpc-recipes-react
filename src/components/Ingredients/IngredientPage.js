import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetchSingleIngredient from '../../store/actions/ingredients/fetchSingleIngredient';
import Alert from "../layout/Alert";
import Spinner from '../layout/Spinner';
import { Helmet } from "react-helmet";

function Page({ingredient}) {
  return (
        ingredient.uid
			? <div className="card mb-3">
                    <Helmet>
                        <title>{ingredient.name}</title>
                    </Helmet>
					<div className="row no-gutters">
                        {ingredient.thumbnail &&
                            <div className="col-md-4">
                                <img src={ingredient.thumbnail} className="card-img" alt={ingredient.name}></img>
                            </div>
                        }
						<div className={`col-md-${ingredient.thumbnail ? '8': '12'}`}>
							<div className="card-body">
								<h5 className="card-title">{ingredient.name}</h5>
								{ingredient.description && <p className="card-text">{ingredient.description}</p>}
							</div>
						</div>
					</div>
				</div>
			: <Alert>Ingredient not found!</Alert>
  )
}


class IngredientPage extends Component {
    state = {loading: true, uid: ''}
    render() {
        const {loading} = this.state;
        return (
            <div className="main">
                <div className="container">
                    {
                    loading
                        ? <Spinner />
                        : <Page ingredient={this.state}/>
                    }
                </div>
            </div>
        )
    }
    componentDidMount = () => {
        const uid = this.props.match.params.uid;
        this.props.fetch(uid).then((ingredient)=>{
            this.setState({
                ...ingredient,
                loading: false
            })
        })
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    fetch: (uid) => fetchSingleIngredient(uid)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IngredientPage)
