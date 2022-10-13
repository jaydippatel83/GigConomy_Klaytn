import React, { useEffect } from "react";
import Logo from "../components/Logo";
import Button from "@mui/material/Button";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Web3ModalContext } from "../context/Web3Modal";
import worldID from "@worldcoin/id";
import AccountPopover from "src/layouts/dashboard/AccountPopover";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function LendingHeader() {
  const navigate = useNavigate();
  const web3ModalContext = React.useContext(Web3ModalContext);
  const { connectWallet, account } = web3ModalContext;
  const { authenticate, user, isAuthenticated } = useMoralis();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => { }, [user]);
 
  const dashboard = () => {
    if (isAuthenticated && user) {
      navigate("/dashboard/app");
    } else {
      toast.info("Please Connect the wallet!");
    }
  };

  return (
    <AppBar position="static" color="transparent">
    <Container  sx={{ maxWidth: {md:'lg', lg: 'xl', xl: 'xl', xxl: 'xxl' },padding: {md:'0 4%', lg: '0 4%', xl: '0 4%', xxl: '0 4%' } }}>
      <Toolbar disableGutters>
        <Logo />
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
        <Box sx={{ flexGrow: 0 ,display:'flex'}}> 

            {user == null ? (
              <Button
                variant="contained"
                onClick={async () => {
                  try {
                    await connectWallet();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Connect
              </Button>
            ) : (
              <>
                <Button onClick={() => dashboard()}>Dashboard</Button>
                &nbsp;
                <div className="d-flex justify-around">
                  <AccountPopover />
                  <p style={{ color: "black", textOverflow: "ellipsis", margin: '0 10px', alignSelf: 'center' }}>
                    {user && user.attributes.username}
                  </p>
                </div>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
