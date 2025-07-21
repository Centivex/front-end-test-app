import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { loadDetailFromCache } from "../storage/Cache";
import { FrontEndTestContext } from "../front-end-test/context/FrontEndTestContext";

export const Navbar = () => {
  const location = useLocation();
  const { cartCount } = useContext(FrontEndTestContext);
  const [modelName, setModelName] = useState(null);

  useEffect(() => {
    const isDetailPage = location.pathname.startsWith("/list/");

    if (isDetailPage) {
      const id = location.pathname.split("/")[2];
      const stateModel = location.state?.model;

      if (stateModel) {
        setModelName(stateModel);
      } else {
        const cached = loadDetailFromCache(id);
        if (cached) {
          setModelName(cached.model);
        }
      }
    } else {
      setModelName(null);
    }
  }, [location]);

  const breadcrumbs = location.pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const path = "/" + array.slice(0, index + 1).join("/");

      const isLast = index === array.length - 1;

      let displayName =
        segment === "list" ? "productos" : segment;

      if (isLast && modelName && segment !== modelName) {
        displayName = modelName;
      }

      return { name: displayName, path };
    });

  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <Link to="/list" className="text-xl font-bold text-blue-600">
        📱 MyPhoneStore
      </Link>

      <div className="text-gray-600 text-sm ml-4 flex-1">
        {breadcrumbs.length > 1 &&
          breadcrumbs.map((crumb, index) => (
            <span key={index}>
              <Link to={crumb.path} className="hover:underline capitalize">
                {crumb.name}
              </Link>
              {index < breadcrumbs.length - 1 && " / "}
            </span>
          ))}
      </div>
      <div className="text-gray-800 font-medium">
        🛒 <span>{cartCount}</span>
      </div>
    </nav>
  );
};
