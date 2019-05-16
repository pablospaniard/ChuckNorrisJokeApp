import colors from 'colors'
import styled from '@emotion/styled'

const Input = styled.input`
  padding: 5px 10px;
  border: 3px solid ${colors.blue};
  :focus {
    outline: none;
    border-color: ${colors.green};
  }
`

export default Input
