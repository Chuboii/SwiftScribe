import {createContext, useState} from "react"

export const SearchDataContext = createContext()

export const SearchDataProvider = ({children}) =>{
  const [searchData, setSearchData] = useState(null)
  
  const value = {searchData, setSearchData}
  
  return(
   <SearchDataContext.Provider value={value}>
   {children}
   </SearchDataContext.Provider>
    )
}