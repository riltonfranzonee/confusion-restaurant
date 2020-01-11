import React from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap'



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
                    {this.renderComments(this.props.dish.comments)}
                </div>
            </div>
            </div>
        )
    }

}