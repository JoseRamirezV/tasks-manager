import { Center, Container } from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import { Guard } from "../auth/utils/Guard"
import TasksPage from "./Pages/TasksPage"
import { ProfilePage } from "./Pages/ProfilePage"

export const TaskRouter = () => {

  if (!Guard()) return <Navigate to={"/auth"}/>
  

  return (
    <>
      <Header/>
      <Container as="main" maxW={"3xl"} position={'relative'}>
        <Routes>
          <Route index element={<TasksPage/>}/>
          <Route path={"profile"} exact element={<ProfilePage/>} />
          <Route path={"*"} exact element={<Navigate to={''}/>} />
        </Routes>
      </Container>
      <Center>&copy; 2023</Center>
    </>
  )
}
