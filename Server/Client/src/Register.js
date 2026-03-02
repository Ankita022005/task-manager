import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/register", form);
    navigate("/");
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password"
       onChange={e=>setForm({...form,password:e.target.value})}/>
      <button>Register</button>
    </form>
  );
}
export default Register;