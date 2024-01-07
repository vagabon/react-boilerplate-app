import { fireEvent, render, screen } from '@testing-library/react';
import { useModal } from './useModal';

const ReactModal = () => {
  const { open, openModal, closeModal } = useModal();
  return (
    <>
      {open && <div>OPEN</div>}
      <button onClick={openModal} />
      <button onClick={closeModal} />
    </>
  );
};

describe('useModal', () => {
  test('Given useModal when is mount with an id Then ', () => {
    render(<ReactModal />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('OPEN')).toBeDefined();
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.queryByText(/OPEN/)).toBeNull();
  });
});
