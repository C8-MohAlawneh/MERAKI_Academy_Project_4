import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";

const AddFriends = () => {
  const { token } = useContext(AppContext);
  useEffect(() => {
    friendProfiles();
  }, []);
  const friendProfiles = () => {
    axios
      .get("http://localhost:5000/users//allProfile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((users) => {
        // console.log(users.data.profile);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  return <></>;
};

export default AddFriends;
