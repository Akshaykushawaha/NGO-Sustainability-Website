import React, { Dispatch, SetStateAction } from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import styles from "./SidebarContent.module.css";
import CustomScrollbars from "../../util/CustomScrollbars";
import { Link } from "react-router-dom";
import SidebarLogo from "./SidebarLogo";
import { THEME_TYPE_LITE } from "../../constants/ThemeSetting";
import type { RootState } from "../../appRedux/store";
import { ShoppingCartOutlined, HeartOutlined, PictureOutlined, InfoCircleOutlined } from "@ant-design/icons";

type SidebarContentProps = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
};

type MenuItem = {
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  label?: React.ReactNode; // Make label optional
  to?: string; // Make to optional
};

const getItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, to?: string): MenuItem => {
  return {
    key,
    icon,
    label,
    to
  };
};

const items: MenuItem[] = [getItem("View Cart", "1", <ShoppingCartOutlined />, "/view-cart"), getItem("Wishlist", "2", <HeartOutlined />, "/wishlist"), getItem("Gallery", "3", <PictureOutlined />, "/gallery"), getItem("About Us", "4", <InfoCircleOutlined />, "/about-us")];

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }: SidebarContentProps) => {
  const { themeType } = useSelector(({ settings }: RootState) => settings);

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />

      <CustomScrollbars className="gx-layout-sider-scrollbar">
        <Menu style={{ paddingTop: "10px" }} theme={themeType === THEME_TYPE_LITE ? "light" : "dark"} mode="inline" selectedKeys={[]}>
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
            </Menu.Item>
          ))}
        </Menu>
      </CustomScrollbars>
    </>
  );
};

export default SidebarContent;
