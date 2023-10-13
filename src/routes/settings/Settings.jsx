import "./Settings.scss"
import img from "/src/assets/swiftscribe logo.jpg"
export default function Settings(){
  
  return (
    <>
    <div className="settings-container">
    <h1 className="setting-h1"> Settings</h1>
    <div className="setting-item"> 
    <div className="setting-txt-box">
<p className="setting-txt"> Email Address </p>
<p className="setting-txt-t">favoronyechere@gmail.com  </p>
</div>
    <div className="setting-txt-box">
<p className="setting-txt">Username </p>
<p className="setting-txt-tt"> @chuboi </p>
</div>
<div className="setting-public">
<div className="setting-pub-text-box">
<p className="setting-pub-txt"> Public Information</p>
<p className="setting-pub-edit"> Edit your photo, email, bio, etc</p>
</div>
<div className="setting-pub-user">
<p className="setting-pub-name"> Joe Doe </p>
<img src={img} className="setting-pub-img" />
</div>
</div>

<div className="setting-disable">
<p className="setting-d-txt"> Deactivate account</p>
<p className="setting-d-t">Deactivating will suspend your account until you sign back in. </p>
</div>


<div className="setting-delete">
<p className="setting-d-txt"> Deactivate account</p>
<p className="setting-d-t">Permanently delete your account and all of your content.</p>
</div>
</div>
    </div>
    </>
    )
}