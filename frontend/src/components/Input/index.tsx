import styled from 'styled-components'
import { PropsInput } from '../../types/Style'

const Input = styled.input<PropsInput>`
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  border: 1px solid;
  width: ${(props) => (props.width ? props.width : '-webkit-fill-available;')};
  border-radius: 3px;
  padding: ${(props) => props.size || '1rem'};
`

export default Input
