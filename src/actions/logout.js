import { redirect } from "react-router-dom";
import { deleteItem } from "../helper";
import { toast } from "react-toastify";

export async function logoutAction() {
    //delete user
    deleteItem({
        key: "userName"
    });

    deleteItem({
        key: "budgets"
    });

    deleteItem({
        key: "expenses"
    });

    toast.success("You have deleted your account!");

    //return a redirect
    return redirect("/")
}