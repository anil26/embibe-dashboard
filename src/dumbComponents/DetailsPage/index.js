import React from "react"
import Plot from 'react-plotly.js'
import Cookies from "js-cookie"
import Container from "components/Dashboard/index"

class StudentDetailsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state =  {
      data: null,
      layout: null,
      studentData: null,
    }
  }

  componentDidMount() {
    const { history, getStudentData, studentData } = this.props
    const isLoggedInAlready = Cookies.get("access-token")
    if (!isLoggedInAlready) {
      history.push("/")
    } else if(!studentData){
      getStudentData()
    }
  }

  static getDerivedStateFromProps(props, state) {
    if(props.studentData && !state.studentData) {
      return {
        ...state,
        studentData: props.studentData,
      }
    }
    return null
  }

  createDataAndLayout = (studentData, id) => {
    const studentInfo = studentData[id]
    const { marks } = studentInfo
    const xValues = Object.keys(marks)
    const yValues = xValues.map((subject) => {
      return marks[subject]
    })
    const data = [
      {
        x: xValues,
        y: yValues,
        type: 'bar',
        mode: 'lines+points',
        marker: {color: 'lightblue'},
      }
    ]
    const layout = {width: 800, height: 400, title: 'Students Marks Bar Chart'}
    this.setState({
      data,
      layout,
    })
  }
  renderStudentDetailsGraph = () => {
    const { studentData, match } = this.props
    const { id } = match.params
    const { data, layout } = this.state
    if(!studentData || (studentData && !studentData[id])) {
      return "Not a Valid student"
    } else if(!data && !layout){
        this.createDataAndLayout(studentData, id)
    }
  }
  render () {
    const { data, layout, studentData } = this.state
    const { match } = this.props
    const { id } = match.params
    if(!studentData) {
      return "Fetching student details"
    }
    const { name, class: classValue, rollNo, totalMarks } = studentData[id]
    return (
      <div>
        <h1>Student Details  Page</h1>
        {this.renderStudentDetailsGraph()}
        {data && layout && 
          <Plot
            data={data}
            layout={layout}
          />
        } 
        {studentData && studentData[id] &&
          <ul>
            <li>Name: {name}</li>
            <li>Class: {classValue}</li>
            <li>Roll No: {rollNo}</li>
            <li>Total Marks: {totalMarks}</li>
          </ul>
        }
      </div>
    )
  }
}

export default Container(StudentDetailsPage)