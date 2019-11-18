import React, {Component} from 'react';
import { connect } from 'react-redux';
import fetchSingleRecipe from '../../store/actions/recipe/fetchSingleRecipe';

class RecipePage extends Component {
    state = {loading: true, uid: ''}
    render() {
        const {loading} = this.state;
        return (
            <div>
                {
                loading
                    ? <h1>Loading...</h1>
                    : <h1>Recipe Uid {this.state.title}</h1>
                }
                
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
