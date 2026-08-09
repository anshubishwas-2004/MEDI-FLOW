import axios from "axios";
import { useEffect, useState } from "react";

export const CONTACT_PHONE = "+91 9334231954";

const fallbackContactInfo = {
  phone: CONTACT_PHONE,
  email: "",
  address: "Medi Flow Healthcare Coordination",
  website: "www.mediflow.com",
};

export const getContactInfo = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/config/contact`
  );

  return {
    ...fallbackContactInfo,
    ...response.data,
    phone: CONTACT_PHONE,
  };
};

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState(fallbackContactInfo);

  useEffect(() => {
    let isMounted = true;

    getContactInfo()
      .then((data) => {
        if (isMounted) {
          setContactInfo(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setContactInfo(fallbackContactInfo);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return contactInfo;
};
