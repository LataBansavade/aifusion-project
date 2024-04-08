import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { DownloadRounded } from "@mui/icons-material";
import { saveAs } from 'file-saver';

const Container = styled.div`
  flex: 1;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-shadow:0px 0px 3px 1px gray;
  color: ${({ theme }) => theme.arrow + 80};
  border-radius: 20px;
  margin-top:-70px;
  `;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 24px;
  background: ${({ theme }) => theme.black + 50};
`;

const GeneratedImageCard = ({ src, loading }) => {
  return (
    <Container>
      {loading ? (
        <>
          <CircularProgress
            style={{ color: "black", width: "24px", height: "24px" }}
          />
          Generating Your Image ...
        </>
      ) : (
        <>
        
          {src ? <Image src={src} /> : <>Write a prompt to generate image </>}
          {
          src && (
            <DownloadRounded
                  onClick={()=>saveAs(src, 'aiImage.jpg')}
              />
          )
        }
        </>
      )}
    </Container>
  );
};

export default GeneratedImageCard;
