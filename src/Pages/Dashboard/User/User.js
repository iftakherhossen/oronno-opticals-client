import React, { useEffect, useState } from 'react';
import {  TableRow, TableCell, Button, Avatar } from '@mui/material';
import Swal from 'sweetalert2';

const User = ({ user, handleRemove }) => {
     const { _id, displayName, email, userImg } = user;
     const [userOrders, setUserOrders] = useState([]);
     const [adminSuccess, setAdminSuccess] = useState(false);

     useEffect(() => {
          fetch(`https://boiling-spire-70151.herokuapp.com/orders/${email}`)
            .then((res) => res.json())
            .then((data) => setUserOrders(data));
     }, [email]);
  
     const handlePromote = (e, email) => {
          const user = { email };
  
          fetch('https://boiling-spire-70151.herokuapp.com/users/admin', {
               method: 'PUT',
               headers: {
                    'content-type': 'application/json'
               },
               body: JSON.stringify(user)
          })
               .then(res => res.json())
               .then(data => {
                    if (data.modifiedCount) {
                         setAdminSuccess(true);
                    }
               });
  
          e.preventDefault(user)
     }

     adminSuccess && Swal.fire(
          'Done!',
          'Successfully Promoted to Admin',
          'success'
     );

     return (
          <TableRow
               key={_id}
               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
               <TableCell sx={{ pl: 5 }}><Avatar src={userImg} alt={displayName} /></TableCell>
               <TableCell component="th" scope="row" sx={{ fontWeight: "bold", fontSize: 16 }}>{displayName}</TableCell>
               <TableCell sx={{ fontWeight: "bold", fontSize: 16 }}>{email}</TableCell>
               <TableCell sx={{ fontWeight: "bold", fontSize: 16 }}>Order Placed: {userOrders.length}</TableCell>
               <TableCell align="right" sx={{ display: "flex", justifyContent: "space-evenly"}}>
                    <Button onClick={() => handleRemove(_id)}>Remove</Button>
                    <Button onClick={() => handlePromote(email)}>Promote</Button>
               </TableCell>
          </TableRow>
     );
};

export default User;
