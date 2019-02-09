import React, { Component } from 'react';
import axios from 'axios';
import Course from './Course';
import update from 'immutability-helper';
import CourseForm from './CourseForm';
import { MDBIcon } from "mdbreact";
import Modal from './UI/Modal';
import Aux from './hoc/Aux';
import { withRouter } from 'react-router-dom';



class CoursesContainer extends Component {

  constructor(props) {
  super(props)
  this.state = {
    courses: [],
    editingCourseId: null,
    notification: null,
    greetings: false,
    todo: true

  }
}


  componentDidMount() {

    let token = "Bearer " + localStorage.getItem("jwt")
    const options = { method: 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': token },
    url: '/api/courses',
     };
    axios(options)
  .then(response => {
    this.setState({courses: response.data})
  })
  .catch(error => console.log(error))
}




addNewCourse = () => {
  let token = "Bearer " + localStorage.getItem("jwt")

  axios.post('/api/courses/',
   { course:
      {
        title: '',
        description: '',
        capacity: 1,
        liked: false,
        category: ' ',
      }

    }, { headers: {'Authorization': token }}

  )
  .then(response => {
    console.log(response)
    const courses = update(this.state.courses, {
      $splice: [[0, 0, response.data]]
    })
    this.setState({
      notification: null,
      courses: courses,
      editingCourseId: response.data.id})
  })
  .catch(error => console.log(error))
}


updateCourse = (course) => {
  return false;
  const courseIndex = this.state.courses.findIndex(x=> x.id === course.id)
  const courses = update(this.state.courses, {
    [courseIndex]: {$set: course }
  })
  this.setState({courses: courses, notification: 'All changes saved !', editingCourseId: null})
}



enableEditing = (id) => {

  this.setState({ editingCourseId: id, notification: null})
}


likedHandler = (c) =>{
  let token = "Bearer " + localStorage.getItem("jwt")
  const courseIndex = this.state.courses.find(x => x.id === c.id)
  courseIndex.liked = !courseIndex.liked
   const course = {
    liked: courseIndex.liked
  }
  axios.put(`/api/courses/${c.id}`,
  {
      course: course
    }, { headers: {'Authorization': token }})
 .then(response => {
    //this.props.updateCourse(response.data)
    const courses = update(this.state.courses, {
    [courseIndex]: {$set: course }
  })

    this.setState({courses: courses})
    if (courseIndex.liked) {
      this.setState({greetings: true})
    }
  })
  .catch(error => console.log(error))
}

cancelHandler =(e) => {
  e.preventDefault()
  return false;
  this.setState({ editingCourseId: null})
}

deleteHandler = (id) => {
  alert("Are you sure you want to delete the task? ")
  let token = "Bearer " + localStorage.getItem("jwt")
  axios.delete(`api/courses/${id}`,  { headers: {'Authorization': token }})
  .then(response => {
    const courseIndex = this.state.courses.findIndex(x => x.id === id)
    const courses = update(this.state.courses, { $splice: [[courseIndex, 1]]})
    this.setState({courses: courses})
  })
  .catch(error => console.log(error))
}


stopGreetings =()=> {
  this.setState({greetings: false})
}


displayTodoHandler = () =>{
  this.setState({todo: true})
}


displayDoneHandler = () =>{
  this.setState({todo: false})
}



  render() {
    let doneCount = 0;
     let urgentCount =0;
     let semiUrgentCount=0;
     let taskCount = this.state.courses.length
     console.log(this.state.courses.length)

     this.state.courses.map((c) => {
        if  (c.liked) {
          doneCount++
        } else {
          if (c.capacity === 3) {
          urgentCount++ }
          else if  (c.capacity === 2) {
            semiUrgentCount++
          }
        }})


     let ratio = (doneCount ) /taskCount * 100

     if (this.state.courses.length < 1 ) {
      ratio = 0
     }
     let ratioR = Math.round(ratio)


     let courses = this.state.courses.map((c) => {
      if (this.state.editingCourseId === c.id) {
        return(
          <div  key={c.id}>
            <CourseForm
            course={c}
            key={c.id}
            updateCourse={this.updateCourse}
            resetNotification={this.resetNotification}
            canceled= {(e) => this.cancelHandler(e)}
            liked = {c.liked} />
          </div>)
      } else {
        return( <div key={c.id} >
          < Course
          erase={() => this.deleteHandler(c.id)}
          title={c.title} category={c.category} description={c.description}
          capacity ={c.capacity} address={c.address}
          clicked={() => this.enableEditing(c.id)}
          like ={() => this.likedHandler(c)}
          liked = {c.liked}/>
          </div>)
        }
      })

    let coursesDone = [];
    let coursesTodo = [];

     courses.forEach((c) => {
       console.log(c.props.children.props.liked);
      (c.props.children.props.liked) ? coursesDone.push(c) : coursesTodo.push(c)
     })


      let DisplayCourses = coursesTodo

        let tabs= <div className= "tabs">
        <span className="tab active" onClick={this.displayTodoHandler}> TODO </span>
        <span className="tab" onClick={this.displayDoneHandler}> DONE </span>
      </div>
     if (this.state.todo === false) {
      DisplayCourses = coursesDone
      tabs = <div className= "tabs">
        <span className="tab " onClick={this.displayTodoHandler}> TODO </span>
        <span className="tab active" onClick={this.displayDoneHandler}> DONE </span>
      </div>
     }





    return (
    <div >

     <h1> TODOLIST </h1>
    <h2> GET THINGS DONE </h2>

    <button className="newCourseButton" onClick={this.addNewCourse} >
         ADD A TASK <MDBIcon icon="plus"/>
      </button> <span className="notification">
          {this.state.notification}
        </span>
        <Modal
          show={this.state.greetings}
          modalClosed={this.stopGreetings}>
          <h2> Task completed! Well done! </h2>
           <div className="modal-i"> <MDBIcon icon="thumbs-up"/> </div>
        </Modal>
      <div className="header">
        <div className="h blue"> <h3> {doneCount} </h3> <p> completed tasks  </p>  </div>
        <div className="h pink">  <h3>  {urgentCount} </h3>  <p> urgent tasks todo </p> </div>
        <div className="h yellow"> <h3> {semiUrgentCount} </h3>  <p> semi-urgent tasks todo </p> </div>
        <div className="h green">  <h3> {ratioR} % </h3> <p> ratio of completion </p> </div>
      </div>
      {tabs}

      <div className= "tiles">

        {DisplayCourses}
        </div>


    </div>
  )
}
}








export default withRouter(CoursesContainer);
