import { useContext } from "react"
import { AuthContext } from "../Provider/Authproviders"

export const useAuth = () =>{
  const auth = useContext(AuthContext);
  return auth;
}