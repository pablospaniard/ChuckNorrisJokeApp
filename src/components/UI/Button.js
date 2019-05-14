import styled from '@emotion/styled'
import colors from 'colors'

const StyledButton = styled.button`
  font-size: 1rem;
  padding: 5px 10px;
  background-color: ${colors.blue};
  color: ${colors.white};
  :hover {
    cursor: pointer;
  }
  :disabled {
    cursor: not-allowed;
  }
  :active {
    filter: brightness(85%);
  }
  :focus {
    outline: none;
  }
`

export default StyledButton
