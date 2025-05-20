import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import 'remixicon/fonts/remixicon.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [isclicked, setisclicked] = useState(false);
  const [form, setform] = useState({ website: "", username: "", password: "" });
  const [alldata, setalldata] = useState([]);
  const [showPasswords, setShowPasswords] = useState(false);
  const [editId, setEditId] = useState(null);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({ ...prev, [name]: value }));
  };

  const handleicon = () => {
    setisclicked(prev => !prev);
  };

  const savedata = () => {
    if (!form.website || !form.username || !form.password) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const updated = alldata.map((item) =>
        item.id === editId ? { ...form, id: editId } : item
      );
      setalldata(updated);
      localStorage.setItem("formdata", JSON.stringify(updated));
      setEditId(null);
    } else {
      const updateddata = [...alldata, { ...form, id: uuidv4() }];
      setalldata(updateddata);
      localStorage.setItem("formdata", JSON.stringify(updateddata));
    }

    setform({ website: "", username: "", password: "" });
  };

  const handledelete = (id) => {
    const updateddata = alldata.filter((item) => item.id !== id);
    setalldata(updateddata);
    localStorage.setItem("formdata", JSON.stringify(updateddata));
    setform({ website: "", username: "", password: "" });
    if (editId === id) setEditId(null);
  };

  const handleedit = (id) => {
    const toEdit = alldata.find((item) => item.id === id);
    setform({ website: toEdit.website, username: toEdit.username, password: toEdit.password });
    setEditId(id);
  };

  useEffect(() => {
    const saveddata = localStorage.getItem("formdata");
    const parseddata = JSON.parse(saveddata);
    if (parseddata) {
      setalldata(parseddata);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className='flex flex-col justify-center items-center my-10'>
        <div className="logo1">
          <div className="logo text-2xl text-black font-bold">
            Mypa<span className='text-green-500'>$$</span>
          </div>
        </div>
        <p className='tex-xl'>Your Own Password Manager</p>

        <input
          name='website'
          value={form.website}
          onChange={handlechange}
          type="text"
          placeholder='Enter Website URL'
          className='border-2 rounded-2xl border-green-300 px-4 w-3xl my-2 bg-white'
        />

        <div className="inputs flex flex-row justify-around items-center gap-5">
          <input
            name='username'
            type="text"
            value={form.username}
            onChange={handlechange}
            placeholder='Enter Username'
            className='border-2 rounded-2xl border-green-300 px-4 w-150 my-2 bg-white'
          />

          <div className="passwords relative">
            <input
              name='password'
              value={form.password}
              onChange={handlechange}
              type={isclicked ? "text" : "password"}
              placeholder='Password'
              className='border-2 rounded-2xl border-green-300 px-4 w-40 my-2 bg-white '
            />
            <i
              className={`absolute right-3  cursor-pointer ${isclicked ? "ri-eye-line" : "ri-eye-off-line"}`}
              onClick={handleicon}
            ></i>
          </div>
        </div>

        <div className="buttons flex gap-4">
          <button onClick={savedata} className='bg-green-500 py-2 px-4 rounded-4xl my-3'>
            <i className={editId ? "ri-save-3-line" : "ri-add-line"}></i>
            {editId ? " Update Password" : " Add Password"}
          </button>

          <button
            onClick={() => setShowPasswords(prev => !prev)}
            className='bg-green-500 py-2 px-4 rounded-3xl my-3'
          >
            {showPasswords ? "Close passwords" : "Show passwords"}
          </button>
        </div>

        {showPasswords && (
          <div className="tabledata w-full overflow-x-auto px-4">
            <table className="table-auto w-full text-center">
              <thead>
                <tr className="bg-green-500 text-white">
                  <th className="px-4 py-2 w-1/3">Website</th>
                  <th className="px-4 py-2 w-1/3">Username</th>
                  <th className="px-4 py-2 w-1/3">Password</th>
                  <th className="px-4 py-2 w-1/3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {alldata
                  .filter(item => item.website || item.username || item.password)
                  .map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-2 break-words max-w-[200px]">
                        <a href={item.website} target='_blank' rel='noreferrer'>{item.website}</a>
                      </td>
                      <td className="px-4 py-2 break-words max-w-[150px]">{item.username}</td>
                      <td className="px-4 py-2 break-words max-w-[150px]">{item.password}</td>
                      <td className="px-4 py-2 break-words max-w-[150px] flex justify-center gap-3 text-lg">
                        <i className="ri-edit-fill text-blue-600 cursor-pointer" onClick={() => handleedit(item.id)}></i>
                        <i className="ri-delete-bin-6-fill text-red-600 cursor-pointer" onClick={() => handledelete(item.id)}></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
