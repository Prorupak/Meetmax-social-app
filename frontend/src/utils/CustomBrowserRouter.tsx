import { Router } from "react-router-dom";
import React, { useRef, useState, useLayoutEffect, ReactNode, FC } from "react";
import { createBrowserHistory } from "history";

// Can be used to manage navigation state outside of React components
// ex : Redux, Axios interceptors, ...
export const customHistory = createBrowserHistory();

interface ICustomBrowserRouter {
  children: ReactNode;
  basename?: string;
}

export const CustomBrowserRouter: FC<ICustomBrowserRouter> = ({
  basename,
  children,
}) => {
  const historyRef = useRef<
    ReturnType<typeof createBrowserHistory> | undefined
  >();
  if (historyRef.current == null) {
    historyRef.current = customHistory;
  }
  const history = historyRef.current;
  const [state, setState] = useState<any>({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      // eslint-disable-next-line react/no-children-prop
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};
