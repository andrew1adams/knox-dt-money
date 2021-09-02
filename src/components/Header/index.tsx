import logo from '../../assets/logo.svg';
import { Container, Content } from './style';

interface HeaderProps {
  onOpenNewtransactionModal: () => void
}

export function Header({onOpenNewtransactionModal}: HeaderProps) {

  return (
    <Container>
      <Content>
        <img alt="knox money" src={logo} />
        <button type="button" onClick={onOpenNewtransactionModal}>
          Nova Transação
        </button>
        
      </Content>
    </Container>
  );
}
