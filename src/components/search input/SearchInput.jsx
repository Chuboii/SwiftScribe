import './SearchInput.scss'
import SearchIcon from '@mui/icons-material/Search';
import logo from '/src/assets/swiftscribe logo.jpg'
function SearchInput() {
  
  
    return (
    <form className='homeheader-form'>
    <div className="homeheader-logo-box">
    <img src={logo} alt="logo" className='homeheader-logo'/>
<p className="homeheader-logo-text">SwiftScribe</p>
    </div>
    <div className="homeheader-search-box">
    <input type="search" className='homeheader-search-input' name="search swiftscribe" placeholder='Search SwiftScribe' id="search" />
        <SearchIcon className='homeheader-search-icon'/>
        </div>
</form>  
  )
}

export default SearchInput