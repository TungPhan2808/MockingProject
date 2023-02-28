import React, { FC } from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { StyledNavbar, Logo, Account, Cart, Search, InnerStyle } from './Navbar.styled';
import image from '~/assets/react.svg';
import { useAuth } from '../../../components/Authentication/auth';
import { NavLink } from 'react-router-dom';
const Navbar: FC = () => {
    const auth = useAuth();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);
    return (
        <StyledNavbar>
            <InnerStyle>
                <NavLink to="/">
                    <Logo src={image} alt="Logo" />
                </NavLink>
                <Search>
                    <form className="searchForm">
                        <button title="search" className="searchButton">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <input type="text" placeholder="Search here" />
                    </form>
                </Search>
                <Cart>
                    <i className="fa-solid fa-cart-shopping fa-lg"></i>
                </Cart>

                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    variant="contained"
                    sx={{ height: '4rem', borderRadius: '5rem', backgroundColor: '#99B898' }}
                    onClick={handleToggle}
                >
                    <i className="fa-solid fa-user fa-lg"></i>
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <NavLink to="/profile">Profile</NavLink>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        {!auth?.user ? (
                                            <MenuItem onClick={handleClose}>
                                                <NavLink to="/login">Login</NavLink>
                                            </MenuItem>
                                        ) : null}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </InnerStyle>
        </StyledNavbar>
    );
};

export default Navbar;
