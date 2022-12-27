import React, { useState, useRef, useEffect } from "react";
import { generateToken, getRandomName, randomID } from "./util";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import "./App.css";

const App = () => {
  const myMeeting = useRef();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getData = async () => {
      let { token } = await generateToken(randomID(5), "3523", getRandomName());
      setToken(token);
    };

    getData();
  }, []);

  useEffect(() => {
    if (token && myMeeting.current) {
      const zp = ZegoUIKitPrebuilt.create(token);
      zp.joinRoom({
        container: myMeeting.current,
      });
    }
  }, [token, myMeeting.current]);

  return (
    <div className="meet__container">
      <div ref={myMeeting} id="meet"></div>
    </div>
  );
};

export default App;
