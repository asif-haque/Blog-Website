import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const Loading = ({ loading }) => {
  const [load, setLoad] = useState(false);

  // whenever loading comes true, we wish to show the loading page for at least 2 sec
  useEffect(() => {
    console.log(1);
    if (loading) {
      setLoad(true);
    }
    const loadTimer = setTimeout(() => {
      setLoad(false);
    }, 2 * 1000);
    return () => clearTimeout(loadTimer);
  }, [loading]);

  return (
    (load || loading) && (
      <div className="fixed w-full h-[100vh] z-[100] bg-white flex justify-center items-center">
        <HashLoader color="#1f2937" />
      </div>
    )
  );
};

export default Loading;
