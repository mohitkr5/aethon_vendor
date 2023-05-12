import { nanoid } from "@reduxjs/toolkit";
import CategoryIcon from "@mui/icons-material/Category";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { IoNewspaperOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { AiOutlineBgColors } from "react-icons/ai";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import HeightIcon from "@mui/icons-material/Height";
import ClassIcon from "@mui/icons-material/Class";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";


export const sidebarElements = [
  {
    name: "Manage",
    icon: <TextSnippetIcon />,
    options: [
      {
        id: nanoid(15),
        title: "Manage Category",
        icon: <ClassIcon />,
        redirect: "/categories",
      },
      {
        id: nanoid(15),
        title: "Manage Sub Category",
        icon: <CategoryIcon />,
        redirect: "/subcategories",
      },
      {
        id: nanoid(15),
        title: "Manage Size",
        icon: <HeightIcon />,
        redirect: "/sizes",
      },
      {
        id: nanoid(15),
        title: "Manage Color",
        icon: <ColorLensIcon />,
        redirect: "/colors",
      },
      {
        id: nanoid(15),
        title: "Manage Coupons",
        icon: <LocalOfferIcon />,
        redirect: "/coupons",
      },
    ],
  },
  {
    name: "Order",
    icon: <MonetizationOnIcon />,
    options: [
      {
        id: nanoid(15),
        title: "All Orders",
        icon: <BadgeIcon />,
        redirect: "/orders",
      },
      {
        id: nanoid(15),
        title: "Pending",
        icon: <BadgeIcon />,
        redirect: "/orders/pending",
      },
      {
        id: nanoid(15),
        title: "Confirmed",
        icon: <BadgeIcon />,
        redirect: "/orders/confirmed",
      },
      {
        id: nanoid(15),
        title: "View Manual Orders",
        icon: <BadgeIcon />,
        redirect: "/orders/manual",
      },
      {
        id: nanoid(15),
        title: "Create Order Manually",
        icon: <AddIcon />,
        redirect: "/orders/create",
      },
    ]
  },
  {
    name: "Products",
    icon: <TextSnippetIcon />,
    options: [
      {
        id: nanoid(15),
        title: "View Products",
        icon: <CategoryIcon />,
        redirect: "/products",
      },
      {
        id: nanoid(15),
        title: "Create Product",
        icon: <AddIcon />,
        redirect: "/products/create",
      },
    ],
  },
];
