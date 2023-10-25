import CloseIcon from '@mui/icons-material/Close';
import './EditProfile.scss'
import img from "/src/assets/swiftscribe logo.jpg"
import {db, storage} from "/src/utils/appwrite/appwrite.utils"
import {useState, useEffect, useContext} from "react"
import {UserContext} from "/src/context/UserContext"
import {ToggleContext} from "/src/context/ToggleContext"
import {getDownloadURL, ref, uploadBytesResumable}from "firebase/storage"
import {firebaseStorage} from "/src/utils/firebase/firebase.utils"
import {useNavigate} from "react-router-dom"
import {v4 as uuidv4} from "uuid"
import {updateProfile} from "firebase/auth"
import {auth} from "/src/utils/firebase/firebase.utils"
function getUserDocId() {
  const storage = localStorage.getItem("userDocId")
  return storage ? JSON.parse(storage) : null
}

export default function EditProfile(){
  const { setToggleEdit} = useContext(ToggleContext)
  const {currentUser} = useContext(UserContext)
  const [userInfo, setUserInfo] = useState(null)
  const [userDoc] = useState(getUserDocId)
  const [value, setValue] = useState({
    name: userDoc.displayName,
    bio:userDoc.bio,
    username: userDoc.username
  })
  const [imageUrl, setImageUrl] = useState(null)
  const navigate = useNavigate()
  
  const changeValues = (e) =>{
   // console.log(e.target.value)
    setValue((prevValue) => ({
  ...prevValue,
  [e.target.name]: e.target.value 
}));
//console.log(value.name)
  }
  
  
  const updateUserProfile = async() => {
    if(value.name || value.bio || value.username){
    try{
    const getUserDoc = await db.getDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid)
  //const file = document.querySelector("#edit-image-id").files[0]

 // console.log(imageUrl)
   const mapped = [JSON.parse(getUserDoc.user)].map(el=>{
     return {...el, username: value.username, displayName: value.name, bio: value.bio, photoURL: imageUrl ? imageUrl : currentUser.photoURL}
   })
  // console.log(mapped)
    const updateData = {
      user: [JSON.stringify(mapped[0])]
    
}
//console.log(mapped[0])*/
const res = await updateProfile(auth.currentUser,{
  displayName: value.name,
  photoURL: imageUrl
})
console.log(res)
//localStorage.setItem("currentUser", JSON.stringify(res))

await db.updateDocument("652755cdc76b42b46adb", "652755d73451dcffebde", currentUser.uid, updateData)
   console.log("done")
   
   setToggleEdit(false)
    }
    catch(e){
      console.log(e)
    }
    }
  }
  
  const changeImage = async (e) => {
    const file = e.target.files[0]
  const storageRef = ref(firebaseStorage, `${currentUser.displayName}${uuidv4()}`);

const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setImageUrl(downloadURL)
      console.log('File available at', downloadURL);
    });
  }
);

  }
  
  
  return(
    <>
    <div className="editprofile-container">
    <header className="ep-header">
    <CloseIcon onClick={() => setToggleEdit(false)}/>
    <div className="ep-h-btns">
    <button className="ep-btn" onClick={() => setToggleEdit(false)}> Cancel </button>
     <button className="ep-btn-s" onClick={updateUserProfile}> Save </button>
    </div>
    </header>
    <p className="ep-pinfo"> Profile information</p>
    <div className="ep-profile-box">
    <p style={{marginBottom:".5rem"}}> photo </p>
    <div  className="ep-pro-box">
    <img className="ep-img" src={imageUrl ? imageUrl : currentUser.photoURL}/>
    <div className="ep-pro-sec">
    <div className="ep-pro-upper">
    <p className="ep-pro-btn" > <input onChange={changeImage} type="file" id="edit-image-id" style={{position:"absolute", opacity:"0"}} /> Update </p>
    <p className="ep-pro-btn"> Remove</p>
    </div>
    <div className="ep-pro-lower">
    Recommended Square JPG, PNG or GIF, at least 1000 pixels per side.
    </div>
    </div>
    </div>
    </div>
    
    <div className="ep-name-box"> 

    <div className="ep-name-wrap">
        <p> Name* </p>
     <input value={value.name} onChange={changeValues} name="name" className="ep-name-inp"/>
     <p className="ep-name-p"> Appears on your Profile page, and your byline.
     <span> 11/50</span>
     </p>
     </div>
    <div className="ep-name-wrap">
      <p> Username* </p>
     <input value={value.username} onChange={changeValues} name="username"  className="ep-username-inp"/>
     <p className="ep-name-p"> Appears on your Profile page, as your byline and as your responses.
       <span> 11/50</span>
     </p>
     </div>
    <div className="ep-name-wrap">
        <p> Bio </p>
     <input value={value.bio} onChange={changeValues} name="bio"  className="ep-username-inp"/>
     <p className="ep-name-p"> Appears on your Profile, search pages and suggestions
     <span> 11/150</span>
 </p>
     </div>
    </div>
    </div>
    </>
    )
}