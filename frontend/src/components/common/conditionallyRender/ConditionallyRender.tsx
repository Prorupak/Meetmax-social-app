import { ReactNode, FC } from "react";

interface IConditionallyRenderProps {
  condition: boolean;
  show: TargetElement;
  elseShow?: TargetElement;
}

type TargetElement =
  | JSX.Element
  | JSX.Element[]
  | RenderFunction
  | ReactNode
  | null;

type RenderFunction = ({}) => JSX.Element;

const ConditionallyRender: FC<IConditionallyRenderProps> = ({
  condition,
  show,
  elseShow,
}): JSX.Element | null => {
  return <div>ConditionallyRender</div>;
};

export default ConditionallyRender;
