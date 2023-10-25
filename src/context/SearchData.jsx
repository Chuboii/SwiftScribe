import {createContext, useState} from "react"

export const SearchDataContext = createContext()

export const SearchDataProvider = ({children}) =>{
  const [searchData, setSearchData] = useState(null)
  const [isSearchBtnClicked, setIsSearchBtnClicked] = useState(false)
  
  const value = {searchData, setSearchData ,isSearchBtnClicked, setIsSearchBtnClicked}
  
  return(
   <SearchDataContext.Provider value={value}>
   {children}
   </SearchDataContext.Provider>
    )
}