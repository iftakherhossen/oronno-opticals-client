import { Backdrop, Fade, Grid, Modal, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from 'react';
import SearchBar from "material-ui-search-bar";
import SingleItem from "../SingleItem/SingleItem";

const style = {
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     width: 800,
     bgcolor: '#eee',
     boxShadow: 24,
     p: 4,
     textAlign: 'center',
     borderRadius: 1,
};

const SearchModal = ({ products, openSearchModal, handleCloseSearchModal }) => {
     const [items, setItems] = useState(products);
     const [search, setSearch] = useState('');

     const requestSearch = (searchedValue) => {
          const filteredItems = products.filter((item) => {
               return item.title.toLowerCase().includes(searchedValue.toLowerCase());               
          });
          setItems(filteredItems);
     };

     const cancelSearch = () => {
          setSearch("");
          requestSearch(search);
     };

     const shuffleArray = array => {
          let i = array.length - 1;
          for (; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              const temp = array[i];
              array[i] = array[j];
              array[j] = temp;
          }
          return array;
      }
  
      const shuffledItems = shuffleArray(items);

     return (
          <Box>
               <Modal
                    open={openSearchModal}
                    onClose={handleCloseSearchModal}
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                         timeout: 500,
                    }}
               >
                    <Fade in={openSearchModal}>
                         <Box sx={style}>                              
                              <Box sx={{ px:5 }}>
                                   <form>
                                        <SearchBar
                                             value={search}
                                             onChange={(searchedValue) => requestSearch(searchedValue)}
                                             onCancelSearch={() => cancelSearch()}
                                             placeholder="Search Products..."
                                             style={{ borderRadius: 10 }}
                                        />                                     
                                   </form> 
                              </Box>
                              <Toolbar />                          
                              <Box>    
                                   <Grid container>                                        
                                        {
                                             search === '' ? shuffledItems.slice(0, 4).map((item) => <SingleItem 
                                                  key={item._id}
                                                  item={item}                                         
                                             />) : items.map((item) => <SingleItem 
                                                  key={item._id}
                                                  item={item}
                                             />)
                                        }
                                   </Grid>
                              </Box>
                         </Box>
                    </Fade>
               </Modal>
          </Box>
     );
};

export default SearchModal;
