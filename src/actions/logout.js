import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";

export async function logoutAction() {
    //delete user
    deleteItem({
        key: "userName"
    });
    //return a redirect
    return redirect("/")
}