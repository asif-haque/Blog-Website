import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

const Loading = ({ loading }) => {
  const [load, setLoad] = useState(false);

  const { isDark } = useSelector((state) => state.theme);

  // whenever loading comes true, we wish to show the loading page for at least 2 sec
  useEffect(() => {
    if (loading) {
      setLoad(true);
    }
    const loadTimer = setTimeout(() => {
      setLoad(false);
    }, 3 * 1000);
    return () => clearTimeout(loadTimer);
  }, []);

  return (
    (load || loading) && (
      <div className="fixed w-full h-[100vh] z-[100] bg-transparent backdrop-blur-lg flex justify-center items-center">
        <HashLoader color={isDark ? `#fff` : `#1f2937`} />
      </div>
    )
  );
};

export default Loading;
