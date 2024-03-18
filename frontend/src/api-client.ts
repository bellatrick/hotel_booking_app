import { registerFormSchemaType } from "./pages/Register";
import { LoginToFormSchemaType } from "./pages/Signin";
import {
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  UserType,
} from "../../backend/src/shared/types";
import { BookingFormData } from "./components/app_components/forms/BookingForm/BookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
export const register = async (formData: registerFormSchemaType) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
export const signin = async (formData: LoginToFormSchemaType) => {
  const response = await fetch(`${API_BASE_URL}/api/auth`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};
export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};
export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const logout = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching hotel");
  }
  return response.json();
};

export const updateMyHotelById = async (data: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${data.get("hotelId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: data,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to  update hotel");
  }
  return response.json();
};
export type SearchParams = {
  destination: string;
  checkIn: string;
  checkOut: string;
  adultCount: string;
  childCount: string;
  page: number;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
  searchParams?: SearchParams;
};
export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const {
    page,
    destination,
    adultCount,
    childCount,
    checkIn,
    checkOut,
    facilities,
    maxPrice,
    stars,
    sortOption,
    types,
  } = searchParams;
  const queryParams = new URLSearchParams();
  queryParams.append("destination", destination || "");
  queryParams.append("page", page.toString() || "");
  queryParams.append("checkIn", checkIn || "");
  queryParams.append("checkOut", checkOut || "");
  queryParams.append("adultCount", adultCount || "");
  queryParams.append("childCount", childCount || "");
  queryParams.append("maxPrice", maxPrice || "");
  queryParams.append("sortOption", sortOption || "");

  facilities?.forEach((facility) => queryParams.append("facilities", facility));

  types?.forEach((type) => queryParams.append("types", type));

  stars?.forEach((star) => queryParams.append("stars", star));
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("error fetching hotels");
  }
  const data = await response.json();
  return data;
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("error fetching hotel");
  }
  return response.json();
};


export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};

export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};