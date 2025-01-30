import { PatronWebType } from "@/types/patron";
import axios from "axios"

const BASE_URL = 'http://localhost:3000/api/set-cookie'

export const setCookie = async (name: string, value: PatronWebType) => {
    try {
        const response = await axios.post(BASE_URL, {
          name,
          value: typeof value === "object" ? JSON.stringify(value) : value,
        });
    
        const result = response.data;
        return result;
      } catch (error) {
        console.error("Error setting cookie:", error);
        throw error;
      }
}

export const deleteCookie = async (name : String) => {
    try {
      await axios.post(BASE_URL, {
        name, 
        value: "",
        options: {
          expires: new Date(0).toUTCString(), // Set to a past date
        },
      });
      console.log("Cookie deleted!");
    } catch (error) {
      console.error("Error deleting cookie:", error);
    }
};