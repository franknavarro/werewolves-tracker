import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';
import Filter4Icon from '@material-ui/icons/Filter3';
import { FC, createElement } from 'react';

const Icons = [Filter1Icon, Filter2Icon, Filter3Icon, Filter4Icon];

interface StackIconProps {
  amount: number;
}

const StackIcon: FC<StackIconProps> = ({ amount }) => {
  const iconIndex = amount >= 1 && amount <= 4 ? amount - 1 : 0;
  return createElement(Icons[iconIndex], { fontSize: 'large' });
};

export default StackIcon;
