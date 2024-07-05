import { Outlet, useNavigation, useNavigate } from "react-router-dom"
import ResponsiveAppBar from "./AppBar"
import { useEffect } from "react"

export const Home = () => {
    const navigation = useNavigation()
    const navigate = useNavigate()
    useEffect(() => {navigate("/home/dashboard/1", {absolute: 'path'})}, [])
    return (
        <>
        <ResponsiveAppBar state={0} search={""}></ResponsiveAppBar>
            <div id="detail" className={
                navigation.state === "loading" ? "loading" : ""
            }>
                <Outlet/>
            </div>
        </>
    )
}