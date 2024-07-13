const lettersOnlyFilter = (unknown) => {
  if (typeof unknown !== "string") return;

  if (/^[a-zA-Z]+$/.test(unknown)) {
    return unknown;
  }
};

const phoneNumberFilter = (unknown) => {
  if (typeof unknown !== "string") return;

  const phonePattern = /^\+?[1-9]\d{1,14}$/;
  if (phonePattern.test(unknown)) {
    return unknown;
  }
};

const emailFilter = (unknown) => {
  if (typeof unknown !== "string") return;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailPattern.test(unknown)) {
    return unknown;
  }
};

const parseBoolean = (unknown) => {
  if (!["true", "false"].includes(unknown)) return;

  return unknown === "true" ? true : false;
};

export const parseFilters = (query) => {
  return {
    name: lettersOnlyFilter(query.name),
    phoneNumber: phoneNumberFilter(query.phoneNumber),
    email: emailFilter(query.email),
    isFavorite: parseBoolean(query.isFavorite),
    contactType: lettersOnlyFilter(query.contactType),
  };
};
