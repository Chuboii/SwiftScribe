import Skeleton from '@mui/material/Skeleton';

export default function TextBasedLoader(){
  const arr = [0,0,0,0,0,0,0,0,0,0,0]
  return(
   <>
   {
     arr.map(el =>(
       <Skeleton sx={{marginTop:".5rem"}} animation="wave"/>
       ))
   }
   </>
   )
}