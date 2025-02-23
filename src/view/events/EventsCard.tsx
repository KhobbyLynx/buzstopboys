'use client'

import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'
import Link from 'next/link'
import { EventProps } from '@/types/events'
import { formatDate } from '@/utils/utils'

// Styled component for the image container
const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '200px',
  overflow: 'hidden',
})

// Styled component for the hashtags container
const HashtagsContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '16px',
})

// Styled component for the card content
const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // Ensure the content takes full height
})

// Styled component for the action buttons container
const ButtonsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 'auto', // Push buttons to the bottom
  paddingTop: '16px', // Add some spacing above the buttons
})

const EventCard: React.FC<EventProps> = ({
  title,
  caption,
  venue,
  startDate,
  endDate,
  startTime,
  endTime,
  desc,
  hashTags,
  img,
  status,
}) => {
  const Time = () => {
    if (status === 'past') {
      return (
        <>
          <Typography variant="body2" color="text.secondary">
            <strong> ⌛Date: </strong> Ended{' '}
            {endDate ? formatDate(endDate).periodFromNow : formatDate(startDate).periodFromNow}
          </Typography>
        </>
      )
    } else {
      return (
        <>
          <Typography variant="body2" color="text.secondary">
            <strong>📅 Date:</strong> {formatDate(startDate).date}{' '}
            {endDate && `- ${formatDate(endDate).date}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>⏰ Time:</strong> {formatDate(startTime).time}{' '}
            {endTime && `- ${formatDate(endTime).time}`}
          </Typography>
        </>
      )
    }
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: '16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image Section */}
      <ImageContainer>
        <CardMedia
          component="img"
          height="200"
          image={img} // Use the first image in the array
          alt={title}
        />
      </ImageContainer>

      {/* Content Section */}
      <StyledCardContent>
        {/* Title and Caption */}
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Venue, Date, and Time */}
        <Typography variant="body2" color="text.secondary">
          <strong>📍Venue:</strong> {venue}
        </Typography>
        {Time()}

        <Divider sx={{ my: 2 }} />

        {/* Description */}
        <Typography variant="body1" color="text.primary">
          {desc}
        </Typography>

        {/* Hashtags */}
        <HashtagsContainer>
          {hashTags.map((tag, index) => (
            <Chip key={index} label={`#${tag}`} size="small" />
          ))}
        </HashtagsContainer>

        {/* Action Buttons */}
        <ButtonsContainer>
          <Link href={'/donate'}>
            <Button variant="outlined">Donate</Button>
          </Link>
          <Button variant="contained">Volunteer</Button>
        </ButtonsContainer>
      </StyledCardContent>
    </Card>
  )
}

export default EventCard
