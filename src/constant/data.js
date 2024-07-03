import { FaStore } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { HiBuildingOffice } from "react-icons/hi2";
import { MdOutlineApartment } from "react-icons/md";

const category = {
  villa: "ویلا",
  store: "مغازه",
  office: "دفتر",
  apartment: "آپارتمان",
};

const icons = {
  villa: <FaHome />,
  department: <MdOutlineApartment />,
  store: <FaStore />,
  office: <HiBuildingOffice />,
};

export { category, icons };
