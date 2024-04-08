import React from 'react'
import ImageHome from '../Image/ImageHome'
import styled, { ThemeProvider } from "styled-components";

const darkTheme = {
  bg: "#ffff",
  bgLight: "#FFFFFF",
  primary: "#007AFF",
  secondary: "#9747FF",
  disabled: "#b1b2b3",
  navbar: "#242B3F",
  arrow: "#AFAFB5",
  menu_primary_text: "#F2F3F4",
  menu_secondary_text: "#b1b2b3",
  table_header: "#242445",
  text_primary: "#404040",
  text_secondary: "#4d4c4c",
  card: "#FFFFFF",
  black: "#000000",
  white: "#FFFFFF",
  shadow: "#00000020",
  green: "#00ff6a",
  yellow: "#e8ba00",
  red: "#ef5350",
  orange: "#0F0E0E",
};

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

const ImageWrapper = styled.div`
height:100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 3;
`;


function ImagePage() {
  return (
    <div>
       
       
      <ThemeProvider theme={darkTheme}>
      <ImageContainer>
        <ImageWrapper>
            <ImageHome />
        </ImageWrapper>
      </ImageContainer>
    </ThemeProvider>
    </div>
  )
}

export default ImagePage
