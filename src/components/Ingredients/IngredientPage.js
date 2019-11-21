import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetchSingleIngredient from '../../store/actions/recipe/fetchSingleIngredient';
import Alert from "../layout/Alert";
import Spinner from '../layout/Spinner';
import { Helmet } from "react-helmet";

function Page({data}) {
  return (
		data.uid
			? <div className="card mb-3">
                    <Helmet>
                        <title>{data.name}</title>
                    </Helmet>
					<div className="row no-gutters">
						<div className="col-md-4">
							<img src={data.thumbnail} className="card-img" alt={data.name}></img>
						</div>
						<div className="col-md-8">
							<div className="card-body">
								<h5 className="card-title">{data.name}</h5>
								{data.description && <p className="card-text">{data.description}</p>}
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
                        : <Page data={this.state}/>
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
