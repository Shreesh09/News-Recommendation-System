import { Outlet, useNavigation } from "react-router-dom"
import ResponsiveAppBar from "./AppBar"

export const Home = () => {
    const navigation = useNavigation()
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