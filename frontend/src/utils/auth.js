

export const logout = () =>{
    localStorage.removeItem("access");
    localStorage.removeItem("refresh")
}