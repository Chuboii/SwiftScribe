import { Link } from "react-router-dom"
import "./HomeSubHeader.scss"
import AddIcon from '@mui/icons-material/Add';


function HomeSubHeader({pos, t}) {
  return (
    <>
      <div className="homesubheader-container" style={{ position: pos,top:`${t}rem`}}>
      <Link  className="homesubheader-link" to={'/following/suggestions'}> <AddIcon/></Link> 
          <Link className="homesubheader-link" to={'/'}>For you</Link>
      <Link className="homesubheader-link" to={'/following'}>Following</Link>

    </div>
  
    </>
  )
}

export default HomeSubHeader