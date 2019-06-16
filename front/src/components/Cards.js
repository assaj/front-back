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
        newSalaryError: '',
        newSalary: 0,
        cooperators: []
    };
    this.checkNewSalary = this.checkNewSalary.bind(this)
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

  async updateCooperator(id){
    if(this.state.newSalaryError === ''){
      await server.post(`/update/${id}/${this.state.newSalary}`)
      this.loadCooperators()
    }
  }

  checkNewSalary(event){
      let value = parseInt(event.target.value)
      if(isNaN(value)){
        this.setState({ newSalaryError: 'Needs to have a number' })
      }else if(value < 0){
        this.setState({ newSalaryError: "It's can't be negative"  })
      }else {
        this.setState({ newSalaryError: '' })
      }
      this.setState({ newSalary: value })
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
                <Button id='button' onClick={() => this.removeCooperator(cooperator._id)}>Remove</Button>
                <Button id='button' onClick={() => this.updateCooperator(cooperator._id)}>Update salary</Button>
                <input id='button' placeholder="New salary" onChange={this.checkNewSalary}></input>
                <p className="text-danger d-inline" name="descriptionError" > {this.state.newSalaryError}</p>
              </CardBody> 
            </Card>
          </article>
        ))}
        </div>
      );
    }
  }