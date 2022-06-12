import styled from "styled-components";

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

const InputBox = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 110px;

  label {
    margin: 7px;
    color: ${({ theme }) => theme.colors.black};
    font-size: 12px;
  }

  p {
    margin: 7px 10px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export { RegisterContainer, Title, RegisterForm, InputBox };
