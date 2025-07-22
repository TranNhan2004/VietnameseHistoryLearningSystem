export const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const USER_NAME_RE = /^[a-zA-Z0-9]+$/;
export const EMAIL_OR_USER_NAME_RE =
  /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[a-zA-Z0-9]+)$/;
export const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
export const POINT_ALLOCATION_RULE_RE = /^(?=.*:100)(\d+:(?:100|[1-9]?\d)-?)+$/;
