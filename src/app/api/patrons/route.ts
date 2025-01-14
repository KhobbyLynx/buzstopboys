import connectMongoDB from "@/libs/mongodb";
import Patron from "@/models/patron.model";
import { generateRandomId } from "@/utils/utils";
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


//** GET */
export async function GET(request: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB();

        // Fetch all patrons
        const patrons = await Patron.find();

        // Return patrons
        return new Response(JSON.stringify(DEMOPATRONS), {
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

        const  {username, firstname, lastname, contact, email, role, avatar, address} = patronData
    
        console.log("CREATE NEW PATRON", patronData);
        // Check if the required fields are provided
        if (!username || !email || !role) {
            return NextResponse.json({ message: "Patron Name and Email are required" }, { status: 400 });
        }

        // Generate random id
        const id = generateRandomId()
        
        // Create a new patron
        await Patron.create({
            id,
            username,
            email,
            address,
            firstname,
            lastname,
            onlineStatus: false,
            verified: false,
            contact,
            role,
            avatar,
        });

        // Return a success response
        return NextResponse.json({message: `New Patron with id ${id} Created`}, {
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
        // Get the patron ID from the body
        const id = request.body 

        console.log('Patron ID', id)
        // Check if the patron ID is provided
        if (!id) {
            return NextResponse.json({ message: "Patron ID is required" }, { status: 400 });
        }

        // Connect to MongoDB
        await connectMongoDB();

        // Delete the patron
        await Patron.findOneAndDelete({ id });

        // Return a success response
        return NextResponse.json({message: "Patron Deleted"}, {
          headers: {
            "content-type": "application/json",
          },
          status: 200,
        });
    } catch (error: any) {
        console.error("Error deleting patron:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500
        });
    }
}

//** PUT  */
export async function PUT(request: NextRequest) {
    try {
        // Get the patron ID from the body
        const id = request.json()
        // Check if the patron ID is provided
        if (!id) {
            return NextResponse.json({ message: "Patron ID is required" }, { status: 400 });
        }

        // Validate the request body
        const { firstname, lastname, contact, role } = await request.json();

        // Connect to MongoDB
        await connectMongoDB();

        // Update the patron
        const patron = await Patron.findOneAndUpdate(
            { id },
            { $set: { firstname, lastname, contact, role } },
            { new: true } // return the updated document
        );
        console.log(patron);

        // Return a success response
        return NextResponse.json({message: "Patron Updated"}, {
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