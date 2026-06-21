import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { Panel } from "../../components/ui/Cards";
import { Button } from "../../components/ui/Button";
import { userService } from "../../api/userService";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  department?: string;
  gender?: string;
  role: string;
};

type Tab = "staff" | "students";

export function UsersPage() {
  const { addToast } = useApp();

  const [tab, setTab] = useState<Tab>("staff");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async (selected: Tab) => {
    setLoading(true);

    try {
      let res;

      if (selected === "staff") {
        res = await userService.getAdmins();
      } else {
        res = await userService.getStudents();
      }

      setUsers(res.data);
    } catch {
      addToast({
        title: "Error",
        message: "Failed to load users",
        tone: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(tab);
  }, [tab]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <Panel>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-sm text-slate-600">
          View staff and student accounts
        </p>

        {/* TABS */}
        <div className="flex gap-3 mt-4">
          <Button
            onClick={() => setTab("staff")}
            className={
              tab === "staff"
                ? "bg-institution-600 text-white"
                : "bg-slate-200 text-slate-700"
            }
          >
            Staff / Admins
          </Button>

          <Button
            onClick={() => setTab("students")}
            className={
              tab === "students"
                ? "bg-institution-600 text-white"
                : "bg-slate-200 text-slate-700"
            }
          >
            Students
          </Button>
        </div>
      </Panel>

      {/* TABLE */}
      <Panel>
        <h2 className="text-lg font-semibold mb-4">
          {loading ? "Loading..." : `${users.length} users`}
        </h2>

        {loading ? (
          <p className="text-slate-500">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-slate-500 text-center py-6">No users found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left border-b">
                <tr>
                  <th className="py-2">ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  {tab === "students" && <th>Department</th>}
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-slate-50">
                    <td className="py-2">{u.id}</td>
                    <td>
                      {u.firstName} {u.lastName}
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span className="px-2 py-1 text-xs rounded bg-slate-200">
                        {u.role}
                      </span>
                    </td>
                    {tab === "students" && <td>{u.department || "-"}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
