import Image from 'next/image';
import { Badge } from '../ui/badge';

interface BadgeButtonProps {
  title: string;
}

const BadgeButton = ({ title }: BadgeButtonProps) => {
  return (
    <Badge
      variant="secondary"
      className="mb-3 cursor-pointer rounded-[14px] border border-black/10 bg-white text-base md:left-6 ring-1 ring-blue-50 shadow-xl"
    >
      <Image
        src="/trade-brains-logo-official.png"
        alt="Logo"
        height={100}
        width={100}
        className=" mr-2  fill-[#EEBDE0] stroke-1 text-neutral-800"
      />
      {title}
    </Badge>
  );
};

export default BadgeButton;
