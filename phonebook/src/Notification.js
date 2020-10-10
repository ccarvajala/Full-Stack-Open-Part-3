import React from "react";

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    else if(message === "success"){
        return (
            <div className="success">
                {message}
            </div>
            )
    }

    else {return (
    <div className="error">
        {message}
    </div>
    )
    
  }
}

  export default Notification;