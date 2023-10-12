import { Link } from "react-router-dom"
import "./HomeSubHeader.scss"
import AddIcon from '@mui/icons-material/Add';


function HomeSubHeader() {
  return (
      <div className="homesubheader-container">
        <AddIcon/>
          <Link to={'/explore'}>For you</Link>
          <Link to={'/following'}>For you</Link>
      </div>
  )
}

export default HomeSubHeader