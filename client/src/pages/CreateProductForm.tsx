import { useState } from "react";

type Product = {
  name: string;
  description: string;
  price: number;
};

const CreateProductForm = () => {
  const handleSubmit = () => {
    console.log("click");
  };

  return (
    <form className="gap-2" onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Description" />
      <input type="" placeholder="Price" />
    </form>
  );
};

export default CreateProductForm;
