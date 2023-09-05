import { Text } from "@chakra-ui/react"
import { Helmet } from "react-helmet-async"

export const ProfilePage = () => {

  
  return (
    <>
      <Helmet>
        <title>Perfil | Taskty</title>
      </Helmet>
      <Text as="section">Perfil</Text>
    </>
  )
}
