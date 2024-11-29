import s from "./SearchBox.module.css";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = e => {
    dispatch(changeFilter(e.target.value)); 
  };

  return (
    <div className={s.div}>
      <label className={s.text} htmlFor="search">
        <MdOutlinePersonSearch className={s.icon} />
        Find contacts by name
      </label>
      <input
        className={s.input}
        type="text"
        id="search"
        value={filter}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
