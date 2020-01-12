import React from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb} from 'reactstrap'
import {Link} from 'react-router-dom'


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
                </div>
            </div>
            </div>
        )
    }

}