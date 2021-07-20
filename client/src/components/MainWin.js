import React from 'react';
import { mainListItems, secondaryListItems } from "./MenuComps/MenuListItems/SideBarMenuList";

import CenterWin from './centerComps/CenterWin';
import Copyright from './Copyright';
import SearchBar from './MenuComps/SearchBar';
import { profileMenuList, profileMenuListLogIn } from './MenuComps/MenuListItems/ProfileMenuList';

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Box, List } from '@material-ui/core';


const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    grow: {
      flexGrow: 12,
    },
    toolbar: {
      paddingRight: 24,
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      //marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      // display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },  
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.sharp,
        duration: theme.transitions.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      }
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      backgroundColor: '#282c34',
    },
    fixedHeight: {
      height:240,
    },
    container: {
      backgroundColor: '#cfe8fc',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    appBarSpacer: theme.mixins.toolbar,
    searchHidden: {
      display: 'none',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
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
  }));
  




  function MainWin(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(false);
    const [openProfileMenu, setProfileOpenMenu] = React.useState(true);
    const [openMobileMenu, setOpenMobileMenu] = React.useState(true);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorSign_in, setAnchorSign_in] = React.useState(false);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isProfileMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isSignedIn = Boolean(anchorSign_in);

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
      // if(!openMobileMenu){
      //   alert("mobile menu closing");
      // }
    };

    const handleSign_in = (event) => {
      setAnchorSign_in(event.currentTarget);
    }
  
    const menuId = 'primary-search-account-menu';

    const profileMenu = profileMenuListLogIn.map(item => {
      return <MenuItem key={item.toString()} onClick={handleProfileMenuClose}>{item}</MenuItem>
    });

    const loginMenu = profileMenuList.map(item => {
      return <MenuItem onClick={handleProfileMenuClose}>{item}</MenuItem>
    });

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isProfileMenuOpen}
        onClose={handleProfileMenuClose}
      >
        {!auth && loginMenu}
        {auth && profileMenu}
        {/* <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem> */}
        {/* <MenuItem onClick={handleProfileMenuClose}>Signin</MenuItem> */}
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

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.toolbarIcon}>
            
            </div>
            <Typography className={classes.title} variant="h6" noWrap>
              Quiztor
            </Typography>

            <div className={!auth && classes.searchHidden}>
              <SearchBar />
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
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
          }}
          open={openDrawer}
        >
          <div className={classes.toolbarIcon}>
          <IconButton className={classes.toolbarIcon} onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
          </div>

          <Divider />

          <List>{mainListItems}</List>
          <List>{secondaryListItems}</List>
  

        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
            <container className={classes.container}>
              <CenterWin />
            </container>
            <Box>
              <Copyright />
            </Box>
        </main>
        

      </div>
    );
  }

  export default MainWin;