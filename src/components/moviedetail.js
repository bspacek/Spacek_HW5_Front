import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchMovie } from "../actions/movieActions";
import { submitReview } from "../actions/reviewActions";
import { BsStarFill } from 'react-icons/bs'
import { Image, ListGroup, ListGroupItem, Form, Button , Card } from 'react-bootstrap'
import noImage from "../image/NoImage.png"

class MovieDetail extends Component {

    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.submitReview = this.submitReview.bind(this);

        this.state = {
            details:{
                userReview: '',
                rating: '',
                title: '',
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        console.log(event)
        this.setState({
            details: updateDetails
        });
    }

    submitReview = async () => {
        console.log("state", this.state);
        if (!this.state.details.rating || !this.state.details.userReview) {
            alert("You must enter a rating and a review!");
            return;
        }

        const { dispatch } = this.props;
        let response = await dispatch(
            submitReview({
                title: this.props.selectedMovie.title,
                rating: this.state.details.rating,
                userReview: this.state.details.userReview,
                username: localStorage.getItem('username')
            })
        );
        console.log('response', response)
    };


    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    render() {

        if (!this.props.selectedMovie) {
            return <div>Loading....</div>
        }

        return (

            <Card>
                <Card.Header>Movie Detail</Card.Header>
                <Card.Body>
                    <Image className="image" src={this.props.selectedMovie.imgURL ? this.props.selectedMovie.imgURL : noImage} thumbnail />
                </Card.Body>
                <ListGroup>
                    <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                    <ListGroupItem>
                        {this.props.selectedMovie.actors.map((actor, i) =>
                            <p key={i}>
                                <b>{actor.actorName}</b> {actor.characterName}
                            </p>)}
                    </ListGroupItem>
                    <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.avgRating}</h4></ListGroupItem>
                </ListGroup>
                <Card.Body>
                    {this.props.selectedMovie.reviews.map((review, i) =>
                        <p key={i}>
                            <b>{review.username}</b>&nbsp; {review.userReview}
                            &nbsp;  <BsStarFill /> {review.rating}
                        </p>
                    )}
                </Card.Body>

                <Card.Body>
                    <Form className='form-horizontal'>
                        <Form.Group controlId="userReview">
                            <Form.Label>Your Review</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.userReview} type="text" placeholder="Enter review" />
                        </Form.Group>

                        <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control onChange={this.updateDetails} value={this.state.details.rating}  type="number" placeholder="Enter rating (1-5)" min="0" max="5" />
                        </Form.Group>
                        <Button onClick={this.submitReview}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);




