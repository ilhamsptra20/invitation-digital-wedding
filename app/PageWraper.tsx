"use client";

import WelcomeSection from "./WelcomeSection";
import { useState} from "react";
import MainSection from "./MainSection";


export default function PageWraper() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
        {!isOpen && (
            <WelcomeSection onOpen={() => setIsOpen(true)} />
        )}

        {isOpen && (
            <MainSection isOpen />
        )}  
    </>
  );
}
