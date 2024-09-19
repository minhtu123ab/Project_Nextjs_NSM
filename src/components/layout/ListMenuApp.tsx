import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import { Box } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ListMenuApp({
  toggleDrawer,
}: {
  toggleDrawer: () => void;
}) {
  const dataListItem = [
    {
      icon: "/Dashboards.svg",
      text: "Dashboards",
      open: true,
      itemChildren: [
        {
          text: "Main",
          path: "/admin/dashboard/main",
        },
        {
          text: "User Insights",
          path: "/admin/dashboard/user-insights",
        },
      ],
    },
    {
      icon: "/Resources.svg",
      text: "Resources",
      open: true,
      itemChildren: [
        {
          text: "Material",
          path: "/admin/resources/material",
        },
        {
          text: "Category",
          path: "/admin/resources/category",
        },
        {
          text: "Supplier",
          path: "/admin/resources/supplier",
        },
      ],
    },
  ];

  const [openData, setOpenData] = React.useState(dataListItem);
  const pathname = usePathname();

  const handleClickOpen = (index: number) => {
    setOpenData((prevMenu) =>
      prevMenu.map((item, i) =>
        i === index ? { ...item, open: !item.open } : item
      )
    );
  };
  return (
    <List
      sx={{
        width: "260px",
        bgcolor: "background.paper",
        color: "#758499",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {openData.map((item, index) => (
        <Box key={index}>
          <ListItemButton
            className="mx-2 rounded-full"
            onClick={() => handleClickOpen(index)}
          >
            <ListItemIcon>
              <Image src={item.icon} width={20} height={20} alt={""} />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                color: "#64748B",
                marginLeft: -3,
                marginTop: "5px",
                fontSize: "18px",
              }}
              primary={item.text}
            />
            {item.open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={item.open} timeout="auto" unmountOnExit>
            {item.itemChildren.map((itemChild, index) => (
              <List component="div" disablePadding key={index}>
                <Link href={itemChild.path}>
                  <ListItemButton
                    onClick={toggleDrawer}
                    sx={{
                      mx: "36px",
                      borderRadius: "9999px",
                      backgroundColor:
                        pathname === itemChild.path ? "#e0f2fe" : "inherit",
                      color:
                        pathname === itemChild.path ? "#0ea5e9" : "inherit",
                      pl: 3,
                    }}
                  >
                    <ListItemText primary={itemChild.text} />
                  </ListItemButton>
                </Link>
              </List>
            ))}
          </Collapse>
        </Box>
      ))}
    </List>
  );
}
