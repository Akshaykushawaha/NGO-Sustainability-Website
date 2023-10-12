import React, { useState } from "react";
import { Layout, Card, Avatar, Button, Divider } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { message } from "antd";
import styles from "./Gallery.module.css";
import Topbar from "../Topbar";
import AppSidebar from "./AppSidebar";
import { NAV_STYLE_ABOVE_HEADER, NAV_STYLE_BELOW_HEADER, NAV_STYLE_DARK_HORIZONTAL, NAV_STYLE_DEFAULT_HORIZONTAL, NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_INSIDE_HEADER_HORIZONTAL, NAV_STYLE_MINI_SIDEBAR } from "../../constants/ThemeSetting";
import type { RootState } from "../../appRedux/store";

const { Content, Footer } = Layout;
const { Meta } = Card;

const getContainerClass = (navStyle: string) => {
  switch (navStyle) {
    case NAV_STYLE_DARK_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_DEFAULT_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
      return "gx-container-wrap";
    case NAV_STYLE_BELOW_HEADER:
      return "gx-container-wrap";
    case NAV_STYLE_ABOVE_HEADER:
      return "gx-container-wrap";
    default:
      return "";
  }
};

const getNavStyles = (navStyle: string) => {
  switch (navStyle) {
    case NAV_STYLE_FIXED:
      return <Topbar />;
    case NAV_STYLE_DRAWER:
      return <Topbar />;
    case NAV_STYLE_MINI_SIDEBAR:
      return <Topbar />;

    default:
      return null;
  }
};

const Gallery = () => {
  // STATE
  const { navStyle } = useSelector(({ settings }: RootState) => settings);

  // Wishlist items (dummy data for demonstration)
  const wishlistItems = [
    { id: 1, name: " Product 1", imageUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" },
    { id: 2, name: " Product 2", imageUrl: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" }
    // Add more wishlist items here
  ];

  // HANDLERS
  const handleCart = () => {
    // Handle adding to the cart
    message.info("Added to Cart!");
    console.log("Add to cart clicked!!");
  };

  return (
    <>
      <Layout className="gx-app-layout">
        <AppSidebar navStyle={navStyle} />
        <Layout>
          {getNavStyles(navStyle)}
          <Content className={`gx-layout-content ${getContainerClass(navStyle)} `}>
            <Divider orientation="center">
              <h1>Your WishList 💕</h1>
            </Divider>
            <div className="wishlist-container">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="wishlist-item">
                  <div className="wishlist-item-content">
                    <Avatar size={64} src={item.imageUrl} />
                    <div className="wishlist-details">
                      <Meta title={item.name} />
                      <Button icon={<ShoppingCartOutlined />} onClick={handleCart}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <Footer>
              <div className="gx-layout-footer-content">
                <div>
                  © SevaSahayog (company). {new Date().getFullYear()}-{(new Date().getFullYear() + 1).toString().slice(2)}
                </div>
              </div>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Gallery;
