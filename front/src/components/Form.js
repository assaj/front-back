import React from 'react'
import { Button, Form, FormGroup, Label, Input, Row } from 'reactstrap'
import server from '../services/server'

import './form.css'

export default class AddCooperator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        description: '',
        salary: '',
        image: null,
        submitText: '',
        submitErrorText: '',
        nameErrorText: '',
        descriptionErrorText: '',
        salaryErrorText: '',
        fileErrorText: '',
        cooperators: []
    };
    this.checkFormField = this.checkFormField.bind(this)
    this.SubmitcooperatorForm = this.SubmitcooperatorForm.bind(this)
    const size = {
      width : '50px'
    }

}

  checks = {
    name: (value) => {
      if(value.length <= 1){
        this.setState({ nameErrorText: 'Needs to have at lest 2 letters' })
      }else{
        this.setState({ nameErrorText: '' })
      }
      this.setState({ name: value })
    },
    description: (value) => {
      if(value.length <= 5 || value.length > 50){
        this.setState({ descriptionErrorText: 'Needs to have between 5 and 50 letters' })
      }else{
        this.setState({ descriptionErrorText: '' })
      }
      this.setState({ description: value })
    },
    file: (value, file) => {
      value = value.split(['.'])
      if(value[value.length - 1] !== 'png'){
        this.setState({ fileErrorText: 'Image format needs to be png' })
      }else{
        this.setState({ fileErrorText: '' })
      }
      this.setState({ image: file })
    },
    salary: (value) => {
      value = parseInt(value)
      if(isNaN(value)){
        this.setState({ salaryErrorText: 'Needs to have a number' })
      }else if(value < 0){
        this.setState({ salaryErrorText: "It's can't be negative"  })
      }else {
        this.setState({ salaryErrorText: '' })
      }
      this.setState({ salary: value })
    }
  }

  clearFields(){
    this.setState({name : ''})
    this.setState({description : ''})
    this.setState({salary : ''})
  }

  checkFormField(event){
    if(event.target.name !== 'file'){
      this.checks[event.target.name](event.target.value)
    }else{
      this.checks[event.target.name](event.target.value, event.target.files[0])
    }
    this.setState({ submitText : ''})
    this.setState({ submitErrorText : ''})
  }

  checkAllFormFields(){
    let {name, description, salary, image} = this.state
    return name !== '' && description !== '' && salary !== '' && image !== ''
  }

  async SubmitcooperatorForm() {
    if(this.checkAllFormFields()){
      let {name, description, salary, image} = this.state
      const data = new FormData()
      
      data.append('image', image)
      data.append('name', name)
      data.append('description', description)  
      data.append('salary', salary)
      
      try{
        await server.post('/add', data)
        this.setState({ submitText : 'Submitted!'})
        this.clearFields()
      }catch(e){
        this.setState({ submitErrorText : 'Could not connect to server'})
      }
    }else{
      this.setState({ submitErrorText : 'Some field is not corrected completed'})
    }
  }

  render() {
    
    return (
      <div >
      <form id="new-post">
          <Label>Name. </Label>
          <p className="text-danger d-inline" name="nameError"> {this.state.nameErrorText}</p>
          <Input value = {this.state.name} type="name" name="name" placeholder="Your name here" onChange={this.checkFormField}/>
          <Label>Salary. </Label>
          <p className="text-danger d-inline" name="salaryError"> {this.state.salaryErrorText}</p>
          <Input value = {this.state.salary} type="name" name="salary" placeholder="Your salary here" onChange={this.checkFormField}/>
          <Label>Description. </Label>
          <p className="text-danger d-inline" name="descriptionError"> {this.state.descriptionErrorText}</p>
          <Input value = {this.state.description} type="textarea" name="description" placeholder="Your description here" onChange={this.checkFormField}/>
          <Label>Photo</Label>
          <p className="text-danger d-inline" name="descriptionError"> {this.state.fileErrorText}</p>
          <Input  id="fileInput" type="file" name="file" onChange={this.checkFormField}/>
        <Button onClick={this.SubmitcooperatorForm}>Submit</Button>
        <p className="text-success d-inline" name="descriptionError"> {this.state.submitText}</p>
        <p className="text-danger d-inline" name="descriptionError"> {this.state.submitErrorText}</p>
      </form>
      </div>
    );
  }
}