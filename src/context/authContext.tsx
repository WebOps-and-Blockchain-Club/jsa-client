import { createContext, useState, useEffect, ReactNode } from "react";
var axios = require("axios");
// import Cookies from "universal-cookie";
axios.defaults.withCredentials = true;

interface authContextType{
  user: string;
  setUser: (user : any) => void;
};

const authContextDefaultValues: authContextType = {
  user: null,
  setUser: () => {},
};

export const AuthContext = createContext<authContextType>(
  authContextDefaultValues
);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<string>('');
  useEffect(() => {
    var config = {
      method: "get",
      url: `${process.env.BACKEND_URL}/profile`,
      credentials: "include",
    };
    // const cookies = new Cookies();
    axios(config)
      .then(function (response) {
        if(response.data.id){
          setUser(response.data.id)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);



  const value = {
    user,
    setUser
  };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
