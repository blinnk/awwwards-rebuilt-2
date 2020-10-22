import React from "react";
import Layout from "../components/layout";

//Context
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext';

//Components
import HomeBanner from '../components/homePage/HomeBanner';
import HomeContent from '../components/homePage/homeContent';
import HomeFeatured from '../components/homePage/HomeFeatured';
import HomeAbout from "../components/homePage/HomeAbout";

const IndexPage = props => {
  const { currentTheme, cursorStyles } = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;
    dispatch({
      type: 'CURSOR_TYPE', cursorType: cursorType
    });
  };

  return <Layout>
    <HomeBanner onCursor={onCursor} />
    <HomeContent />
    <HomeFeatured onCursor={onCursor} />
    <HomeAbout onCursor={onCursor} />
  </Layout>;
};

export default IndexPage;
