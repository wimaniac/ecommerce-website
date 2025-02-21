import { FaMinus, FaPlus } from "react-icons/fa6";
import { Button } from "@mui/material";
import { useState } from "react";

const QuantityBox = () => {
    const [inputVal, setInputVal] = useState(1);

    // Giảm số lượng nhưng không nhỏ hơn 1
    const minus = () => {
        setInputVal((prev) => Math.max(1, prev - 1));
    };

    // Tăng số lượng
    const plus = () => {
        setInputVal((prev) => prev + 1);
    };

    // Xử lý khi người dùng nhập vào ô input
    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) { // Chỉ chấp nhận số
            setInputVal(value);
        }
    };

    // Kiểm tra khi rời khỏi ô input
    const handleBlur = () => {
        if (inputVal === "" || inputVal < 1) {
            setInputVal(1); // Nếu rỗng hoặc < 1, đặt lại 1
        }
    };

    return (
        <div className="quantityDrop d-flex align-items-center">
            <Button onClick={minus}>
                <FaMinus />
            </Button>
            <input
                type="text"
                value={inputVal}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <Button onClick={plus}>
                <FaPlus />
            </Button>
            
        </div>
    );
};

export default QuantityBox;
