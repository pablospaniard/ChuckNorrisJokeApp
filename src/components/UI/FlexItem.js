import styled from '@emotion/styled'

export default styled.div`
  flex-direction: ${({ direction }) => direction || 'row'};
  flex: ${({ flex }) => flex || '1 1 auto'};
  display: ${({ display }) => display || 'block'};
  margin: ${({ margin }) => margin || '0 20px'};
`
