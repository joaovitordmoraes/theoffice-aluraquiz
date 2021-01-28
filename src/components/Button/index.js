/* eslint-disable linebreak-style */
import styled from 'styled-components';

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.button};
    padding: 10px 16px;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    font-weight: 700;
    color: ${({ theme }) => theme.colors.contrastText};
    text-transform: uppercase;
    width: 100%;
    outline: none;
    cursor: pointer;
    transition: all 250ms linear;

    &:disabled {
        background-color: ${({ theme }) => theme.colors.buttonDisabled};
        cursor: not-allowed;

        &:hover,
        &:focus {
            background-color: ${({ theme }) => theme.colors.buttonDisabled};
        }
    }

    &:hover,
    &:focus {
        background-color: ${({ backgroundColor }) => backgroundColor};
        transition: all 250ms linear;
    }
`;

export default Button;
