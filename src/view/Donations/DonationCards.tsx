import DonateCard from "@/components/Cards/DonateCard"
import { Typography } from "@material-tailwind/react"

function DonationCards() {
    const DONATIONS = [
        {
          amount: 50,
        },
        {
          amount: null,
        },
        {
          amount: 100,
        }
      ]

  return (
      
          <section className="px-8 p-[64px]">
                <div className="container mx-auto mb-16 text-center">
                  <Typography variant="h2" color="blue-gray">
                  Make a Difference Your Way
                  </Typography>
                  <Typography
                    variant="lead"
                    className="mt-2 mx-auto w-full px-4 !text-blue-500 lg:w-6/12 lg:px-8"
                  >
                    Every Little Bit Counts – Donate What You Can
                  </Typography>
                  <Typography
                    variant="lead"
                    className="mt-2 mx-auto w-full px-4 !text-gray-500 lg:w-6/12 lg:px-8"
                  >
                    Your generous contributions allow us to continue making a positive impact in our community. Whether it’s a small gesture or a larger donation, you have the power to drive change. You can contribute any amount that feels right for you. Together, we can keep making progress one step at a time.
                  </Typography>
                </div>
                <div className="container mx-auto grid grid-cols-1 gap-4 md:grid-cols-3"> 
            {
              DONATIONS.map((props, idx) => (
                <DonateCard key={idx} {...props}/>
              ))
            }
          </div>
              </section>
  )
}

export default DonationCards