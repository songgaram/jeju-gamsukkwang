import styled from "styled-components";

const ImageUploadBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 442px;
  height: 48px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  transition: 0.8s;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.primary};
  }

  input {
    display: none;
  }
`;

export { ImageUploadBox };
