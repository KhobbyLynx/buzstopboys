# BUZSTOPBOYS WEB APPLICATION

![Image](https://s3.amazonaws.com/creativetim_bucket/products/740/original/material-tailwind-react-events-details-template-thumbnail.jpg?1697625313)

This project is a web application built for the **BuzStopBoys**, an organization focused on cleaning and improving areas within Accra, Ghana. The application showcases before-and-after images of cleaned areas, YouTube videos, upcoming destinations, and facilitates donations and purchases.

## Project Features

- **Dynamic Card Components**: Display clean-up campaigns and collages.
- **Donation Support**: Facilitate donations through a user-friendly interface.
- **Media Integration**: Showcase video content via YouTube embeds.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [@material-tailwind/react](https://www.material-tailwind.com/)
- **Styling**: Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (for donation and campaign tracking)

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/KhobbyLynx/buzstopboys.git
   cd buzstopboys
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Issue with @material-tailwind/react

During the development of this project, an issue was identified with the usage of components from the `@material-tailwind/react` library. Specifically, TypeScript is reporting missing properties for the components such as `Card`, `CardBody`, `CardHeader`, and `Typography`. These errors include:

- `placeholder`
- `onPointerEnterCapture`
- `onPointerLeaveCapture`

### Temporary Workaround

To bypass these errors during development, consider:

1. **Updating @material-tailwind/react**: Ensure you're using the latest version of the library:

   ```bash
   npm install @material-tailwind/react@latest
   ```

2. **Custom Type Definitions**: Override or extend the type definitions using a `d.ts` file in your project:

   ```typescript
   // material-tailwind.d.ts
   declare module "@material-tailwind/react" {
       interface CardProps {
           placeholder?: string;
           onPointerEnterCapture?: () => void;
           onPointerLeaveCapture?: () => void;
       }
   }
   ```

3. **Disable TypeScript Checks Temporarily**: If the issue persists, you can bypass the error temporarily using `@ts-ignore` above the problematic components.

   ```typescript
   // Example
   // @ts-ignore
   <Card className="custom-class">...</Card>
   ```

### Long-Term Fix

Consider reaching out to the library's maintainers by raising an issue on their [GitHub repository](https://github.com/creativetimofficial/material-tailwind/issues).

## Contributions

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Special thanks to the BuzStopBoys organization for their continuous efforts in community service.
