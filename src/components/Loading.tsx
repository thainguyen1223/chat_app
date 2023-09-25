import Image from "next/image";
import styled from "styled-components";
import AvatarLogin from "../assets/images/imagesLogin.jpg";
import CircularProgress from '@mui/material/CircularProgress'


const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`


const StyledImageWrapper = styled.div`
  margin-bottom: 50px;
`;

const Loading = () => {
  return (
    <StyledContainer>
      <StyledImageWrapper>
      <Image
              src={AvatarLogin}
              alt="Whatsapp Logo"
              height={200}
              width={200}
            />
      </StyledImageWrapper>

      <CircularProgress color="inherit" />
    </StyledContainer>
  );
};

export default Loading;
