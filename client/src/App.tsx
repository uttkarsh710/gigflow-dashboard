import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const [leads, setLeads] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      setLoggedIn(true);

      alert("Login Successful");
    } catch (error) {
      alert("Login Failed");
    }
  };

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/leads?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeads(response.data.leads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      fetchLeads();
    }
  }, [loggedIn, search]);

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[350px]">
          <h1 className="text-3xl font-bold mb-6 text-center">
            GigFlow Login
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 rounded"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 mb-4 rounded"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            className="w-full bg-blue-600 text-white p-3 rounded"
            onClick={login}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          GigFlow Dashboard
        </h1>

        <button
          className="bg-black text-white px-5 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("token");

            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search leads..."
          className="border p-3 rounded w-full"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Add Lead
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded"
            id="name"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded"
            id="email"
          />

          <select
            className="border p-3 rounded"
            id="status"
          >
            <option value="new">New</option>

            <option value="contacted">
              Contacted
            </option>

            <option value="qualified">
              Qualified
            </option>

            <option value="lost">Lost</option>
          </select>

          <select
            className="border p-3 rounded"
            id="source"
          >
            <option value="website">
              Website
            </option>

            <option value="instagram">
              Instagram
            </option>

            <option value="referral">
              Referral
            </option>
          </select>
        </div>

        <button
          className="bg-blue-600 text-white px-5 py-3 rounded mt-4"
          onClick={async () => {
            try {
              const token =
                localStorage.getItem("token");

              const name = (
                document.getElementById(
                  "name"
                ) as HTMLInputElement
              ).value;

              const email = (
                document.getElementById(
                  "email"
                ) as HTMLInputElement
              ).value;

              const status = (
                document.getElementById(
                  "status"
                ) as HTMLSelectElement
              ).value;

              const source = (
                document.getElementById(
                  "source"
                ) as HTMLSelectElement
              ).value;

              await axios.post(
                "http://localhost:5000/api/leads",
                {
                  name,
                  email,
                  status,
                  source,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              fetchLeads();

              alert("Lead Added");
            } catch (error) {
              alert("Error Adding Lead");
            }
          }}
        >
          Add Lead
        </button>
      </div>

      <div className="bg-white p-5 rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">
                Name
              </th>

              <th className="text-left p-3">
                Email
              </th>

              <th className="text-left p-3">
                Status
              </th>

              <th className="text-left p-3">
                Source
              </th>

              <th className="text-left p-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="border-b"
              >
                <td className="p-3">
                  {lead.name}
                </td>

                <td className="p-3">
                  {lead.email}
                </td>

                <td className="p-3">
                  {lead.status}
                </td>

                <td className="p-3">
                  {lead.source}
                </td>

                <td className="p-3">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={async () => {
                      try {
                        const token =
                          localStorage.getItem(
                            "token"
                          );

                        await axios.delete(
                          `http://localhost:5000/api/leads/${lead._id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                        fetchLeads();

                        alert("Lead Deleted");
                      } catch (error) {
                        alert("Delete Failed");
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;