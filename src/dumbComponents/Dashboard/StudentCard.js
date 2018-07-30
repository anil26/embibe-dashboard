import React from "react"
import { withRouter } from "react-router"
import "./studentcard.css"

class StudentCard extends React.Component {
  onClickCards = (id) => {
    const { history } = this.props
    history.push(`/dashboard/${id}`)
  }
  render() {

    const { student } = this.props
    const { name, class: classValue, rollNo, marks, totalMarks } = student
    return (
      <div className="student-card" onClick={() => {this.onClickCards(rollNo)}}>
        <div>
          <div className="name-section">
              <span>
                  Name: <span>{name}</span>
              </span>
              <span>
                Class: <span>{classValue}</span>
              </span>
          </div>
          <div className="roll-no">Roll No: <span>{rollNo}</span></div>
        </div>
        <div className="mark-section">
          Marks
          <ul className="mark-list">
            {
              Object.keys(marks).map((subject) => {
                return (
                  <li key={subject}>{subject} :  {marks[subject]}</li>
                )
              })
            }
          </ul>
          <div>Total Marks: {totalMarks}</div>
        </div>
      </div>
    )
  }
}
export default withRouter(StudentCard)