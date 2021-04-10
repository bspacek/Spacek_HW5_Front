import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import { submitReview } from "../actions/reviewActions";
import {connect} from 'react-redux';
//import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import {FormLabel, Image} from 'react-bootstrap';
//import { Form , Button , FormGroup , FormControl , Col } from 'react-bootstrap';
import { ListGroup, ListGroupItem, Col, Form, FormGroup, FormControl, Button , Card , DropdownButton , Dropdown , FormGroupProps , Row} from 'react-bootstrap'
import noImage from "../image/NoImage.png"

class MovieDetail extends Component {


    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
        }
    }

    submitReview(title, rating, userReview) {
        submitReview(title, rating, userReview);
        this.props.selectedMovie = {
            username: this.props.username,
            rating: rating,
            userReview: userReview
        };
    }


    render() {
        const DetailInfo = () => {
            if (!this.props.selectedMovie) {
                return <div>Loading....</div>
            }

            return (
                <Card>
                    <Card.Header>Movie Detail</Card.Header>
                    <Card.Body>
                        <Image className="image" src={this.props.selectedMovie.imgUrl ? this.props.selectedMovie.imgURL : noImage} thumbnail />
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
                </Card>
            )
        }

        return (
            <div>
                <DetailInfo currentMovie={this.props.selectedMovie} />

                <Form>
                    <Form.Group as={Row} controlId={"userReview"}>
                        <Form.Label column sm={3}>Review</Form.Label>
                        <Col sm={6}>
                            <Form.Control type={"text"}
                                          as={"textarea"}
                                          placeholder={"Enter your review..."}
                                          rows={5}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={"rating"}>
                        <Form.Label column sm={3}>Rating</Form.Label>
                        <Col sm={6}>
                            <Form.Control type={"rating"} placeholder={"Select your rating."} as={"Select"}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col md={12}>
                            <Button variant={"primary"} onClick={this.submitReview}>Submit</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);