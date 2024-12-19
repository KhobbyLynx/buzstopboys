import React from "react";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface RotatingCardFrontProps {
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";
  image: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

const RotatingCardFront: React.FC<RotatingCardFrontProps> = ({ color = "info", image, icon, title, description }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      borderRadius="lg"
      boxShadow={3}
      width="100%"
      position="relative"
      zIndex={2}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${image})`,
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
      }}
    >
      <Box py={12} px={3} textAlign="center" lineHeight={1}>
        {icon && (
          <Typography variant="h2" color="white" my={2}>
            {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
          </Typography>
        )}
        <Typography variant="h3" color="white" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="white" sx={{ opacity: 0.8 }}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default RotatingCardFront;