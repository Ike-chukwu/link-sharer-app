import { create } from 'zustand'

type linkContent = {
    id: string;
    platform: string | undefined;
    link: string;
}

export const userDataStore = create((set) => ({
    userData: {
        listOfLinks: [],
        personalDetails: {
            firstName: "",
            lastName: "",
            email: "",
            imageUrl: ""
        }
    },
    saveLink: (linkList: any) => {
        console.log("saveLink function called with:", linkList);
        set((state: any) => ({
            userData: {
                ...state.userData,
                listOfLinks: linkList
            }
        }));
    },
    savePersonalDetails: (detail: any) => set((state: any) => ({
        userData: {
            ...state.userData,
            personalDetails: detail
        }
    }))

}


))