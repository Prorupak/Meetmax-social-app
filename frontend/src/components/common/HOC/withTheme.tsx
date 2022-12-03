import React from "react";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/app/store/store";

interface IInjectedProps {
  theme: string;
  [prop: string]: any;
}

const withTheme = <P extends IInjectedProps>(
  Component: React.ComponentType<P>,
) => {
  return (props: Pick<P, Exclude<keyof P, keyof IInjectedProps>>) => {
    const theme = useAppSelector(
      ({ root }: RootState) => root.preference.theme,
    );

    console.log("withTheme", theme);

    return <Component {...(props as P)} theme={theme} />;
  };
};

export default withTheme;
