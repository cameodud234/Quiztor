import React, { useEffect } from 'react';
import clsx from 'clsx';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import { MenuItem } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import SignInPopUp from './centerComps/SignInPopUp';
import SignUpPopUp from './centerComps/SignUpPopUp';
// import { SearchBar, ListPosts } from './MenuComps/SearchBar';
import Copyright from './Copyright';
// import ProfileMenuList from './menuComps/menuListItems/ProfileMenuList';
import Post from './centerComps/PostWin';
import HomeWin from './centerComps/HomeWin';
import axios from 'axios';

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    color: "default",
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  searchBase: {
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
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchRoot: {
    color: 'inherit',
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  dataFeed_UL: {
    paddingLeft: 0,
    listStyle: 'none',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    // display: 'none',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuButtonHide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#282c34',
    flexGrow: 1,
    overflow: 'auto',
    
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  innerContent: {
    flexDirection: "row",
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  searchHidden: {
    display: 'none',
  },
  importList: {
    display: 'none',
  }
}));

function MainWin(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  // we need the state 'auth' to depend on the backend 
  let [auth, setAuth] = React.useState(props.authVal);

  // searchbox input
  let [userText, setUserText] = React.useState();

  // Queried user data state
  let [userData, setUserData] = React.useState({posts: [], isFetching: false});


  const [toggleSignInPop, setToggleSignInPop] = React.useState(false);
  const [toggleSignUpPop, setToggleSignUpPop] = React.useState(false);
  const [openProfileMenu, setProfileOpenMenu] = React.useState(true);
  const [openMobileMenu, setOpenMobileMenu] = React.useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isProfileMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleDrawerOpen = () => {
    setOpenDrawer(true);
    console.log("drawer open");
  }

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    console.log("drawer close");
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setProfileOpenMenu(true);
    console.log("profile menu open");
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
    setProfileOpenMenu(false);
    console.log("profile menu close");
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    setOpenMobileMenu(true);
    console.log("mobile menu open");
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    setOpenMobileMenu(false);
    console.log("mobile menu close");
  };

  const sleep = (ms) => new Promise(
    (r) => setTimeout(r, ms)
  );

  const handleSignInOpen = async () => {
    console.log("Sign in window opening now");
    handleProfileMenuClose();
    await sleep(400);
    // setAnchorEl(event.currentTarget);
    setToggleSignInPop(true);
  };

  const handleSignInClose = async () => {
    console.log("Sign in window closing now");
    handleProfileMenuClose();
    setToggleSignInPop(false);
  }

  const handleSignUpOpen = async () => {
    console.log("Sign up window opening now");
    handleProfileMenuClose();
    await sleep(400);
    setToggleSignUpPop(true);
  }

  const handleSignUpClose = async () => {
    console.log("Sign up window closing now");
    handleProfileMenuClose();
    setToggleSignUpPop(false);
  }

  const handleSignIn = async () => {
    console.log("Sign in info inputed");
    handleProfileMenuClose();
    setOpenDrawer(false);
    await sleep(800);
    {/* handle sign-in api here to Express */}
    // setAuth(true);
  }

  const handleSignUp = async () => {
    console.log("Sign up info inputed");
    handleProfileMenuClose();
    setOpenDrawer(false);
    await sleep(800);
    {/* handle sign-up api here to Express */}
  };

  const handleSignOut = async () => {
    console.log("handleSignOut pressed");
    handleProfileMenuClose();
    setOpenDrawer(false);
    await sleep(800);
    {/* handle backend services before signing out here */}
    setAuth(false);
  }

  const handleProfileBtn = () => {
    console.log("handleProfileBtn pressed");
    handleProfileMenuClose();
  };

  const handleMyAccountBtn = () => {
    console.log("handleMyAccountBtn pressed");
    handleProfileMenuClose();
  };

  const onSearchChange = async (event) => {
    userText = await event.target.value;
  };

  const onSearchSubmit = async (event) => {
    console.log(`userText: ${userText}`);
    event.preventDefault();
    let tmp = [];
    setUserData({posts:[], isFetching: true});
    await axios.get('http://localhost:9000/showQuery',{
      params: {
        searchText: userText
      }
    }).then(res => {
      tmp = res.data;
      console.log(res);
    })
    .catch((err) => console.log(err));
    setUserData({posts: tmp, isFetching: false});
  }

  const profileMenuList = [
    { content: "Sign In", onClick: handleSignInOpen },
    { content: "Sign Up", onClick: handleSignUpOpen }
  ];

  const profileMenuListLogIn = [
    { content: "Profile", onClick: handleProfileBtn },
    { content: "My Account", onClick: handleMyAccountBtn },
    { content: "Sign Out", onClick: handleSignOut }
  ];

  const profileMenu = profileMenuListLogIn.map(item => {
    return <MenuItem
        key={item.content.toString()}
        onClick={item.onClick}
    >
        {item.content}
    </MenuItem>
  });

  const loginMenu = profileMenuList.map(item => {
    return <MenuItem
        key={item.content.toString()}
        onClick={item.onClick}
    >
        {item.content}
    </MenuItem>
  });

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      
      {!auth && loginMenu}
      {auth && profileMenu}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      {auth && (
        <div>
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={props.mail_count} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={props.notify_count} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
        </div>
      )}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <CssBaseline />
      <AppBar
        position="sticky"
        className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, openDrawer && classes.menuButtonHide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Quiztor
          </Typography>

          <div className={clsx(!auth && classes.searchHidden)}>

            <div className={classes.searchBase}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={onSearchSubmit}>
                <InputBase
                  placeholder="Search…"
                  onChange={onSearchChange}
                  name="userQuery"
                  value={userText}
                  classes={{
                    root: classes.searchRoot,
                    input: classes.searchInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </form>
            </div>

          </div>

          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            {auth && (
              <div>
                <IconButton aria-label="mailCount" color="inherit">
                  <Badge badgeContent={props.mail_count} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="notifyCount" color="inherit">
                  <Badge badgeContent={props.notify_count} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </div>
            )}

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      {renderMenu}


      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={openDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, openDrawer && classes.contentShift)}
      >
        {/* <div className={classes.drawerHeader}/> */}
        
        < SignUpPopUp open={toggleSignUpPop} handleClose={handleSignUpClose} />
        < SignInPopUp open={toggleSignInPop} handleClose={handleSignInClose} />
        
        <div className={clsx(auth && classes.importList)}>
          < HomeWin />
        </div>
        
        <div className={clsx(!auth && classes.importList)}>
          {userData.posts.map((val)=>{
            console.log(val.title);
            return(
              <ul className={classes.dataFeed_UL}>
                <li>
                  <Post title={val.title} description={val.description} m_text={val.meme_text} />
                </li>
              </ul>
            );
          })}
        </div>

        <Copyright />
      </main>
    </div>
  );
}

export default MainWin;
