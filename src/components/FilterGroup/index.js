import Profile from '../Profile'
import './index.css'

const FilterGroup = props => {
  const renderEmploymentTypeList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(type => {
      console.log(type.employmentTypeId)
      const {changeEmploymentType} = props
      const onClickEmploymentType = event => {
        changeEmploymentType(event.target.value)
      }
      return (
        <li key={type.employmentTypeId} className="employeList">
          <input
            id={type.employmentTypeId}
            type="checkbox"
            name={type.label}
            value={type.employmentTypeId}
            onClick={onClickEmploymentType}
          />
          <label className="employee-label" htmlFor={type.employmentTypeId}>
            {type.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentType = () => (
    <div className="employee-type-container">
      <h1 className="employee-head">Type of Employment</h1>
      <ul>{renderEmploymentTypeList()}</ul>
    </div>
  )

  const renderSalaryList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(each => {
      const {changeSalary} = props

      const onClickSalaryType = () => {
        changeSalary(each.salaryRangeId)
      }

      return (
        <li key={each.salaryRangeId} className="salaryList">
          <input
            id={each.salaryRangeId}
            type="radio"
            name="salary"
            onClick={onClickSalaryType}
          />
          <label className="salary-label" htmlFor={each.salaryRangeId}>
            {each.label}
          </label>
        </li>
      )
    })
  }

  const renderSalary = () => (
    <div className="salry-container">
      <h1 className="employee-salary">Salary Range</h1>
      <ul>{renderSalaryList()}</ul>
    </div>
  )
  /* const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  } */

  /* const renderSearchInput = () => {
    const {searchInput} = props

    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }
*/
  return (
    <div className="filter-group-container">
      <Profile />
      {renderEmploymentType()}
      <br />
      {renderSalary()}
    </div>
  )
}

export default FilterGroup
