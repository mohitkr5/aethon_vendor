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
  // {
  //   name: "Employees & Admins",
  //   icon: <TextSnippetIcon />,
  //   options: [
  //     {
  //       id: nanoid(15),
  //       title: "Manage Employees",
  //       icon: <BadgeIcon />,
  //       redirect: "/admin/employees",
  //     },
  //     {
  //       id: nanoid(15),
  //       title: "Add Employee",
  //       icon: <AddIcon />,
  //       redirect: "/admin/employees/add",
  //     },
  //   ],
  // },
  // {
  //   name: "Customers",
  //   icon: <TextSnippetIcon />,
  //   options: [
  //     {
  //       id: nanoid(15),
  //       title: "Manage Customers",
  //       icon: <PersonIcon />,
  //       redirect: "/admin/users",
  //     },
  //     {
  //       id: nanoid(15),
  //       title: "Manage State & Cities",
  //       icon: <PersonIcon />,
  //       redirect: "/admin/statecity",
  //     },
  //     {
  //       id: nanoid(15),
  //       title: "Contact Requests",
  //       icon: <PersonIcon />,
  //       redirect: "/admin/users/contactrequests",
  //     },
  //   ],
  // },
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
      // {
      //   id: nanoid(15),
      //   title: "Manage Brands",
      //   icon: <BrandingWatermarkIcon />,
      //   redirect: "/brands",
      // },
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
      // {
      //   id: nanoid(15),
      //   title: "Manage Coupons",
      //   icon: <LocalOfferIcon />,
      //   redirect: "/coupons",
      // },
    ],
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

  // {
  //   name: "Vendors",
  //   icon: <TextSnippetIcon />,
  //   options: [
  //     {
  //       id: nanoid(15),
  //       title: "Manage Enquiries",
  //       icon: <QuestionAnswerIcon />,
  //       redirect: "/vendor/enquiry",
  //     },
  //     {
  //       id: nanoid(15),
  //       title: "Manage Registrations",
  //       icon: <HowToRegIcon />,
  //       redirect: "/vendor/registration",
  //     },
  //     {
  //       id: nanoid(15),
  //       title: "Manage Permissions",
  //       icon: <QuestionAnswerIcon />,
  //       redirect: "/vendor/role"
  //     }
  //   ],
  // },
];
