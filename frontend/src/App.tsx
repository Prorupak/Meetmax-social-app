import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "@/components/common";
import Homepage from "@/components/home/Homepage";

const App = () => {
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <main>
        <Navbar />
        <Routes>
          <Route path="*" element={<Homepage />} />
        </Routes>
      </main>
    </Suspense>
  );
};

export default App;
