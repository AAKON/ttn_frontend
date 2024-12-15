import React from "react";
import Previews from "./components/ImageUploader";

const Page = () => {
  return (
    <div className="container mx-auto flex gap-20 p-10">
      <Previews />
      <Previews />
    </div>
  );
};

export default Page;
