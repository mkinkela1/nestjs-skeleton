enum Language {
  EN = "EN",
  HR = "HR",
}

export const WrongEmailOrPassword: Record<Language, string> = {
  [Language.EN]: "Wrong email or password!",
  [Language.HR]: "Pogrešan e-mail ili lozinka!",
};

export const EmailAlreadyExists: Record<Language, string> = {
  [Language.EN]: "Email already exists.",
  [Language.HR]: "E-mail već postoji.",
};

export const UserNotFound: Record<Language, string> = {
  [Language.EN]: "User not found.",
  [Language.HR]: "Korisnik nije pronađen.",
};

export const InvalidPasswordResetToken: Record<Language, string> = {
  [Language.EN]: "Invalid password reset token.",
  [Language.HR]: "Nevažeći token za poništavanje lozinke.",
};

export const ConfirmPasswordDoesntMatchNewPassword: Record<Language, string> = {
  [Language.EN]: "Confirm password doesn't match new password.",
  [Language.HR]: "Potvrda lozinke ne odgovara novoj lozinki.",
};

export const InvalidEmailVerificationToken: Record<Language, string> = {
  [Language.EN]: "Invalid email verification token.",
  [Language.HR]: "Nevažeći token za verifikaciju e-maila.",
};
