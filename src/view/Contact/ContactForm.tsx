"use client";

import {
  Typography,
  Card,
  CardBody,
  Radio,
  Input,
  Textarea,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, TicketIcon } from "@heroicons/react/24/solid";

export function ContactForm() {
  return (
    <section className="mb-20 lg:mb-40 px-0 pt-[64px]">
      <div className="container mx-auto mb-20 text-center">
        <Typography variant="h1" color="blue-gray" className="mb-4 px-4">
          Get in Touch with Us
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full lg:w-5/12 !text-gray-500"
        >
          Have questions, suggestions, or want to collaborate with us? Reach out! We value your feedback and are always excited to connect with like-minded individuals and organizations.
        </Typography>
      </div>
      <div>
        <Card shadow={true} className="container mx-auto border border-gray/50">
          <CardBody className="grid grid-cols-1 lg:grid-cols-7 md:gap-10">
            <div className="w-full col-span-3 rounded-lg h-full py-8 p-5 md:p-16 bg-gray-900 bg-[url('/image/banner/event.jpeg')] bg-cover">
              <Typography variant="h4" color="white" className="mb-2">
              Send Us a Message
              </Typography>
              <Typography
                variant="lead"
                className="mx-auto mb-8 text-base !text-gray-100"
              >
                Fill out the volunteer/Support form or contact us directly via email.
              </Typography>
              <div className="flex gap-5">
                <PhoneIcon className="h-6 w-6 text-white" />
                <Typography variant="h6" color="white" className="mb-2">
                  +233 537 151 049
                </Typography>
              </div>
              <div className="flex my-2 mb-10 gap-5">
                <EnvelopeIcon className="h-6 w-6 text-white" />
                <Typography variant="h6" color="white" className="mb-2">
                  buzstopboys@gmail.com
                </Typography>
              </div>
              <div className="flex items-center gap-5">
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-twitter text-lg" />
                </IconButton>
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-youtube text-lg" />
                </IconButton>
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-facebook text-lg" />
                </IconButton>
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-instagram text-lg" />
                </IconButton>
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-tiktok text-lg" />
                </IconButton>
              </div>
            </div>
            <div className="w-full mt-8 md:mt-0 md:px-10 col-span-4 h-full p-5">
              <form action="#">
                <div className="mb-8 grid gap-4 lg:grid-cols-2">
                  {/* @ts-ignore */}
                  <Input
                    color="gray"
                    size="lg"
                    variant="static"
                    label="First Name"
                    name="first-name"
                    placeholder="eg. Lucas Kwame"
                    containerProps={{
                      className: "!min-w-full mb-3 md:mb-0",
                    }}
                  />
                  {/* @ts-ignore */}
                  <Input
                    color="gray"
                    size="lg"
                    variant="static"
                    label="Last Name"
                    name="last-name"
                    placeholder="eg. Tetteh"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                  />
                </div>
                {/* @ts-ignore */}
                <Input
                  color="gray"
                  size="lg"
                  variant="static"
                  label="Email"
                  name="first-name"
                  placeholder="eg. lucas@mail.com"
                  containerProps={{
                    className: "!min-w-full mb-8",
                  }}
                />
                <Typography
                  variant="lead"
                  className="!text-blue-gray-500 text-sm mb-2"
                >
                  What are you interested on?
                </Typography>
                <div className="-ml-3 mb-10">
                  {/* @ts-ignore */}
                  <Radio
                    color="gray"
                    name="type"
                    label="Volunteer"
                    defaultChecked
                  />
                  {/* @ts-ignore */}
                  <Radio color="gray" name="type" label="Sponsor" />
                  {/* @ts-ignore */}
                  <Radio color="gray" name="type" label="Donate" />
                  {/* @ts-ignore */}
                  <Radio color="gray" name="type" label="Other" />
                </div>
                <Textarea
                  color="gray"
                  size="lg"
                  variant="static"
                  label="Your Message"
                  name="first-name"
                  containerProps={{
                    className: "!min-w-full mb-8",
                  }}
                />
                <div className="w-full flex justify-end">
                  <Button className="w-full md:w-fit" color="gray" size="md">
                    Send message
                  </Button>
                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default ContactForm;