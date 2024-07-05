import { Outlet, useNavigation } from "react-router-dom";

const App = () => {
    const navigation = useNavigation();
    return (
    <>
        <div id="detail" className={
                navigation.state === "loading" ? "loading" : ""
        }>
            <Outlet/>
        </div>
    </>);
}

export default App;