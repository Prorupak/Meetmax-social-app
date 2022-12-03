import React, { ReactNode } from "react";

interface IConditionallyRenderProps {
  condition: boolean;
  show: TargetElement;
  elseShow?: TargetElement;
}

type TargetElement =
  | JSX.Element
  | JSX.Element[]
  | RenderFunc
  | ReactNode
  | null;

type RenderFunc = () => JSX.Element;

const ConditionallyRender = ({
  condition,
  show,
  elseShow,
}: IConditionallyRenderProps): JSX.Element | null => {
  const handleIncomingRenderFunc = (
    renderIncomingFunc: RenderFunc,
  ): JSX.Element | null => {
    const resultFunc = renderIncomingFunc();
    if (!resultFunc) {
      console.warn(
        "Noting was returned from the render function, please check if you're returning a React Component",
      );
      return null;
    }
    return resultFunc;
  };

  const isFunc = (param: TargetElement): boolean => {
    return typeof param === "function";
  };

  if (condition) {
    console.log("show", condition);
    if (isFunc(show)) {
      return handleIncomingRenderFunc(show as RenderFunc);
    }
    return show as JSX.Element;
  }
  if (!condition && elseShow) {
    if (isFunc(elseShow)) {
      console.log("elseShow", isFunc(elseShow));
      return handleIncomingRenderFunc(elseShow as RenderFunc);
    }

    return elseShow as JSX.Element;
  }

  return null;
};

export default React.memo(ConditionallyRender);
