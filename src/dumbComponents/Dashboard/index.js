import React from "react"
import Cookies from "js-cookie"
import Container from "components/Dashboard/index"
import StudentCard from "./StudentCard"
import Searchbar from "dumbComponents/SearchBar/index"

import "./index.css"

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      filteredData: {},
      studentData: null,
      orderName: "ASC",
      orderMarks: "ASC",
      activeSort: "",
    }
  }
  componentDidMount() {
    const { history, getStudentData } = this.props
    const isLoggedInAlready = Cookies.get("access-token")
    if (!isLoggedInAlready) {
      history.push("/")
    } else {
      getStudentData()
    }
  }
  static getDerivedStateFromProps(props, state) {
    if(props.studentData && !state.studentData) {
      return {
        ...state,
        studentData: props.studentData,
        filteredData: props.studentData,
      }
    }
    return null
  }
  sort = (filteredData, order, field) => {
    debugger
    const sortedArr = Object.keys(filteredData).sort((a, b) => {
      console.log("filtereddata" ,filteredData[a][field], filteredData[b][field])
      if(order === "DESC") {
        if(filteredData[a][field] > filteredData[b][field]) return -1
        if(filteredData[a][field] < filteredData[b][field]) return 1
        return 0
      } 
      if(filteredData[a][field] > filteredData[b][field]) return 1
      if(filteredData[a][field] < filteredData[b][field]) return -1
      return 0
      })
    console.log("sortedArr", sortedArr)
     return sortedArr
  }
  createStudentsCard = () => {
    //const { studentData } = this.props
    const { filteredData } = this.state
    if(!filteredData) {
      return null
    }
    const { orderName, orderMarks, activeSort } = this.state
    let sortedArr = Object.keys(filteredData)
    debugger
    if(activeSort === "name") {
      sortedArr = this.sort(filteredData, orderName, "name")
    } else if (activeSort === "marks") {
      sortedArr = this.sort(filteredData, orderMarks, "totalMarks")
    }
    return (
      sortedArr.map((rollNo) => {
        const { rollNo: key } = filteredData[rollNo]
        return <StudentCard key={key} student={filteredData[rollNo]} />
      })
    )
  }
  
  onSearch = (searchString) => {
    const { studentData } = this.props
    const filteredData = Object.keys(studentData).reduce((acc, rollNo) => {
      const { name } = studentData[rollNo]
      const nameLowerCase = name.toLowerCase()
      const searchStringLowerCase = searchString.toLowerCase()
      if(nameLowerCase.startsWith(searchStringLowerCase)) {
          acc[rollNo] = studentData[rollNo]
      }
      return acc
    },{})
    this.setState({
      filteredData,
    })
    
  }

  toggleNameSort = () => {
    const { orderName } = this.state
    this.setState({
      orderName: orderName === "ASC" ? "DESC" : "ASC",
      activeSort: "name"
    })
  }
  toggleTotalMarks = () => {
    const { orderMarks } = this.state
    this.setState({
      orderMarks: orderMarks === "ASC" ? "DESC" : "ASC",
      activeSort: "marks"
    })
  }
  render() {
    const { studentData } = this.state
    if(!studentData) {
      return "Wait , Fetching Results"
    }
    return (
      <div className="dashboard">
        <Searchbar 
          onSearch={this.onSearch}
          toggleNameSort={this.toggleNameSort}
          toggleTotalMarks={this.toggleTotalMarks}
        />
        <div className="student-cards-container">
          {this.createStudentsCard()}
        </div>
      </div>
    )
  }
}

export default Container(Dashboard)