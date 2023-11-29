import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import Hero from "../../components/User/Hero/Hero";
import Offers from "../../components/User/Offers/Offers";
import NewCollections from "../../components/User/NewCollections/NewCollections";
import FlashCard from "../../components/User/FlashCard/FlashCard";




const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (

    <div className='container'>
      <Hero/>
      <div id="sale">
        <FlashCard />
      </div>
      <Offers/>
      <div id="new">
        <NewCollections/>
      </div>
    </div>

  );
};

export default Home;