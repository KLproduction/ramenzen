import React from "react";

// type CategoriesProps = {
//   tags: Tag[];
// };

const Categories = () => {
  return (
    <aside className="mb-8 rounded-lg bg-yellow-100 p-4 shadow">
      <h2 className="mb-2 text-lg font-semibold text-yellow-700">Categories</h2>
      <ul className="flex flex-wrap gap-2">
        <li className="mb-1">
          <span className="rounded bg-yellow-200 px-2 py-1 text-xs text-yellow-800">
            test
          </span>
        </li>
      </ul>
      {/* <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag.id} className="mb-1">
            <span className="rounded bg-yellow-200 px-2 py-1 text-xs text-yellow-800">
              {tag.name}
            </span>
          </li>
        ))}
      </ul> */}
    </aside>
  );
};

export default Categories;
