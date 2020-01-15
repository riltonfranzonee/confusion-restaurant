import React from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Modal, ModalHeader, ModalBody, Row, Label, Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Control, LocalForm, Errors} from 'react-redux-form'
import { Loading } from './LoadingComponent'
import {baseUrl} from '../shared/baseUrl'



const maxLength = len => val => !(val) || (val.length <= len) 
const minLength = len => val => (val) && (val.length >= len)

class CommentForm extends React.Component{
    state={ 
        isModalOpen: false
    }

    toggleModal = () => this.setState({isModalOpen: !this.state.isModalOpen})

    handleSubmit = values => {
        this.toggleModal()
        this.props.postComment(this.props.dishId, values.rating, values.name, values.comment)
    }

    render(){
        return(
            <>
            <Button onClick={this.toggleModal}>
                <span className='fa fa-edit fa-lg mr-2'></span>Submit Comment
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor='rating' md={12}>Rating</Label>
                            <Col md={10}>
                                <Control.select className='form-control' model='.rating' name='rating'>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor='firstname' md={12}>Your Name</Label>
                            <Col md={10}>
                                    <Control.text validators={{maxLength: maxLength(15), minLength: minLength(3)}}className='form-control'  model='.name' id='name' name='name' placeholder='Your name' /> 
                                    <Errors className='text-danger' model='.name' show='touched' messages={{ minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less'}}/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor='comment' md={12}>Comment</Label>
                            <Col md={10}>
                                    <Control.textarea rows='6' className='form-control'  model='.comment' id='comment' name='comment' /> 
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col md={{size:10}}>
                                <Button type='submit' color='primary'>Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        )
    }
}

export default class DishDetail extends React.Component{ 

    renderComments(comments, postComment, dishId){
        if(comments != null){
            return(
            <div>
            <ul className='list-unstyled'>
                {comments.map(comment => { 
                    return(
                        <li>
                            <p>{comment.comment}</p>
                            <p> --{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </li>
                    )
                    })}
            </ul>
            <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
            )

    } else{
        return (
            <div></div>
        )
        }
    }

    toggleModal = () => this.setState({isModalOpen: !this.state.isModalOpen})

    render(){
        if(this.props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        } else if (this.props.errMess){
            return (
                <div className="container">
                    <div className="row">
                       <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            )
        } else if (this.props.dish != null){
        return(
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr/>
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg  object src={baseUrl + this.props.dish.image} alt={this.props.dish.name}/>
                         <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    {this.renderComments(this.props.comments, this.props.postComment, this.props.dish.id)}
                </div>
            </div>
            </div>
        )}
    }

}