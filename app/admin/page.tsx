import React from "react";
import AddSeedMenuButton from "./_compoents/AddSeedMenuButton";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="h-screen w-full">
      <div className="flex h-full w-full flex-col items-center justify-center bg-red-500">
        <AddSeedMenuButton />
      </div>
    </div>
  );
};

export default page;
