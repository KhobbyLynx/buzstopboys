import { adminDeleteFirebaseUser, adminReinstateFirebaseUser, adminSuspendFirebaseUser } from "@/configs/adminFirebase";
import connectMongoDB from "@/libs/mongodb";
import Patron from "@/models/patron.model";
import { generateRandomId } from "@/utils/utils";
import { getAuth } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

const DEMOPATRONS = [
    {
        id: 'EU42924K',
        username: 'Lynx',
        firstname: 'Samuel Kofi',
        lastname: 'Tetteh',
        email: 'khobbylynx55@gmail.com',
        verified: true,
        onlineStatus: true,
        contact: '0537151049',
        role: 'admin',
        address: 'oxford street 69, Osu',
        avatar: 'https://samueltetteh.netlify.app/static/media/aboutImg.b2c6393a6bb40b3e6d60.jpg',
        avatarColor: 'success'
    },
    ...Array.from({ length: 49 }, (_, i) => ({
        id: `EU4292${i + 5}K`,
        username: `User${i + 2}`,
        firstname: `Firstname${i + 2}`,
        lastname: `Lastname${i + 2}`,
        email: `user${i + 2}@example.com`,
        verified: i % 2 === 0, // Alternate between true and false
        onlineStatus: i % 3 === 0, // Every third user is online
        contact: `05000000${i + 10}`,
        role: i % 5 === 0 ? 'admin' : 'patron', // Every fifth user is an admin
        address: `${i + 2}rawlings circle , Madina`,
        avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${i + 10}.jpg`
    }))
];


//** GET All or Single PATRON */
export async function GET(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Get the ID from the request query (if provided)
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
            // Fetch a single patron by ID
            const patron = await Patron.findOne({ id });

            if (!patron) {
                return new Response(JSON.stringify({ message: "Patron not found" }), {
                    status: 404,
                    headers: {
                        "content-type": "application/json",
                    },
                });
            }

            // Return the single patron
            return new Response(JSON.stringify(patron), {
                headers: {
                    "content-type": "application/json",
                },
                status: 200,
            });
        }

        // Fetch all patrons if no ID is provided
        const patrons = await Patron.find();

        // Return all patrons
        return new Response(JSON.stringify(patrons), {
            headers: {
                "content-type": "application/json",
            },
            status: 200,
        });

    } catch (error: any) {
        console.error("Error fetching patrons:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: {
                "content-type": "application/json",
            },
        });
    }
}


//** POST - Create Patron */
export async function POST(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Get the patron data from the request body
        const patronData = await request.json(); 

        const  {id, username, email, role} = patronData
    
        console.log("CREATE NEW PATRON", patronData);
        // Check if the required fields are provided
        if (!id || !username || !email || !role) {
            return NextResponse.json({ message: "Patron Name and Email are required" }, { status: 400 });
        }

        // Create a new patron
        const newPatron = await Patron.create({
            ...patronData,
            onlineStatus: false,
            verified: false,
        });

        // Return a success response
        return NextResponse.json(newPatron, {
          headers: {
            "content-type": "application/json",
          },
          status: 201,
        });
    } catch (error: any) {
        console.error("Error creating patron:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500
        });
    }
}

//** DELETE  */
export async function DELETE(request: NextRequest) {
    try {
         // Connect to MongoDB
         await connectMongoDB();
         
        const id = request.nextUrl.searchParams.get('id');

        // Check if the patron ID is provided
        if (!id) {
            return NextResponse.json({ message: "Patron ID is required" }, { status: 400 });
        }
    
        // Delete the patron from Firebase
        adminDeleteFirebaseUser(id);
        
        // Delete the patron from MongoDB
        const deletedPatron = await Patron.findOneAndDelete({ id });

        if (!deletedPatron) {
            return NextResponse.json({ message: "Patron not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Patron Deleted" }, { status: 200 });
    } catch (error: any) {
        console.error("Error deleting patron:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


//** PUT  */
export async function PUT(request: NextRequest) {
    try {

        // Get the ID from the request query (if provided)
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

            // Check if the patron ID is provided
            if (!id) {
                return NextResponse.json({ message: "Patron ID is required" }, { status: 400 });
            }
           
            // Validate the request body
            const { firstname, lastname, contact, role, lastSignInTime, onlineStatus } = await request.json();

        // Connect to MongoDB
        await connectMongoDB();

        // Update the patron
        const patron = await Patron.findOneAndUpdate(
            { id },
            { $set: { firstname, lastname, contact, role, lastSignInTime, onlineStatus } },
            { new: true } // return the updated document
        );
        console.log(patron);

        // Return a success response
        return NextResponse.json(patron, {
          headers: {
            "content-type": "application/json",
          },
          status: 200,
        });
    } catch (error: any) {
        console.error("Error updating patron:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500
        });
    }
}


//** PATCH  */
export async function PATCH(request: NextRequest) {
    try {

        // Get the ID from the request query (if provided)
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

            // Check if the patron ID is provided
            if (!id) {
                return NextResponse.json({ message: "Patron ID is required" }, { status: 400 });
            }
           
            // Validate the request body
            const { suspended } = await request.json();

        // Connect to MongoDB
        await connectMongoDB();

        if(suspended){
            await adminSuspendFirebaseUser(id) 
        } else {
            await adminReinstateFirebaseUser(id)
        }

        // Update the patron
        const patron = await Patron.findOneAndUpdate(
            { id },
            { $set: { suspended } },
            { new: true } // return the updated document
        );
        console.log(patron);

        // Return a success response
        return NextResponse.json(patron, {
          headers: {
            "content-type": "application/json",
          },
          status: 200,
        });
    } catch (error: any) {
        console.error("Error updating patron:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500
        });
    }
}