import Profile from "@/types/Profile";
import { profile } from "console";
import { client } from "lib/Pocketbase";
import { useContext } from "react";
import toast from "react-hot-toast";
import { ProfileContext } from "../context";

export default function useDelete() {
    const { setProfile, profile } = useContext(ProfileContext);

    const remove = async () => {
        if (!profile?.id) return;
        console.log(profile);
        try {
            await client.collection("profiles").delete(profile.id);
            toast.success("Successfully deleted profile");
            setProfile(undefined);
        } catch (error) {
            toast.error("Could not delete profile");
            console.log(error);
        }
    };

    return remove;
}
