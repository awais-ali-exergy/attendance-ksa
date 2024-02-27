import React, { useState } from 'react';
import { Alert } from 'reactstrap';

function AlertExample(props) {
  const [visible, setVisible] = useState(true);

  const onDismiss = () =>setVisible(false); 

  return (
    <div style={{position:"absolute",
        bottom: "25px",
        left: "25px", overflow:"none"}}>
    <Alert color={props.severity} isOpen={props.isOpen} toggle={(e)=>props.handleCloseAlert(e)}>
     {props.message}
    </Alert>
    </div>
  );
}

export default AlertExample; 