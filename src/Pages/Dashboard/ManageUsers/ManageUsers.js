import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableBody, Paper, Typography} from '@mui/material';
import User from '../User/User';
import Swal from 'sweetalert2';

const ManageUsers = () => {
     const [users, setUsers] = useState([]);

     useEffect(() => {
          fetch('https://boiling-spire-70151.herokuapp.com/users')
               .then(res => res.json())
               .then(data => setUsers(data));
     }, []);

     const handleRemove = id => {
          const url = `https://boiling-spire-70151.herokuapp.com/users/${id}`;
          console.log(id)
     
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                         Swal.fire(
                         'Deleted!',
                         'User has been deleted.',
                         'success'
                         )
                         if (data.deletedCount) {
                              const remaining = users.filter(order => order._id !== id);
                              setUsers(remaining)
                         }
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                         Swal.fire(
                              'Cancelled',
                              'User data is safe :)',
                              'error'
                         )
                    }
                  })
            })
     }

     return (
          <div>
               <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>Manage Users</Typography>

               <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                         <TableBody>                         
                              {
                                   users.map((user) => <User
                                        key={user._id}
                                        user={user}
                                        handleRemove={handleRemove}
                                   />)
                              }
                         </TableBody>
                    </Table>
               </TableContainer>
          </div>
     );
};

export default ManageUsers;