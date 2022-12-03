import React, { FC, Fragment } from "react";
import { useModal } from "@/hooks";
import { Transition, Dialog } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";
import ConditionallyRender from "@/components/common/conditionallyRender/ConditionallyRender";

const Error: FC<{ error: Error }> = ({ error }) => {
  //   const navigate = useNavigate();
  const { closeModal } = useModal(true);

  const handleCloseModal = () => {
    closeModal();
    // navigate("/");
    window.location.reload();
  };
  console.log(Boolean(error.stack));
  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 w-full"
          onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-[max-content] max-w-[max-content] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900">
                    Something went wrong
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-lg font-medium text-red-500">
                      {error.message}
                    </p>
                    <ConditionallyRender
                      condition={Boolean(error.stack)}
                      show={
                        <pre className="text-sm text-gray-500">
                          {error.stack}
                        </pre>
                      }
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={handleCloseModal}>
                      Reload this page!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Error;
