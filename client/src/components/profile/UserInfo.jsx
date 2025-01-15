import { useAuth } from "../../contexts/AuthContext";

const formatTimestamp = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
};

const getFirstLetter = (name) => {
  return name[0].toUpperCase();
}

export default function UserInfo() {
  const {user} = useAuth();

  return (
    <div className="flex min-h-[240px] relative flex items-center bg-[#042345]">
        <div className="w-32 h-32 bg-purple-400 rounded-full ml-[24px]
            flex items-center justify-center text-[42px] font-bold">
          {getFirstLetter(user.name)}
        </div>
        
        <div className="ml-6">
          <div className="text-center mt-6 flex items-center">
            <h1 className="text-3xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-600 ml-4">Member since {formatTimestamp(user.createdAt)}</p>
          </div>
          <p className="text-xl text-gray-400">{user.email}</p>
        </div>
        
    </div>
  );;
}
