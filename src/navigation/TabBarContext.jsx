import React, { createContext, useContext, useState } from 'react';

const TabBarContext = createContext();

export const TabBarProvider = ({ children }) => {
  const [tabBarStyle, setTabBarStyle] = useState({
    display: 'block',
  });

  const updateTabBarStyle = (newStyle) => {
    setTabBarStyle((prevStyle) => ({
      ...prevStyle,
      ...newStyle,
    }));
  };

  return (
    <TabBarContext.Provider value={{ tabBarStyle, updateTabBarStyle }}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => {
  return useContext(TabBarContext);
};