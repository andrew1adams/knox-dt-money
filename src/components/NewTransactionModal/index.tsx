import Modal from 'react-modal';
import { Container, RadioBox, TransactionTypeContainer } from './style';
import close from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactionsContext';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  const [transactionTitle, setTransactionTitle] = useState('');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionCategory, setTransactionCategory] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title: transactionTitle,
      amount: transactionAmount,
      category: transactionCategory,
      type: transactionType,
    });

    setTransactionTitle('');
    setTransactionAmount(0);
    setTransactionCategory('');
    setTransactionType('deposit');

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={close} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          value={transactionTitle}
          onChange={(e) => setTransactionTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Categoria"
          value={transactionCategory}
          onChange={(e) => setTransactionCategory(e.target.value)}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={transactionType === 'deposit'}
            activeColor="green"
            onClick={() => {
              setTransactionType('deposit');
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isActive={transactionType === 'withdraw'}
            activeColor="red"
            onClick={() => {
              setTransactionType('withdraw');
            }}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
