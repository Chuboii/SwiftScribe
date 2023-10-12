import { Link } from "react-router-dom"
import "./HomeSubHeader.scss"
import AddIcon from '@mui/icons-material/Add';


function HomeSubHeader() {
  return (
      <div className="homesubheader-container">
      <Link  className="homesubheader-link" to={'/suggestions'}> <AddIcon/></Link> 
          <Link className="homesubheader-link" to={'/explore'}>For you</Link>
      <Link className="homesubheader-link" to={'/following'}>Following</Link>

    </div>
  )
}

export default HomeSubHeader