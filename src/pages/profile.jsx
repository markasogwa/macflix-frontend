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
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/user/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profile updated!");
      setUser(res.data.user);
      setAuth((prev) => ({
        ...prev,
        user: res.data.user,
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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-16">
      {loading ? (
        <div className="text-gray-400 text-lg font-semibold">
          Loading profile...
        </div>
      ) : (
        <div className="bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-10 md:p-14 text-gray-300 font-sans">
          {/* Header */}
          <div className="flex flex-col items-center">
            <img
              src={user?.profilePicture || "/default-avatar.png"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-lg"
            />
            <h1 className="mt-6 text-3xl font-serif font-semibold text-indigo-400 tracking-wide">
              {user?.username}
            </h1>
            <p className="text-indigo-300 mt-1 text-sm select-text">
              {user?.email}
            </p>
            {user?.createdAt && (
              <p className="text-indigo-500 italic text-xs mt-1 select-text">
                Joined on {formatDate(user.createdAt)}
              </p>
            )}
          </div>

          {/* Content */}
          {!editing ? (
            <div className="mt-10 space-y-8">
              {user?.bio && (
                <section>
                  <h2 className="text-indigo-300 font-semibold text-lg border-b border-red-600 pb-1 mb-3 select-none">
                    Bio
                  </h2>
                  <p className="text-gray-300 leading-relaxed">{user.bio}</p>
                </section>
              )}

              {user?.socialLink && (
                <section>
                  <h2 className="text-indigo-300 font-semibold text-lg border-b border-red-600 pb-1 mb-3 select-none">
                    Social Link
                  </h2>
                  <a
                    href={user.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-600 underline break-words"
                  >
                    {user.socialLink}
                  </a>
                </section>
              )}

              <div className="text-right">
                <button
                  onClick={() => setEditing(true)}
                  className="bg-red-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold px-7 py-3 rounded-xl shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
                  aria-label="Edit Profile"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-8">
              <div>
                <label
                  htmlFor="username"
                  className="block text-indigo-400 font-semibold mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-lg bg-gray-700 border border-indigo-600 px-4 py-3 text-gray-200 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="block text-indigo-400 font-semibold mb-2"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="4"
                  className="w-full rounded-lg bg-gray-700 border border-indigo-600 px-4 py-3 text-gray-200 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tell us about yourself"
                />
              </div>

              <div>
                <label
                  htmlFor="socialLink"
                  className="block text-indigo-400 font-semibold mb-2"
                >
                  Social Link
                </label>
                <input
                  id="socialLink"
                  type="url"
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                  className="w-full rounded-lg bg-gray-700 border border-indigo-600 px-4 py-3 text-gray-200 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="profilePicture"
                  className="block text-indigo-400 font-semibold mb-2"
                >
                  Profile Picture
                </label>
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full text-indigo-400 placeholder-indigo-600"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 active:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-6 py-3 rounded-xl shadow-md transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
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
