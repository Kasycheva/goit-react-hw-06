import s from "./Contact.module.css";
import { HiOutlineUserCircle } from "react-icons/hi";
import { TbPhone } from "react-icons/tb";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id)); 
  };

  return (
    <div className={s.contact}>
      <div className={s.info}>
        <p className={s.text}>
          <HiOutlineUserCircle className={s.icon} />
          {name}
        </p>
        <p className={s.text}>
          <TbPhone className={s.icon} />
          {number}
        </p>
      </div>
      <button className={s.button} onClick={handleDelete}>
        <RiDeleteBin2Fill className={s.deleteIcon} />
      </button>
    </div>
  );
};

export default Contact;
