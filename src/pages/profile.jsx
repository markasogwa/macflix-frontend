import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const { setAuth } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found.");
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get("/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
        setUsername(res.data.username || "");
        setBio(res.data.bio || "");
        setSocialLink(res.data.socialLink || "");
      } catch (error) {
        console.error("Failed to fetch profile.", error);
        toast.error("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("socialLink", socialLink);
    if (file) {
      formData.append("profilePicture", file);
    }

    setLoading(true);
    try {
      const res = await axios.put("/api/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile updated!");
      setUser(res.data.user);
      setAuth((prev) => ({
        ...prev,
        user: res.data.user, // update global user context
      }));
      setEditing(false);
    } catch (error) {
      console.error("Update failed.", error);
      toast.error("Update failed.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      {loading ? (
        <div className="flex justify-center items-center h-96 text-gray-400">
          Loading...
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={user?.profilePicture || "/default-avatar.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500"
            />
            <div>
              <h2 className="text-2xl font-bold">{user?.username}</h2>
              <p className="text-sm text-gray-400">{user?.email}</p>
              {user?.createdAt && (
                <p className="text-xs text-gray-500 mt-1">
                  Joined on {formatDate(user.createdAt)}
                </p>
              )}
            </div>
          </div>

          {!editing && (
            <div className="space-y-2">
              {user?.bio && (
                <p className="text-sm">
                  <span className="font-medium text-gray-300">Bio:</span>{" "}
                  {user.bio}
                </p>
              )}
              {user?.socialLink && (
                <p className="text-sm">
                  <span className="font-medium text-gray-300">Social:</span>{" "}
                  <a
                    href={user.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    {user.socialLink}
                  </a>
                </p>
              )}
            </div>
          )}

          {!editing ? (
            <div className="text-right">
              <button
                onClick={() => setEditing(true)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-md transition"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Social Link
                </label>
                <input
                  type="url"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Profile Picture
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full text-sm text-gray-300 file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-cyan-600 file:text-white file:rounded-md hover:file:bg-cyan-700"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                >
                  Update Profile
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="border border-gray-500 px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
