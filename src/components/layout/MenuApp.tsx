import * as React from "react";
import Drawer from "@mui/material/Drawer";
import ListMenuApp from "./ListMenuApp";
import Image from "next/image";

interface IToggleDrawer {
  toggleDrawer: () => void;
  openDrawer: boolean;
}

const MenuApp: React.FC<IToggleDrawer> = ({ toggleDrawer, openDrawer }) => {
  return (
    <div>
      <Drawer
        open={openDrawer}
        onClose={toggleDrawer}
        sx={{ zIndex: 101, position: "relative" }}
      >
        <div className="ml-6">
          <Image
            src={"/logo.svg"}
            alt="Logo"
            width={100}
            height={100}
            className="w-3/5 mt-5 h-auto"
          />
        </div>
        <ListMenuApp toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default MenuApp;
