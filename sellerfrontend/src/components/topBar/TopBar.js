
import "./topBar.css"
export default function TopBar({openRightBar,setProductOpen,productOpen}) {
  const handleLogout = ()=>{
    localStorage.clear()
    window.location.reload(true);

  }
    
  return (
    <div className="topbarContainer">     
        <h1 className='topbarHeader'>Welcome to Post Panel !</h1>
        <div className="topbarButtons">
        <button className='addProductBtn' onClick={openRightBar}> Add Product</button>  
        <button className="logoutBtn" type="button" onClick={handleLogout} >LogOut</button>  
        </div>
        
    </div>
  );
  
}
