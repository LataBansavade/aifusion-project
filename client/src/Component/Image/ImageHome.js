import React, { useState } from "react";
import styled from "styled-components";
import GenerateImageForm from "./GenerateImageForm";
import GeneratedImageCard from "./GeneratedImageCard";
import Navbar from '../Navbar/Navbar'

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.bg};
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  
  @media (max-width: 908px) {
    padding: 16px 10px;
    gap: 20px;
    
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  gap: 10%;
  display: flex;
  padding:20px 150px;
  justify-content: center;
  margin-top:120px;
  @media (max-width: 1108px) {
    flex-direction: column;
    padding:0px 0px;
    margin-top:5px;
    scale:0.8
    
  },
  @media (max-width: 908px) {
    flex-direction: column;
    padding:20px 0px;
    margin-top:-0px;
    scale:0.9
    
  }
`;

function ImageHome() {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  return (
    <Container>
       <Navbar />
      <Wrapper>
       
        <GenerateImageForm
          post={post}
          setPost={setPost}
          setGenerateImageLoading={setGenerateImageLoading}
          generateImageLoading={generateImageLoading}
        />
        <GeneratedImageCard src={post?.photo} loading={generateImageLoading} />
      </Wrapper>
    </Container>
  );
}

export default ImageHome
