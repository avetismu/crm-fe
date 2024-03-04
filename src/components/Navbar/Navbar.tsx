import { AppBar, Container, Toolbar, Typography } from "@mui/material"

interface NavbarProps {
  
}

const Navbar: React.FC<NavbarProps> = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} align="left">
                    OceanCRM
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar