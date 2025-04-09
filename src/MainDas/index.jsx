import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainDas() {
  const navigate = useNavigate();
  // const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("currentMedCareUser"));
    const isLogedin = isUser ? isUser.isLogedin : false;
    console.log(isLogedin);
    if (isUser) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
    // isUser ? navigate("/dashboard") : navigate("/login");
  }, []);
  return <div></div>;
}

export default MainDas;
