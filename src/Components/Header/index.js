import { CiSearch } from "react-icons/ci";
import Button from '@mui/material/Button';
const SearchBox = () => {
    return (
        <div className="searchBox ml-3 mr-3">
                <input type="text" placeholder="Tìm kiếm sản phẩm...." />
                <Button>
                    <CiSearch />
                </Button>
        </div>
    )
}

export default SearchBox;