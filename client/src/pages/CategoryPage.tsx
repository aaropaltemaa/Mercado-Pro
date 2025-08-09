import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const capitalizedCategoryName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "";

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-8">
        {capitalizedCategoryName}
      </h2>
    </div>
  );
};

export default CategoryPage;
