import React from 'react';
import MiniDrawer from './Drawer';

const MainLayout = ({ children }) => {
  return (
    <div>
      <MiniDrawer>
        <main>{children}</main>
      </MiniDrawer>
    </div>
  );
};

export default MainLayout;
