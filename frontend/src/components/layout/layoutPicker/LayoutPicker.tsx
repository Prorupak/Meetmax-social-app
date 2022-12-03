import React, { FC } from "react";
import { ConditionallyRender } from "@/components/common";
import MainLayout from "../mainLayout/Layout";
// import { useWindowSize } from "@/hooks";
import { Outlet } from "react-router-dom";

interface ILayoutPickerProps {
  isStandAlone?: boolean;
}

const LayoutPicker: FC<ILayoutPickerProps> = ({ isStandAlone }) => {
  // const windowSize = useWindowSize();

  return (
    <>
      <ConditionallyRender
        condition={isStandAlone === true}
        show={<Outlet />}
        elseShow={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      />
    </>
  );
};

export default LayoutPicker;
