import React, { useState } from "react";
import styled from "styled-components";
import Button from './ImageButton'
import TextInput from './ImgTextInput'
import { AutoAwesome } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


  const Form = styled.div`
    flex: 1;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 10%;
    justify-content: center;
    margin-top:-60px
  `;
  const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom:20px
    margin-top:50px;
  `;
  const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
    color: black;
  `;
  const Desc = styled.div`
    font-size: 17px;
    font-weight: 400;
    color:black;
  `;
  const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 12px;
    font-weight: 400;
   
    color: ${({ theme }) => theme.text_secondary};
  `;
  const Actions = styled.div`
    flex: 1;
    display: flex;
    gap: 8px;
    margin-top: 25px;
  `;

 
  const GenerateImageForm = ({
    post,
    setPost,
    setGenerateImageLoading,
    generateImageLoading,
  }) => {

  const [error, setError] = useState("");
  const navigate = useNavigate()
  const generateImageFun = async () => {
    setGenerateImageLoading(true);

    try {
      const response = await axios.post('https://aifusion-project-2.onrender.com/genImg', { prompt: post.prompt })
      console.log('image url: ',response.data.aiImageURL);
      
      setGenerateImageLoading(false);
      setPost({
        ...post,
        photo: `${response?.data?.aiImageURL}`,
      });
    } catch (error) {
        console.log(error);
        setGenerateImageLoading(false);
        
    }
  };


  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>
          Write your prompt according to the image you want to generate!
        </Desc>
      </Top>
      <Body>
        <TextInput 
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image . . . "
          name="name"
          rows="8"
          textArea
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Body>
      <Actions>
        <Button
          text="Generate Image"
          flex
          leftIcon={<AutoAwesome />}
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={() => generateImageFun()}
        />
      </Actions>
      <ToastContainer />
    </Form>
  );
};

export default GenerateImageForm;
