import React, { FC, ReactElement } from 'react';
import RCTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
// types
import {
  TooltipPlacement,
  TooltipTrigger,
} from 'shared-resources/types/Tooltip.type';

interface TooltipProps {
  children: ReactElement;
  text: string;
  arrow?: boolean;
  trigger?: TooltipTrigger[];
  placement?: TooltipPlacement;
  zIndex?: number;
}

const Tooltip: FC<TooltipProps> = ({
  children,
  text,
  arrow,
  trigger,
  placement,
  zIndex,
}) => (
  <RCTooltip
    placement={placement}
    trigger={trigger}
    showArrow={arrow}
    overlay={<span>{text}</span>}
    zIndex={zIndex}
  >
    {children}
  </RCTooltip>
);

export default Tooltip;
