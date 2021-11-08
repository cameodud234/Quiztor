import React, {useState, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import Post from '../centerComps/PostWin';
import axios from 'axios';


const useStyles = makeStyles( (theme) => ({
      root: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchHidden: {
        display: 'hidden',
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
  })

);

// let globalData = [];

// export function ListPosts(data){
//   const posts = globalData;
//   console.log(`posts: ${posts}`);
//   const postItems = posts.map((post, index)=>{
//       console.log(`post: ${post}, index: ${index}`)
//       return (<li key={index}>
//           <Post data={post} />
//       </li>
//       );
//   });
//   return (
//       <ul>
//           {postItems}
//       </ul>
//   );
// }

// export function SearchBar(props){
//   const classes = useStyles();
//   let [userText, setUserText] = useState();
//   const onChange = async (event) => {
//     userText = await event.target.value;
//   };
//   const onSubmit = async (event) => {
//     console.log(`userText: ${userText}`);
//     event.preventDefault();
//     await axios.get('http://localhost:9000/showQuery',{
//       params: {
//         searchText: userText
//       }
//     })
//     .then((res) => { 
//       let tmp = res.data;
//       globalData = res.data;
//       console.log(globalData);
//     })
//     .catch((err) => console.log(err));
//   }
//   return(
//     <div className={classes.root}>
//       <div className={classes.searchIcon}>
//         <SearchIcon />
//       </div>
//       <form onSubmit={onSubmit}>
//         <InputBase
//           placeholder="Search…"
//           onChange={onChange}
//           name="userQuery"
//           value={userText}
//           classes={{
//             root: classes.inputRoot,
//             input: classes.inputInput,
//           }}
//           inputProps={{ 'aria-label': 'search' }}
//         />
//       </form>
//     </div>
//   );
// }