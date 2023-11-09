export const getUser = async (cellphone, password) => {
    try {
        const res = await fetch("/users.json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
    
        if (!res.ok) return false;
    
        const data = await res.json();
        const userData = data.find(
          (user) => user.cellphone === cellphone && user.password === password
        );
        return userData;
      } catch (err) {
        console.log(err);
        return [];
      }
}
