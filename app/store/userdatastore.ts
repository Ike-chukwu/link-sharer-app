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
            imageUrl: "",
            selectedFile: ""
        },
        accessToken: "",
        uniqueIdentifier: ""
    },
    saveLink: (linkList: any) => {
        set((state: any) => ({
            userData: {
                ...state.userData,
                listOfLinks: linkList
            }
        }));
    },
    setAccessToken: (token: any) => {
        set((state: any) => ({
            userData: {
                ...state.userData,
                accessToken: token
            }
        }));
    },
    setUniqueIdentifier: (id: any) => {
        set((state: any) => ({
            userData: {
                ...state.userData,
               uniqueIdentifier: id
            }
        }));
    },
    savePersonalDetails: (detail: any) => set((state: any) => ({
        userData: {
            ...state.userData,
            personalDetails: detail
        }
    })),

}


))