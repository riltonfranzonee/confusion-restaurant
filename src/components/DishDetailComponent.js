import React from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Modal, ModalHeader, ModalBody, Row, Label, Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Control, LocalForm, Errors} from 'react-redux-form'



const maxLength = len => val => !(val) || (val.length <= len) 
const minLength = len => val => (val) && (val.length >= len)

class CommentForm extends React.Component{
    state={ 
        isModalOpen: false
    }

    toggleModal = () => this.setState({isModalOpen: !this.state.isModalOpen})

    handleSubmit = e => {
        this.toggleModal()
        e.preventDefault()
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
                    <LocalForm>
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
                                <Button type='submit' color='primary' onClick={this.handleSubmit}>Submit</Button>
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

    renderComments(comments){
        if(comments != null){
            return(
        comments.map(comment => (
            <ul className='list-unstyled' key={comment.id}>
                <li>{comment.comment}</li>
                <li>    --{comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
            </ul>
            ))
        )
    } else{
        return (
            <div></div>
        )
        }
    }

    toggleModal = () => this.setState({isModalOpen: !this.state.isModalOpen})

    render(){
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
                        <CardImg  object src={this.props.dish.image} alt={this.props.dish.name}/>
                         <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    {this.renderComments(this.props.comments)}
                    <CommentForm/>
                </div>
            </div>
            </div>
        )
    }

}