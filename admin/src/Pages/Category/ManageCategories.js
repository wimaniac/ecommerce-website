import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryItem = ({ category }) => (
    <li>
        {category.name}
        {category.subcategories?.length > 0 && (
            <ul>
                {category.subcategories.map((sub) => (
                    <CategoryItem key={sub._id} category={sub} />
                ))}
            </ul>
        )}
    </li>
);

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/categories')
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.error('Lỗi khi lấy danh mục:', err);
            });
    }, []);

    return (
        <div>
            <h2>Quản lí danh mục</h2>
            <ul>
                {categories.map((category) => (
                    <CategoryItem key={category._id} category={category} />
                ))}
            </ul>
        </div>
    );
};

export default ManageCategories;
