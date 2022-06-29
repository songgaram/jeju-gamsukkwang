import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Header from "components/header";
import Loader from "components/loader";

const Layout = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div>
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </Suspense>
  );
};

export default Layout;
