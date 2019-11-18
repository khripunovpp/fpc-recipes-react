import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import fetchSingleIngredient from '../../store/actions/recipe/fetchSingleIngredient';
import Alert from "../layout/Alert";
import Spinner from '../layout/Spinner';

function Page({data}) {
    return (
        data.uid
            ?   <Fragment>
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h1 className="display-4">{data.name}</h1>
                            <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            
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
)(RecipePage)
