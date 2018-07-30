import React from "react"
import "./index.css"

class Searchbar extends React.Component {
  render() {
    const { onSearch, toggleNameSort, toggleTotalMarks } = this.props
    return (
      <div className="search-bar">
        <input 
          className="search-box"
          type="text"
          placeholder="search student"
          onChange={(e) => onSearch(e.target.value)}
        />
        <button onClick={toggleNameSort}>Name Toggle</button>
        <button onClick={toggleTotalMarks}>Marks Toggle</button>
      </div>
    )
  }
}
export default Searchbar