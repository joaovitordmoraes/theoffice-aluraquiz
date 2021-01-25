import styled from 'styled-components'

const Form = styled.form``

Form.Field = styled.input`
    background-color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius};
    color: ${({ theme }) => theme.colors.contrastText};
    padding: 7px 15px;
    margin-bottom: 25px;
    width: 100%;
    outline: none;
`

export default Form