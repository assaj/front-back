import React from 'react'
import { CardSubtitle, Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap'
import server from '../services/server'

import './cards.css'

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        description: '',
        file: '',
        cooperators: []
    };
  }



  componentDidMount() {
    this.loadCooperators()
  }

  async loadCooperators(){
    const response = await server.get('/posts')
      
        console.log(JSON.parse(response.request.response))
        this.setState({ cooperators: JSON.parse(response.request.response)})
      
    
  }
  async removeCooperator(id){
    await server.delete(`/posts/${id}`)
    this.loadCooperators()
  }
  render() {
    let { cooperators } = this.state;
    
      return (
        <div id="cardForm">
        {cooperators.map(cooperator => (
          <article key={cooperator._id}>
            <Card id="card">
              <CardImg top width="100%" src={'http://localhost:3333/files/'+cooperator.image} alt="Card image cap" />
              <CardBody>
                <CardTitle>{cooperator.name}</CardTitle>
                <CardSubtitle>salary: {cooperator.salary}</CardSubtitle>
                <CardText>Description: {cooperator.description}</CardText>
                <Button onClick={() => this.removeCooperator(cooperator._id)}>Excluir</Button>
              </CardBody> 
            </Card>
          </article>
        ))}
        </div>
      );
    }
  }