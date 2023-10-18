import Skeleton from '@mui/material/Skeleton';

export default function TextBasedLoader(){
  const arr = [0,0,0,0,0,0,0,0,0,0,0]
  return(
   <>
   {
     arr.map((el,id) =>(
  <div key={id} style={{margin:"1rem 0"}}>
<Skeleton variant="circular" animation="wave" width={40} height={40} />
 <Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} />
<Skeleton animation="wave" variant="rectangular" height={60} />
</div>
       ))
   }
   </>
   )
}