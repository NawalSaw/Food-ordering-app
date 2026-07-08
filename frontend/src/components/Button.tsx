import { Button } from '@/components/ui/button'; 

type Props = {
  children: React.ReactNode
  onClick: () => void;
  className?: string;
};

const BackButton = ({ children, onClick, className}: Props) => {
  return (
    <Button onClick={onClick} className={className}>
      {children}
    </Button>
  );
};

export default BackButton;
