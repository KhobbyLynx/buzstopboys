// import React from "react";
// import MuiLink from "@mui/material/Link";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

// interface Action {
//   type: "internal" | "external";
//   route: string;
//   label: string;
// }

// interface RotatingCardBackProps {
//   color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
//   image: string;
//   title: React.ReactNode;
//   description: React.ReactNode;
//   action?: Action;
// }

// const RotatingCardBack: React.FC<RotatingCardBackProps> = ({ color = "info", image, title, description, action }) => {
//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       borderRadius="lg"
//       boxShadow={3}
//       position="absolute"
//       width="100%"
//       height="100%"
//       top={0}
//       left={0}
//       zIndex={5}
//       sx={{
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${image})`,
//         backgroundSize: "cover",
//         backfaceVisibility: "hidden",
//         transform: "rotateY(180deg)",
//       }}
//     >
//       <Box pt={12} pb={2} px={2} textAlign="center" lineHeight={1}>
//         <Typography variant="h3" color="white" gutterBottom>
//           {title}
//         </Typography>
//         <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
//           {description}
//         </Typography>
//         {action && (
//           <Box width="50%" mt={4} mb={2} mx="auto">
//             {action.type === "external" ? (
//               <Button
//                 component={MuiLink}
//                 href={action.route}
//                 target="_blank"
//                 rel="noreferrer"
//                 size="small"
//                 fullWidth
//                 sx={{ color: "white" }}
//               >
//                 {action.label}
//               </Button>
//             ) : (
//               <Button component={Link} href={action.route} size="small" fullWidth sx={{ color: "white" }}>
//                 {action.label}
//               </Button>
//             )}
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default RotatingCardBack;

import React from "react";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Action {
    type: "internal" | "external";
    route: string;
    label: string;
  }
  
  interface RotatingCardBackProps {
    color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
    image: string;
    title: React.ReactNode;
    description: React.ReactNode;
    action?: Action;
  }

const RotatingCardBack: React.FC<RotatingCardBackProps> = ({ color = "info", image, title, description, action }) => {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    borderRadius="lg"
    boxShadow={3}
    position="absolute"
    width="100%"
    height="100%"
    top={0}
    left={0}
    zIndex={5}
    sx={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${image})`,
      backgroundSize: "cover",
      backfaceVisibility: "hidden",
      transform: "rotateY(180deg)",
    }}
  >
    <Box pt={12} pb={2} px={2} textAlign="center" lineHeight={1}>
      <Typography variant="h3" color="white" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
        {description}
      </Typography>
      {/* {action && (
        <Box width="50%" mt={4} mb={2} mx="auto">
          {action.type === "external" ? (
            <Button
            //   component={Link}
            //   href={action.route}
              size="small"
              fullWidth
              sx={{ color: "white" }}
            >
              {action.label}
            </Button>
          ) : (
            <Button 
            // component={Link}
            //  href={action.route} 
             size="small" 
             fullWidth sx={{ color: "white" }}>
              {action.label}
            </Button>
          )}
        </Box>
      )} */}
    </Box>
  </Box>
  );
};

export default RotatingCardBack;