"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    email: "",
    date: null,
    time: "",
    people: "",
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleDateSelect = (date: Date | null) => {
  //   setFormData({ ...formData, date });
  //   setIsCalendarOpen(false);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
  };

  return (
    <div className="flex w-full items-center justify-center bg-fixed bg-center bg-no-repeat">
      <Card className="my-12 w-full max-w-[280px] bg-transparent text-white backdrop-blur-md md:max-w-xl">
        <CardHeader className="text-center text-4xl font-black text-yellow-400">
          <h1 className="caption2 font-bold">BOOK YOUR EXPERIENCE</h1>
        </CardHeader>
        <CardContent className="px-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="tel">Telephone</Label>
              <Input
                id="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="Phone number"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between bg-transparent"
                  >
                    {formData.date
                      ? format(formData.date, "PPP")
                      : "Select a date"}
                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto rounded-none bg-white p-0 text-black">
                  <Calendar
                    mode="single"
                    selected={formData.date!}
                    // onSelect={handleDateSelect}
                    className="rounded-md"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="time">Time</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, time: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={formData.time || "Select a time"} />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectGroup>
                    {[
                      "10:00",
                      "11:00",
                      "12:00",
                      "13:00",
                      "14:00",
                      "15:00",
                      "16:00",
                    ].map((t, i) => (
                      <SelectItem
                        key={i}
                        value={t}
                        className="hover:bg-gray-200"
                      >
                        {t}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="people">How many people?</Label>
              <Input
                id="people"
                name="people"
                type="number"
                min="1"
                value={formData.people}
                onChange={handleChange}
                placeholder="e.g. 2"
                required
              />
            </div>

            <Button type="submit" className="w-full text-lg font-bold">
              Reserve Now
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
