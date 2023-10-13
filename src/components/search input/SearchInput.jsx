import './SearchInput.scss'

import SearchIcon from '@mui/icons-material/Search';

import logo from '/src/assets/swiftscribe logo.jpg'
import {ToggleContext} from "/src/context/ToggleContext"
import {useContext, useState} from "react"
import {useNavigate} from "react-router-dom"
import {SearchDataContext} from "../../context/SearchData"

function SearchInput() {
 const navigate = useNavigate()
 const {setSearchData} = useContext(SearchDataContext)
 const [value, setValue] = useState("")
 
 const submitForm = (e) => {
   e.preventDefault()
   setSearchData(value)
   navigate("/search")
   
}
  
const changeValue = (e) =>{
  setValue(e.target.value)
}

    return (
    <form className='homeheader-form' onSubmit={submitForm}>
    <div className="homeheader-search-box">
    <input value={value} type="search" className='homeheader-search-input' name="search swiftscribe" placeholder='Search SwiftScribe' id="search" onChange={changeValue} />
       <button style={{background:"transparent"}} className='homeheader-search-icon'> <SearchIcon/></button>
        </div>
</form>  
  )
}

export default SearchInput